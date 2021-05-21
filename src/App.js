import './App.css';
import Login from './components/login/formulario';
import {Route} from "wouter"
import Home from './components/home/home';
import Detalle from './components/detalle';
import Editar from './components/editar';
import CrearPost from "./components/crear"
import {Provider} from "react-redux"
import store from './store';

function App() {
  return (
    <div className="App">
        <Route path="/" component={Login}  />

        <Provider store={store}>
          <Route path="/home" component={Home} />
          <Route path="/home/detalle/:id" component={Detalle} />
          <Route path="/home/editar/:id" component={Editar} />
          <Route path="/home/crearpost" component={CrearPost} />
        </Provider>

    </div>
  );
}

export default App;
