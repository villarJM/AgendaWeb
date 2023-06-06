
export const AddPatientPOST = async (firstname, surname, gender, email, phone, date, time) => {
  return fetch('http://localhost:4000/api/v1/agenda/appoinment/addpatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(firstname, surname, gender, email, phone, date, time)
    })
      .then(data => data.json())
}

export const GetPatientGET = async (setListInformation) => {
  await fetch('http://localhost:4000/api/v1/agenda/appoinment/getpatient')
  .then((response) => response.json())
  .then((data) => {
    // console.log(JSON.stringify(data));
    localStorage.setItem("listInformation", JSON.stringify(data));
    setListInformation(data)
  }).catch();
}
export const GetTimeGET = async (setListhour) => {
  await fetch('http://localhost:4000/api/v1/agenda/appoinment/gettime')
  .then((response) => response.json())
  .then((data) => {
    // console.log(JSON.stringify(data));
    localStorage.setItem("listhour", JSON.stringify(data));
    setListhour(data)
  }).catch();
}
export const AddUsersPOST = async (name, surname, email, user, pass) => {
  return fetch('http://localhost:4000/api/v1/agenda/appoinment/addusers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name, surname, email, user, pass)
    })
      .then(data => data.json())
}
export const GetUsersGET = async (setListUsers) => {
  await fetch('http://localhost:4000/api/v1/agenda/appoinment/getusers')
  .then((response) => response.json())
  .then((data) => {
    // console.log(JSON.stringify(data));
    localStorage.setItem("listusers", JSON.stringify(data));
    setListUsers(data)
  }).catch();
}

export const GetCountPatientGET = async (setListCountPatient) => {
  await fetch('http://localhost:4000/api/v1/agenda/appoinment/getcountpatient')
  .then((response) => response.json())
  .then((data) => {
    console.log(JSON.stringify(data));
    localStorage.setItem("listCountPatient", JSON.stringify(data));
    setListCountPatient(data)
  }).catch();
}
export const GetCountUserGET = async (setListCountusers) => {
  await fetch('http://localhost:4000/api/v1/agenda/appoinment/getcountuser')
  .then((response) => response.json())
  .then((data) => {
    console.log(JSON.stringify(data));
    localStorage.setItem("listCountUsers", JSON.stringify(data));
    setListCountusers(data)
  }).catch();
}