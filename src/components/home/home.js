import React, { useState, useEffect } from "react"
import "./home.css"
import {useLocation} from "wouter"
import Eliminar from "../eliminar"
import {connect} from "react-redux"

const Home = ({posts, handleEliminar}) => {

    const [listado, setListado] = useState([])

    const [location, setLocation] = useLocation()

    const [showEliminar, setShowEliminar] = useState(false)
    
    // useEffect(()=>{
    //     fetch("https://jsonplaceholder.typicode.com/posts")
    //         .then(res => res.json())
    //         .then(res => setListado(res))
    // },[])
    
    const handleDetails = (id) =>{
        setLocation(`/home/detalle/${id}`)
    }

    // const handleEliminar = (id) =>{
    //     posts[0].filter(post => post.id !== id)
    //     setShowEliminar(true)
    // }

    if(!localStorage.getItem("token")){
        setLocation("/")
    }
    
    const handleEditar = (id) => {
        setLocation(`/home/editar/${id}`)
    }
    let listaPosts = 0

    if(posts[0].length >= 100){
        listaPosts = posts[0]
    }else{
        listaPosts = posts
    }

    const handleCrearPost = () =>{
        setLocation(`/home/crearpost`)
    }

    const logout = () =>{
        localStorage.removeItem("token")
        setLocation("/")
    }
        
    return(
        <>
            <div className="container-button">
                <button onClick={handleCrearPost} className="btn btn-primary btn-md crear-post-button">Crear Post</button>
                <button onClick={logout} className="btn btn-primary btn-md crear-post-button">Logout</button>
            </div>
           
            <ul className="list-group list-group-flush">
            {
                showEliminar && <Eliminar setShowEliminar={setShowEliminar} /> 
            }
           
            {
                listaPosts.map( post => (
                  
                <div key={post.id} className="container-post" >   
                    <li className="list-group-item" >{post.title}</li> 
                    <div className="container-button">
                        <button onClick={()=>handleDetails(post.id)} className="btn btn-primary btn-md">detalle</button>
                        <button onClick={()=>handleEditar(post.id)} className="btn btn-primary btn-md">editar</button>
                        <button onClick={()=>handleEliminar(post.id)} className="btn btn-primary btn-md">eliminar</button>  
                    </div>
                </div>
                ))
            }
            </ul>
        </>
    )
}

const mapStateToProps = (state) => ({
    posts : state.posts
})
const mapDispatchToProps = dispatch =>({
    handleEliminar(id){
        dispatch({
            type: "ELIMINAR_POST",
            id
        })
        alert(`Post ${id} Eliminado`)
    }
})
export default connect(mapStateToProps, mapDispatchToProps) (Home);