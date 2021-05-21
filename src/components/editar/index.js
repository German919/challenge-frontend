import React, { useEffect, useState } from "react"
import "./index.css"
import {connect} from "react-redux"
import {useLocation} from "wouter"
const Editar = ({params, submit}) => {

    const {id} = params

    const [location, setLocation] = useLocation()

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

    if(!localStorage.getItem("token")){
        setLocation("/")
    }
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

    useEffect(()=>{
         fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
              .then(res => res.json())
              .then(res => setPostEditar(res))
    },[])

    const handleBack = () => {
        setLocation("/home")
    }

    const logout = () =>{
        localStorage.removeItem("token")
        setLocation("/")
    }

    return(
        <>
        <div className="container-button">
            <button onClick={handleBack} className="btn btn-primary btn-md button-detalle">Home</button>
            <button onClick={logout} className="btn btn-primary btn-md button-detalle">Logout</button>
        </div>
        
        <h1>Editar Post</h1>
        
        <div className="container">
            <div className="abs-center">
                <div className="border p-3 form">
                <div className="form-group">
                    <label>UserId</label>
                    <input type="text" name="userId"  disabled className="form-control" value={post.userId} 
                        onChange = {handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Id</label>
                    <input type="text" name="id"  disabled className="form-control" value={post.id}  
                        onChange = {handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Titulo</label>
                    <input type="text" name="title" className="form-control"  value={post.title}
                        onChange = {handleChange}  
                    />
                    {
                       errores.title && <label className="label-error">{errores.title}</label> 
                    }
                </div>
                <div className="form-group">
                    <label>Contenido</label>
                    <textarea type="text" name="body" className="form-control"  rows="4" value={post.body} 
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
            type: "EDITAR_POST",
            post
        })
        alert("Post Editado")
    }
})
const mapStateToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Editar);