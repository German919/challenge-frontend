import React from "react" 
import "./index.css"
const Eliminar = ({setShowEliminar}) => {

    const handleOut = () => {
        setShowEliminar(false)
    }

    return(

        <div className="show-cartel">
            <h3>Post Eliminado</h3>
            <button onClick={handleOut} >Aceptar</button>
        </div> 
    )
}

export default Eliminar;
