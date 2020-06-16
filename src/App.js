import React, { useState, Component } from "react";
import { BrowserRouter as Router, Redirect, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import buscarusuario from './components/buscarusuario';
import crearusuario from './components/crearusuario';
import listausuarios from './components/listausuarios';
import login from './components/login';

class App extends Component {

  state = {
    token: "", 
    auth: false
  };

  iniciarSesion = (e) => {
    console.log(e.token);
  }

  render() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={display(this.state.auth)} to="/crearusuario">
                Crear Usuario
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/buscarusuario">
                Buscar Usuario
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={display(this.state.auth)} to="/listausuarios">
                Lista de Usuarios
              </Link>
            </li>
          </ul>
          <button className="btn btn-outline-primary bg-dark my-2 my-sm-0" type="submit" style={display(!this.state.auth)} onClick={() => this.setState({auth: true})}>Login</button>
          <button className="btn btn-outline-primary bg-dark my-2 my-sm-0" type="submit" style={display(this.state.auth)} onClick={() => this.setState({auth: false})}>Logout</button>
        </div>
      </nav>
      <div className="container">
        <Switch>
          <Route exact path="/" component={login} />
          <PrivateRoute exact path="/crearusuario" component={crearusuario} auth={this.state.auth}/>
          <Route path="/buscarusuario" component={buscarusuario} />
          <PrivateRoute exact path="/listausuarios" component={listausuarios} auth={this.state.auth}/>
          <Route exact component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
  }
}
function validaUsuario() {
  
}

function NotFound() {
  return <h1>404 - Not Found</h1>;
}

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />
      }
    />
  )
}

function display(auth){
  return({
    display: auth ? "block" : "none"
  })
}

export default App;
