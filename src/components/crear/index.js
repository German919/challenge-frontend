import React, { useEffect, useState } from "react"
import "./index.css"
import {connect} from "react-redux"
import {useLocation} from "wouter"
const CrearPost = ({posts, submit}) => {

    const [location, setLocation] = useLocation()

    if(!localStorage.getItem("token")){
        setLocation("/")
    }

    let id = 0

    let listaPosts = 0

    if(posts[0].length === 100){
        listaPosts = posts[0]
        id = parseInt(listaPosts.length + 1) 
    }else{
        listaPosts = posts
        id = parseInt(listaPosts.length + 1)
    }

    const [post, setPostEditar] = useState({
        userId: "",
        id: "",
        title: "",
        body: ""
    })

    const [errores, setErrores] = useState({
        title:"",
        body:""
    })
    const validate = (values) => {

        const errors = {}

        if(!values.title){
            errors.title = "Titulo obligatorio"
        }else if(!values.body){
            errors.body = "Contenido obligatorio"
        }
        return errors
    }
    const handleValidar = (e)=>{

        e.preventDefault()
        const results = validate(post)

        setErrores(results)
    }
 
    const handleChange = (e) => {
        setPostEditar({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const home = () =>{
        setLocation("/home")
    }
    const logout = () =>{
        localStorage.removeItem("token")
        setLocation("/")
    }

    return(
        <>
        <di className="container-button">  
            <button onClick={home} className="btn btn-primary">Home</button>
            <button onClick={logout} className="btn btn-primary">Logout</button>
        </di>

        <h1>Crear Post</h1>
    
        <div className="container container-crear">
            <div className="abs-center">
                <div className="border p-3 form">
                <div className="form-group">
                    <label>UserId</label>
                    <input type="text" name="userId"  className="form-control"  
                        onChange = {handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Id</label>
                    <input type="text" name="id" className="form-control" disabled  value ={id}
                        onChange = {handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Titulo</label>
                    <input type="text" name="title" className="form-control"  
                        onChange = {handleChange}  
                    />
                    {
                       errores.title && <label className="label-error">{errores.title}</label> 
                    }
                </div>
                <div className="form-group">
                    <label>Contenido</label>
                    <textarea type="text" name="body" className="form-control"  rows="6"  
                        onChange={handleChange}
                    />
                    {
                       errores.body && <label className="label-error">{errores.body}</label> 
                    }
                </div>
                    <button onClick={()=>submit(post)} className="btn btn-primary">Aceptar</button>
                    <button onClick={handleValidar} className="btn btn-primary">Validar datos</button>
                </div>
            </div>
        </div>

        </>
    )
}
const mapDispatchToProps = (dispatch) =>({
    submit(post){
        dispatch({
            type: "CREAR_POST",
            post
        })
        alert("Post Creado")
    }
})
const mapStateToProps = (state) => ({
    posts : state.posts
})

export default connect(mapStateToProps, mapDispatchToProps)(CrearPost);