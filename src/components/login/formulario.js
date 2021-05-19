import React from "react"
import "./formulario.css"
import {Formik, Form, Field, ErrorMessage} from "formik"
import {useLocation} from "wouter"

const Login = () => {

    const EMAIL = "challenge@alkemy.org"
    const PASS = "react"

    const [location, setLocation] = useLocation()

    const validateFieds = values => {

        const errors = {}

        if(!values.email){
            errors.email = "Required email"
        }else if(!values.password){
            errors.password = "Required password"
        }else if(values.email !== EMAIL){
            errors.email = "Email incorrect"
        }else if(values.password !== PASS){
            errors.password = "Password incorrect"
        }

        return errors
    }

    const initialValues = {
        email : "",
        password : ""
    }

    const handleSubmit = (values ) =>{

        fetch("http://challenge-react.alkemy.org/",{
            method:"POST",
            body: JSON.stringify({
            "email": values.email,
            "password": values.password
            }),
            headers:{"Content-type":"application/json", "X-Requested-With": "XMLHttpRequest"},
        })
            .then(res => res.json())
            .then(res => (
                localStorage.setItem("token",  res.token),
                setLocation("/home"),
                console.log(res)
            ))
            .catch(err => alert("Error en la api ", err.response))
        } 

    return (
       <>
        <Formik
        
            initialValues = {initialValues}

            validate = {validateFieds}

            onSubmit = {handleSubmit}
        >
        {
            () =>   
                    <Form>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-offset-5 col-md-3">
                                    <div className="form-login">
                                        <h4>Challenge Frontend</h4>
                                        <Field name="email" type="text" className="form-control input-sm chat-input" placeholder="email" />
                                        <ErrorMessage className="form-error" name="email" component="div" />
                                        <br></br>
                                        <Field  name="password" type="password" className="form-control input-sm chat-input" placeholder="password" />
                                        <ErrorMessage className="form-error" name="password" component="div" />
                                        <br></br>
                                        <div className="wrapper">
                                            <span className="group-btn">     
                                                <button className="btn btn-primary btn-md">enviar</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form> 
        }
        </Formik>
       </>
    )
}

export default Login;