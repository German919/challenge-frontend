import {createStore} from "redux"

const initialState = {
    posts : []
}


fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(res => initialState.posts.push(res))

const reducerPost = (state=initialState, action) =>{
    console.log(action)
    
    if(action.type === "ELIMINAR_POST"){
      
        let listaPosts = 0

        if(state.posts[0].length === 100){
            listaPosts = state.posts[0]
        }else{
            listaPosts = state.posts
        }
       
         return {
            ...state,
             posts :listaPosts.filter(post => post.id !== action.id)
         }
    }

    if(action.type === "CREAR_POST"){

        let listaPosts = 0

        if(state.posts[0].length === 100){
            listaPosts = state.posts[0]
        }else{
            listaPosts = state.posts
        }
        return{
            ...state,
            posts : listaPosts.concat(action.post)
        }

    }
    if(action.type === "EDITAR_POST"){

        let listaPosts = 0
        
        if(state.posts[0].length === 100){
            listaPosts = state.posts[0]
        }else{
            listaPosts = state.posts
        }
        
        return{
            ...state,
            posts : listaPosts.map(post => post.id === action.post.id ? action.post : post)
        }

    }
    return state
}


export default createStore(reducerPost)