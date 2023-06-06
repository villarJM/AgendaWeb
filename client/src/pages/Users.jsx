import { useEffect, useState } from 'react'
import '../Users.css'
import { AddUsersPOST, GetUsersGET } from '../api/agenda.api';
const Users = () => {
  const [listUsers, setListUsers] = useState(
    JSON.parse(localStorage.getItem("listusers")) || []
  );
  const [userInformation, setUserInformation] = useState([])
  useEffect(() => {
    GetUsersGET(setListUsers);
  }, [])
  const handleUserInformation = () => {
    document.querySelectorAll(".bi-arrow-left").forEach(el => {
      el.addEventListener("click", e => {
        let id = e.target.getAttribute("id");
        // console.log("Se ha clickeado el id " + id);
        listUsers.forEach(element => {
          console.log(element.idusers, id)
          if (element.idusers == id) {
            console.log(element)
            setUserInformation(element);
          }
        })
      });
    });
    console.log(userInformation.idusers);
  }
  const RegisterUsers = () => {
    const name = document.getElementById('names').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const user = document.getElementById('user').value;
    const pass = document.getElementById('passw').value;
    if (!name || !surname || !email || !user || !pass) return

    AddUsersPOST({ name, surname, email, user, pass })

  }
  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-md-4 panel">
          <div className="card cardlogin">
            <div className="card-body">
              <h5 className="card-title">Register Users</h5>
              <br />
              <div className="input-group">
                <span className="input-group-text">Name</span>
                <input id='names' type="text" className="form-control" required />
                <span className="input-group-text">Surname</span>
                <input id='surname' type="text" className="form-control" required />
              </div>
              <br />
              <div className="input-group">
                <span className="input-group-text">Email</span>
                <input id='email' type="email" className="form-control" required />
              </div>
              <br />
              <div className="input-group">
                <span className="input-group-text">User</span>
                <input id='user' type="text" className="form-control" required />
                <span className="input-group-text">Password</span>
                <input id='passw' type="password" className="form-control" required />
              </div>
              <br />
              <button onClick={RegisterUsers} className="btn btn-primary" type="button">Register</button>
            </div>
          </div>
        </div>
        <div className='col-md-4 panel infouser'>
          <div className='userInformation'>
            <span className='TitleUserInformation'>User Information</span>
            <span className='IconUser'><ion-icon name="person-outline"></ion-icon></span>
            <ul className='listInformatioUser'>
              <li><span>Name: {userInformation.name}</span></li>
              <li><span>Surname: {userInformation.surname}</span></li>
              <li><span>Email: {userInformation.email}</span></li>
              <li><span>User: {userInformation.user}</span></li>
              <li><span>Pass: {userInformation.password}</span></li>
              <li><span>State: {userInformation.state}</span></li>
            </ul>
            <div className="btn-group groupbtnUser" role="group" aria-label="Basic outlined example">
              <button type="button" className="btn btn-outline-primary">Left</button>
              <button type="button" className="btn btn-outline-warning">Modify</button>
              <button type="button" className="btn btn-outline-danger">Delete</button>
            </div>
          </div>
        </div>
        <div className="col-md-4 panel">
          {
            Object.values(listUsers).map(item => (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title titleuser">{item.name} {item.surname}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">{item.email}</h6>
                  <ul>
                    <li>{item.user}</li>
                    <li>{item.password}</li>
                  </ul>
                  <i className="bi bi-arrow-left" id={item.idusers} onClick={handleUserInformation}></i>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Users