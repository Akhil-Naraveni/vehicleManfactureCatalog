import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import "./homePage.css"
import PopUp from "./popup"

export const GlobalContext = React.createContext()

const HomePage = () => {
    const [data, setData] = useState([])
    const [selectedItem, setselectedItem] = useState()
    const [isInvk, setInvk] = useState(false)
    const [vTypes, setVTypes] = useState([])
    let tempArr;
    // cons [fetchSelectData, setSelectData] = useState([])
    useEffect(() => {
        fetchData()
        fetchvehicleType()
        
    }, [])
    function fetchData(){
        axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json")
            .then((res) => {
                // console.log(res.data.Results[0])
                res.data.Results.map((d) => {
                    // console.log(d.VehicleTypes.flat())
                    d.VehicleTypes.flat().map((k)=>{
                        // console.log(k.IsPrimary)
                        if(k.IsPrimary){
                            console.log(k.Name)
                            // setVTypes([...vTypes,k.Name])
                        }
                    })
                    // tempArr = d.VehicleTypes
                    
                })
                setData(res.data.Results)
            }).catch((err) => {
                console.log(err.message)
            })

    }

    function fetchvehicleType(){
       let vt = data.map((d) => {
            // console.log(d.VehicleTypes.flat())
           return d.VehicleTypes.flat().map((k)=>{
                // console.log(k.IsPrimary)
                    if(k.IsPrimary){
                        return k.Name
                    }
            })
            })
            console.log("****")
            console.log(Array.from(vt).map((d)=>{
                return d.map((p) =>{
                    if(p){
                        console.log(p)
                    }
                })
            }))
            console.log("****")

    }
    
    const handleSearch = (val) =>{
        console.log(val)
        if(val){
        tempArr =  data.filter((dat) => {
            if(dat.Mfr_CommonName){
                // console.log(dat.Mfr_CommonName.toLowerCase())
                return dat.Mfr_CommonName.toLowerCase().includes(val.toLowerCase())
            }
        })
    
        setData(tempArr)
        console.log(tempArr)
    }else{
        fetchData()
    }
    }

    const handledata = (d) => {
        console.log("item clicked")
        console.log(d.Mfr_ID)
        setInvk(true)
        setselectedItem(d.Mfr_ID)
    }

    return (

        <GlobalContext.Provider value={{ selectedItem, setselectedItem,isInvk, setInvk, data, setData }}>
            <div className="maincontainer">
                <div className="container">
                    <div>
                        <h3>VEHICLE MANUFACTURERS</h3>
                    </div>
                    <div className="searchAndFil">
                        <div className="searchcont">
                            <label>Search</label>
                            <input type="text" onChange={(e)=>{handleSearch(e.target.value)}} />
                        </div>
                        <div className="filtercont">
                            <label>Filter by Vehicle Type :</label>
                            <select name="type">
                                <option value="All">All</option>
                                <option value="Bus">Bus</option>
                                <option value="Truck">Truck</option>
                                <option value="Trailer">Trailer</option>
                            </select>
                        </div>
                    </div>
                    <div className="tablecont">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((dat, i) => {
                                    return (
                                        <tr onClick={() => { handledata(dat) }} key={i}>
                                            <td>{dat.Mfr_CommonName}</td>
                                            <td>{dat.Country}</td>
                                            {/* <td>{dat.VehicleTypes.flat().map((k)=>{
                                               return(
                                                {k.IsPrimary ? k.Name : ""}
                                               )
                                            })}</td> */}
                                            <td>Vehicle type</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    {isInvk && <PopUp />}

                </div>
            </div>
        </GlobalContext.Provider>
    )
}
export default HomePage;