import React, { useState, useEffect } from "react"
import "./home.css"
import {useLocation} from "wouter"
import Eliminar from "../eliminar"

const Home = () => {

    const [listado, setListado] = useState([])

    const [location, setLocation] = useLocation()

    const [showEliminar, setShowEliminar] = useState(false)
    
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(res => setListado(res))
    },[])

    const handleDetails = (id) =>{
        setLocation(`/home/detalle/${id}`)
    }

    const handleEliminar = (id) =>{
        setListado(listado.filter(post => post.id !== id)) 
        setShowEliminar(true)
    }

    return(
        <>
            <ul className="list-group list-group-flush">
            {
                showEliminar && <Eliminar setShowEliminar={setShowEliminar} /> 
            }
           
            {
                listado.map( list => (
                  
                <div key={list.id} className="container-post" >   
                    <li className="list-group-item" >{list.title}</li> 
                    <div className="container-button">
                        <button onClick={()=>handleDetails(list.id)} className="btn btn-primary btn-md">detalle</button>
                        <button className="btn btn-primary btn-md">editar</button>
                        <button onClick={()=>handleEliminar(list.id)} className="btn btn-primary btn-md">eliminar</button>  
                    </div>
                </div>
                ))
            }
            </ul>
        </>
    )
}

export default Home;