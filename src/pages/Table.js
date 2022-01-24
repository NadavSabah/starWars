import React, { useState, useEffect  } from 'react'
import TableList from '../cmps/TableList/TableList'
import BarChart from '../cmps/BarChart/BarChart'
import './Table.css'
import {getData} from '../service/service'

    
const Table = () => {
    const [tableData , setTableData ] = useState([])
    const [barchartData , setBarchartData ] = useState([])
    useEffect(() => {
  
        (async function (){
         
            let data = await getData()

             setTableData(data[0])    
             setBarchartData(data[1])
             
        }())
    },[]);
    return (
      
            <div className="container">

                <div className="table-wrapper">

                { tableData ?
                    tableData.map((singleData , idx ) => 
                  
                            <div key={idx}>
                            
                                <TableList data={singleData} number={idx + 1}/>
                            </div>

                    )
                        :null  }
                </div>
                <div  className="bar-chart-wrapper d-flex justify-content-center align-items-flex-end mb-100">

                        {
                            barchartData.map((planet , idx ) => {
                                return (
                            <div className="single-bar mr-90" key={idx}>
                                      
                                 <BarChart data={planet} />
                                      
                            </div>
                                )
                            })
                        }
 
                </div>
             </div>
    )

} 

export default Table 

