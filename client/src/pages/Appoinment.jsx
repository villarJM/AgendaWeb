import { useEffect, useState } from 'react'
import '../Appoinment.css'
import CalendarRow from '../components/CalendarRow'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import { AddPatientPOST, GetPatientGET, GetTimeGET } from '../api/agenda.api'

const Appoinment = () => {
  const [listInformation, setListInformation] = useState(
    JSON.parse(localStorage.getItem("listInformation")) || []
  );
  const [listhour, setListhour] = useState(
    JSON.parse(localStorage.getItem("listhour")) || []
  );
  const [information, setInformation] = useState([])

  useEffect(() => {
    GetPatientGET(setListInformation);
    GetTimeGET(setListhour);
    window.onload = () => {
      const date = new Date();
      const day = date.getDate();
      const table = document.querySelector(`[value='${day}']`)
      table.classList.toggle('active-date');
    }
  }, [])

  const handleeventday = () => {

    document.querySelectorAll(".table-date").forEach(el => {
      el.addEventListener("click", e => {
        const id = e.target.getAttribute("id");
        listInformation.forEach(element => {
          let date = element.date.toString();
          if (date.slice(8, 10) === id) {
            console.log(id);
            console.log({ time: element.hour })
            let hour = element.hour.toString();//hora
            let info = [];
            for (const key in listhour) {
              // console.log(listhour[key]);
              if (listhour[key].hour === hour) {
                console.log(listhour[key].hour, hour);
                listhour[key].state = 'reserved'
                // console.log(listhour[key].state);
                const hours = document.getElementById('reserved')
                if (hours !== null) {
                  hours.style.backgroundColor = "#6c25be";
                }

              }
              info.push(listhour[key]);
              localStorage.setItem("listhour", JSON.stringify(info));
              setListhour(info);
            }
          }
        })
      });
    });
  }
  const handleinformation = () => {
    document.querySelectorAll(".iconarrow").forEach(el => {
      el.addEventListener("click", e => {
        let id = e.target.getAttribute("id");
        // console.log("Se ha clickeado el id " + id);
        listInformation.forEach(element => {
          console.log(element.ID, id)
          if (element.ID == id) {
            console.log(element)
            setInformation(element);
          }
        })
      });
    });
    console.log(information.ID);
  }

  const handleNewQuestionButton = async () => {
    const { value } = await Swal.fire({
      title: "New Patient",
      html: ` <input type='text' id='firstname' name='firstname' class='swal2-input' placeholder='Name' />
                <input type='text' id='surname' name='surname' class='swal2-input' placeholder='Surname'/>
                <input type='text' id='gender' name='gender' class='swal2-input' placeholder='Gender' />
                <input type='date' id='birth' name='birth' class='swal2-input' placeholder='Date of Birth'/>
                <input type='email' id='email' name='email' class='swal2-input' placeholder='@example.com'/>
                <input type='number' id='phone' name='phone' class='swal2-input' placeholder='Phone number'/>
                <input type='text' id='direction' name='direction' class='swal2-input' placeholder='Direction'/>
                <input type='date' id='date' name='date' class='swal2-input'/>
                <input type='time' id='time' name='time' class='swal2-input'/>`,
      confirmButtonText: "Add Reservation",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      cancelButtonText: "Dismiss",
      preConfirm: () => {
        const firstname = Swal.getPopup().querySelector('#firstname').value;
        const surname = Swal.getPopup().querySelector('#surname').value;
        const gender = Swal.getPopup().querySelector('#gender').value;
        const birth = Swal.getPopup().querySelector('#birth').value;
        const email = Swal.getPopup().querySelector('#email').value;
        const phone = Swal.getPopup().querySelector('#phone').value;
        const direction = Swal.getPopup().querySelector('#direction').value;
        const date = Swal.getPopup().querySelector('#date').value;
        const time = Swal.getPopup().querySelector('#time').value;
        if (!firstname || !surname || !gender || !birth || !email || !phone || !direction || !date || !time) {
          Swal.showValidationMessage('Please enter an item full information');
        }

        return { firstname, surname, gender, birth, email, phone, direction, date, time };

      },
    })
    if (!value.firstname || !value.surname || !value.gender || !value.birth || !value.email || !value.phone || !value.direction || !value.date || !value.time) return

    // const newListInformation = [
    //   ...listInformation, { id: uuidv4(), ...value }
    // ]
    // localStorage.setItem("listInformation", JSON.stringify(newListInformation));

    // setListInformation(newListInformation);
    //POST add patient
    localStorage.removeItem('listInformation')
    GetPatientGET(setListInformation);
    AddPatientPOST({ ...value });

  }
  var list = []
  const calendar = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();

    var diasMes = new Date(year, month, 0).getDate();
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    let countDia = 1;
    var id = 0;
    let week = [];
    // console.log(diasMes)
    for (var dia = 1; dia <= 2; dia++) {
      var indice = new Date(year, month - 1, dia).getDay();
      if (diasSemana[indice] === 'Domingo' && dia === 1) {
        var diafila1 = 7;
        var diafila2 = diafila1 + 7;//14
        var diafila3 = diafila2 + 7;//20
        var diafila4 = diafila3 + 7;//27
        var diafila5 = diasMes;
        while (countDia <= diafila1) {
          week.push(countDia);
          countDia++;
          if (countDia === diafila1) {
            id++;
            list.push({ id }, { week });
          }
        }
        while (countDia <= diafila2) {
          week.push(countDia);
          countDia++;
          if (countDia === diafila2) {
            id++;
            list.push({ id }, { week });
          }
        }
        while (countDia <= diafila3) {
          week.push(countDia);
          countDia++;
          if (countDia === diafila3) {
            id++;
            list.push({ id }, { week });
          }
        }
        while (countDia <= diafila4) {
          week.push(countDia);
          countDia++;
          if (countDia === diafila4) {
            id++;
            list.push({ id }, { week });
          }
        }
        while (countDia <= diafila5) {
          week.push(countDia);
          countDia++;
          if (countDia === diafila5) {
            id++;
            list.push({ id }, { week });
          }
        }
      }
      if (diasSemana[indice] === 'Lunes' && dia === 1) {
        var diafila1 = 7 - 1;
        var diafila2 = diafila1 + 7;//14
        var diafila3 = diafila2 + 7;//20
        var diafila4 = diafila3 + 7;//27
        var diafila5 = diasMes;
        while (countDia <= diafila1) {
          week.push(countDia);
          countDia++;
          if (countDia === diafila1) {
            id++;
            week.unshift('');
            list.push({ id, week });
          }
        }
        week = [];
        while (countDia <= diafila2) {
          week.push(countDia);
          countDia++;
          if (countDia === diafila2) {
            id++;
            list.push({ id, week });
          }
        }
        week = [];
        while (countDia <= diafila3) {
          week.push(countDia);
          countDia++;
          if (countDia === diafila3) {
            id++;
            list.push({ id, week });
          }
        }
        week = [];
        while (countDia <= diafila4) {
          week.push(countDia);
          countDia++;
          if (countDia === diafila4) {
            id++;
            list.push({ id, week });
          }
        }
        let count = 1;
        week = [];
        while (countDia <= diafila5) {
          week.push(countDia);

          if (countDia === diafila5) {
            if (count === 1) {
              week.push('', '', '', '', '', '');
            } else if (count === 2) {
              week.push('', '', '', '', '');
            } else if (count === 3) {
              week.push('', '', '', '');
            } else if (count === 4) {
              week.push('', '', '');
            } else if (count === 5) {
              week.push('', '');
            } else if (count === 6) {
              week.push('', '');
            }
          }
          if (countDia === diafila5) {
            id++;
            list.push({ id, week });
          }
          countDia++;
          count++;
        }
      }
      if (diasSemana[indice] === 'Martes' && dia === 1) {
        var diafila1 = 7 - 2;
        var diafila2 = diafila1 + 7;//14
        var diafila3 = diafila2 + 7;//20
        var diafila4 = diafila3 + 7;//27
        var diafila5 = diasMes;
        while (countDia <= diafila1) {
          week.push(countDia);
          countDia++;
          if (countDia === diafila1) {
            week.unshift('', '');
            list.push({ week });
          }
        }
        while (countDia <= diafila2) {
          console.log(countDia);
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
        while (countDia <= diafila3) {
          console.log(countDia);
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
        while (countDia <= diafila4) {
          console.log(countDia);
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
        while (countDia <= diafila5) {
          console.log(countDia);
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
      }
      if (diasSemana[indice] === 'Miércoles' && dia === 1) {
        var diafila1 = 7 - 3;
        var diafila2 = diafila1 + 7;//14
        var diafila3 = diafila2 + 7;//20
        var diafila4 = diafila3 + 7;//27
        var diafila5 = diasMes;
        while (countDia <= diafila1) {
          console.log(countDia);
          week.push(countDia);
          countDia++;
          if (countDia === diafila1) {
            week.unshift('', '', '');
            list.push({ week });
          }
        }
        while (countDia <= diafila2) {
          console.log(countDia);
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
        while (countDia <= diafila3) {
          console.log(countDia);
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
        while (countDia <= diafila4) {
          console.log(countDia);
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
        while (countDia <= diafila5) {
          console.log(countDia);
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
      }
      if (diasSemana[indice] === 'Jueves' && dia === 1) {
        var diafila1 = 7 - 4;
        var diafila2 = diafila1 + 7;//10
        var diafila3 = diafila2 + 7;//17
        var diafila4 = diafila3 + 7;//24
        var diafila5 = diasMes;
        while (countDia <= diafila1) {
          week.push(countDia);
          if (countDia === diafila1) {
            week.unshift('', '', '', '');
            id++;
            list.push({ id , week });
          }
          countDia++;
        }
        week = [];
        while (countDia <= diafila2) {
          week.push(countDia);
          if (countDia === diafila2) {
            id++;
            list.push({ id, week });
          }
          countDia++;
        }
        week = [];
        while (countDia <= diafila3) {
          week.push(countDia);
          if (countDia === diafila3) {
            id++;
            list.push({ id, week });
          }
          countDia++;
        }
        week = [];
        while (countDia <= diafila4) {
          week.push(countDia);
          if (countDia === diafila4) {
            id++;
            list.push({ id, week });
          }
          countDia++;
        }
        week = [];
        while (countDia <= diafila5) {
          week.push(countDia);
          if (countDia === diafila5) {
            id++;
            list.push({ id, week });
          }
          countDia++;
        }
      }
      if (diasSemana[indice] === 'Viernes' && dia === 1) {
        var diafila1 = 7 - 5;
        var diafila2 = diafila1 + 7;//14
        var diafila3 = diafila2 + 7;//20
        var diafila4 = diafila3 + 7;//27
        var diafila5 = diasMes;
        while (countDia <= diafila1) {
          console.log(countDia);
          week.push(countDia);
          countDia++;
          if (countDia === diafila1) {
            week.unshift('', '', '', '', '');
            list.push({ week });
          }
        }
        while (countDia <= diafila2) {
          console.log(countDia);
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
        while (countDia <= diafila3) {
          console.log(countDia);
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
        while (countDia <= diafila4) {
          console.log(countDia);
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
        while (countDia <= diafila5) {
          console.log(countDia);
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
      }
      if (diasSemana[indice] === 'Sábado' && dia === 1) {
        var diafila1 = 7 - 6;
        var diafila2 = diafila1 + 7;//14
        var diafila3 = diafila2 + 7;//20
        var diafila4 = diafila3 + 7;//27
        var diafila5 = diasMes;
        while (countDia <= diafila1) {
          week.push(countDia);
          countDia++;
          if (countDia === diafila1) {
            week.unshift('', '', '', '', '', '');
            list.push({ week });
          }
        }
        while (countDia <= diafila2) {
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
        while (countDia <= diafila3) {
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
        while (countDia <= diafila4) {
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
        while (countDia <= diafila5) {
          week.push(countDia);
          list.push({ week });
          countDia++;
        }
      }
    }
  }
  calendar();
  return (
    <div className='option1'>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 col-sm-4">
            {
              listInformation.length === 0 && (
                <h3>
                  Empty List...
                </h3>
              )
            }
            {
              listInformation.map(item => (
                <div className="card">
                  <div className='iconarrow'><i onClick={handleinformation} id={item.ID} class="bi bi-arrow-right-short"></i></div>
                  <div className="card-body text-start">
                    <span className='iconprofile'><ion-icon name="person-circle-outline" className="iconprof"></ion-icon></span>
                    <span className='title1'>{item.name} {item.surname}</span>
                    <br />
                    <span className='title2'>View profile</span>
                    <h5 className="card-title"></h5>
                    <hr className='card-line' />
                    <span className='cardhour'>{item.hour} {item.state}</span>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="col-md-2">
            <div className='AppInformation'>
              <span className='TitleAI'>Appointment Information</span>
              <ul className='listInfo'>
                <li className='infocard'><ion-icon name="calendar-clear-outline"></ion-icon> {information.date}</li>
                <li className='infocard'><ion-icon name="time-outline"></ion-icon> {information.hour} {information.state}</li>
              </ul>
            </div>
            <div className='PatienteInformation'>
              <span className='TitlePI'>Patient Information</span>
              <div class="card cardinformation">
                <div class="card-body cardbody">
                  <span className='iconinfo'><ion-icon name="person-circle-outline" className="iconprof"></ion-icon></span>
                  <span className='titleinfo1'>{information.name} {information.surname}</span>
                  <br />
                  <span className='titleinfo2'>View profile</span>
                  <br />
                  <span className='infospan' >Date of Birth: {information.birth}</span>
                  <br />
                  <span className='infospan'>Gender: {information.gender}</span>
                  <br />
                  <span className='infospan'>Previous Visit:</span>
                  <div className='Contact'>
                    <span className='TitleC'>Contact</span>
                    <br />
                    <span className='iconcontact'><ion-icon name="call-outline"></ion-icon> {information.phonenumber}</span>
                    <br />
                    <span className='iconcontact'><ion-icon name="mail-outline"></ion-icon> {information.email}</span>
                    <br />
                    <span className='iconcontact'><ion-icon name="location-outline"></ion-icon> {information.direction}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="col">
            <div className="content w-100">
              <div className="calendar-container">
                <div className="calendar">
                  <table className="months-table w-100">
                    <tbody>
                      <tr className="months-row">
                        <td className="month">Jan</td>
                        <td className="month">Feb</td>
                        <td className="month">Mar</td>
                        <td className="month">Apr</td>
                        <td className="month">May</td>
                        <td className="month">Jun</td>
                        <td className="month">Jul</td>
                        <td className="month">Aug</td>
                        <td className="month">Sep</td>
                        <td className="month">Oct</td>
                        <td className="month">Nov</td>
                        <td className="month">Dec</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="days-table w-100">
                    <tbody>
                      <tr className="day-row">
                        <td className="day">Sun</td>
                        <td className="day">Mon</td>
                        <td className="day">Tue</td>
                        <td className="day">Wed</td>
                        <td className="day">Thu</td>
                        <td className="day">Fri</td>
                        <td className="day">Sat</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="frame">
                    <table className="dates-table w-100">
                      <tbody className="tbody">
                        {
                          list.map((row) => {
                            return (
                              <tr id='days'>
                                <CalendarRow key={row.id} number={row.week} handleeventday={handleeventday} />
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="events-container">
              <h4>Your task for today</h4>
              <div className='row task'>
                <div className='col-sm'>
                  <div className='squaredis'>
                    <span className='disponible'>Available</span>
                  </div>
                  <div className='squareocp'>
                    <span className='ocupado'>Ocucupied</span>
                  </div>
                  <div className='squareatn'>
                    <span className='atendido'>Attend</span>
                  </div>
                  <ul className='listahour'>
                    {
                      Object.values(listhour).map(item => (
                        <>
                          <li className='hour' id={item.state}>{item.hour}</li>
                        </>
                      ))
                    }
                  </ul>
                </div>
              </div>
              <button onClick={handleNewQuestionButton} className="btn btn-primary button" id="add-button">
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appoinment