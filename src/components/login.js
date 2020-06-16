import React, { Component } from "react";

class login extends Component {
  state = {
    email: "",
    password: "",
    token: ""
  };

  //inicia sesion
  iniciarSesion = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const loginObj = {
        "email": email, 
        "password" : password 
    }

    fetch("http://localhost:5050/api/sigin", {
      method: "POST",
      body: JSON.stringify(loginObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((newPost) => {
        console.log(newPost);
        
        const { token } = newPost;
        this.setState({ token });
        e = token;
      });
  };

  //almacena lo que se escribe
  leerDatos = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <h1>Lista usuario</h1>

        <form>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              required
              value={this.state.email}
              onChange={this.leerDatos}
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              required
              value={this.state.password}
              onChange={this.leerDatos}
            />
          </div>

          <input
            type="submit"
            className="btn btn-success btn-block"
            value="Iniciar Sesion"
            onClick={this.iniciarSesion}
          />
        </form>
      </div>
    );
  }
}

export default login;
