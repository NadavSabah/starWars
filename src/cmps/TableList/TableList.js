import React from 'react'
import './TableList.css'

const TableList = ({ data, number }) => {

    return (
        <div className="d-flex align-items-center mb-50">
            <div className="p-15">{number}</div>
            <div className="column-wrapper d-flex">
                <div className="name single-line d-flex"><span className="font-bold">Vheicle: </span>{data.vehicle.name} </div>
                <div className="single-line d-flex flex-direction-column">

                    {data.planets.map((planet, idx) =>

                        <div key={idx} className="d-flex">
                            <div className="pr-25"><span className="font-bold">Planet: </span> {planet.name}</div>
                            <div className="pr-25"><span className="font-bold">Population: </span> {parseInt(planet.population).toLocaleString()}</div>
                        </div>

                    )}

                </div>
                <div className="single-line d-flex">

                    {data.pilots.map((pilot, idx) =>

                        <div key={idx} className="pr-25">
                            <div><span className="font-bold">Pilot: </span> {pilot.name}</div>
                        </div>

                    )}
                </div>

            </div>
        </div>
    )

}

export default TableList

