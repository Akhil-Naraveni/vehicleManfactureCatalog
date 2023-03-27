import React from "react"
import axios from "axios"
import { GlobalContext } from "./homePage"
import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
const PopUp = () =>{
    const {selectedItem, setselectedItem, isInvk, setInvk, } = useContext(GlobalContext)
    const [sdata, ssetData] = useState([])
    useEffect(()=>{
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${selectedItem}?format=json`)
        .then((res)=>{
            console.log(res.data.Results)
            ssetData(res.data.Results[0])
        })
    },[])
    const handlecard = () =>{
        setInvk(false)
    }
    console.log(sdata.Address)
    return(
        <div className="cardContainer">
            <h2 style={{fontSize:"26px"}}>{sdata.Mfr_Name}</h2>
            <p style={{fontSize:"24px"}}>{sdata.PrincipalFirstName}</p>
            <p style={{fontSize:"24px"}}>{sdata.Address}</p>
            <p style={{fontSize:"24px"}}>{sdata.City}</p>

            <button  onClick={handlecard}>Ok</button>
        </div>
    )
}
export default PopUp;