import { useState } from "react";
import '../App.css'
import { useNavigate } from "react-router";
import axios from 'axios'
import PropTypes from 'prop-types'


const loginUser = async (credentials) => {
    return fetch('http://localhost:4000/api/v1/agenda/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

const Login = ({setToken}) => {
  const [user, setUserName] = useState();
  const [pass, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      user,
      pass
    });
    console.log(token);
    setToken(token)
  }
  return (
      <div className="login">
        <div className="container text-center">
          <div className="row">
            <div className="collog">
              <p className="titulo sm">Welcome!</p>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="form-label">User</label>
                <input type="text" className="form-control user" onChange={(e) => setUserName(e.target.value)} name="user" id="name" placeholder="Your user"/>
                <label htmlFor="pass" className="form-label">Password</label>
                <input type="password" className="form-control pass" onChange={(e) => setPassword(e.target.value)} name="pass" id="pass" placeholder="Your password"/>
                <div className="d-grid gap-2 buttomLogin">
                  <button type="submit" className="btn btn-warning rounded-pill" onClick={handleSubmit}>Login</button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
export default Login;
