import React, { useEffect, useState } from "react"
import {useLocation} from "wouter"
import "./index.css"

const Detalle = ({params}) =>{

    const {id} = params

    const [location, setLocation] = useLocation()
    
    const [detalle, setDetalle] = useState([])

    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(res => setDetalle(res))
    },[])

    const handleBack = () => {
        setLocation("/home")
    }

    return (
        <>
        <div className="container-detalle">
        <h1>{detalle.title}</h1>
        <ul className="list-group list-group-flush">
            <li className="list-group-item" ><span>UserId:</span> {detalle.userId}</li> 
            <li className="list-group-item" ><span>Id:</span> {detalle.id}</li> 
            <li className="list-group-item" >{detalle.body}</li> 
        </ul> 
        <button onClick={handleBack} className="btn btn-primary btn-md">volver</button>
        </div>
        </>
    )
}

export default Detalle;