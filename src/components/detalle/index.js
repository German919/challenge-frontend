import React, { useEffect, useState } from "react"
import {useLocation} from "wouter"
import "./index.css"

const Detalle = ({params}) =>{

    const {id} = params

    const [location, setLocation] = useLocation()
    
    const [detalle, setDetalle] = useState([])

    if(!localStorage.getItem("token")){
        setLocation("/")
    }

    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(res => setDetalle(res))
    },[])

    const handleBack = () => {
        setLocation("/home")
    }

    const logout = () =>{
        localStorage.removeItem("token")
        setLocation("/")
    }

    return (
        <>
        <div className="container-button">
            <button onClick={handleBack} className="btn btn-primary btn-md button-detalle">Home</button>
            <button onClick={logout} className="btn btn-primary btn-md button-detalle">Logout</button>
        </div>
        
        <div className="container-detalle">
        <h1>{detalle.title}</h1>
        <ul className="list-group list-group-flush">
            <li className="list-group-item" ><span>UserId:</span> {detalle.userId}</li> 
            <li className="list-group-item" ><span>Id:</span> {detalle.id}</li> 
            <li className="list-group-item" >{detalle.body}</li> 
        </ul> 
        </div>
        </>
    )
}

export default Detalle;