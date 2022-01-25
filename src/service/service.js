

// Helpers
const getSingularData = async (endpoint) => {
    let res = await fetch(endpoint)
    let data = await res.json()

    return data
}

const getPluralData = async (endpoint) => {
    const rootUrl = 'https://swapi.py4e.com/api'
    let url = `${rootUrl}/${endpoint}`
    let res = await fetch(url)
    let data = await res.json()

    let allData = data.results

    if (data.next) {
        let nextPagesData = await getNextPageData(data.next, data.results)
        allData = [...data.results, ...nextPagesData]
    }
    return allData
}

const rateTheVehicles = (unSortedList) => { return unSortedList.sort((a, b) => b.sumPopulation - a.sumPopulation) }

const arrangeBarChartData = (data) => {
    const barChartData = []
    const cityNames = []
    data.map(singleData => {
        singleData.planets.filter(planet => {

            if (cityNames.indexOf(planet.name) === -1 && planet.population !== 'unknown') barChartData.push(planet)
            cityNames.push(planet.name)
        })

    })

    return barChartData
}

const removeIrelevant = (data) => {
    data.forEach((element, i, arr) => {
        for (let idx = element.planets.length - 1; idx >= 0; idx--) {

            let planet = element.planets[idx]
            if (planet.population === 'unknown') {

                arr[i].planets.splice(idx, 1)
                if (arr[i].planets.length === 0) arr.splice(i, 1)
            }
        }
    })
    return data
}

const removeIrrelevantFromVheicles = (data) => {
    return data.filter((vehicle, i) => vehicle.pilots.length && data.indexOf(vehicle) === i)
        .map(vehicle => {
            return {
                pilots: vehicle.pilots.map(url => { return { url: url } }),
                vehicle: { url: vehicle.url, name: vehicle.name },
                planets: [],
                sumPopulation: 0
            }
        })
}

const getNextPageData = async (endpoint, prevData) => {
    let res = await fetch(endpoint)
    let data = await res.json()

    if (data.next) getNextPageData(data.next, [...prevData, ...data.results])

    return [...prevData, ...data.results]
}

// End of Helpers 



const getVehicles = async () => {

    let allData = await getPluralData('vehicles')


    let vehiclesList = removeIrrelevantFromVheicles(allData)
    return await getPilotsRelatedToVehicles(vehiclesList)

}


const getPilotsRelatedToVehicles = async (vehiclesList) => {

    const setPlanetsUrl = vehiclesList.map(async ({ pilots, planets }) => {

        return await Promise.all(pilots.map(async (pilot) => {

            let data = await getSingularData(pilot.url)
            pilot.name = data.name
            if (planets.indexOf(data.homeworld) === -1) planets.push({ url: data.homeworld, })

        }))
    })

    await Promise.all(setPlanetsUrl)
    return await getPlanets(vehiclesList)
}


const getPlanets = async (vehiclesList) => {

    const addingPlanets = vehiclesList.map(async (vehicle) => {
        return await Promise.all(vehicle.planets.map(async (planet) => {

            let data = await getSingularData(planet.url)

            vehicle.sumPopulation += parseInt(data.population)
            planet.population = data.population
            planet.name = data.name
        }))

    })
    await Promise.all(addingPlanets)

    vehiclesList = removeIrelevant(rateTheVehicles(vehiclesList))
    let barChartData = arrangeBarChartData(vehiclesList)

    return [vehiclesList, barChartData]
}



export const getData = async () => { return await getVehicles() }













