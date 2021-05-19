import './App.css';
import Login from './components/login/formulario';
import {Route} from "wouter"
import Home from './components/home/home';
import Detalle from './components/detalle';

function App() {
  return (
    <div className="App">
        <Route path="/" component={Login}  />
        <Route path="/home" component={Home} />
        <Route path="/home/detalle/:id" component={Detalle} />
    </div>
  );
}

export default App;
