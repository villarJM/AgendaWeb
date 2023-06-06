import React, { useEffect, useState } from 'react'
import '../Home.css'
import { GetCountPatientGET, GetCountUserGET } from '../api/agenda.api';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['Patient', 'Users'];
const count = {
  patient : 3,
  user: 6
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const Home = () => {
  const [listCoutPatient, setListCoutPatient] = useState(
    JSON.parse(localStorage.getItem("listCoutPatient")) || []
  );
  const [listCoutUsers, setListCoutUsers] = useState(
    JSON.parse(localStorage.getItem("listCoutUsers")) || []
  );
  useEffect(() => {
    GetCountPatientGET(setListCoutPatient);
    GetCountUserGET(setListCoutUsers);
  }, [])
  return (
    <div>
      <div class="container dashboardCard">
        <div class="row">
          <div class="col-lg-4">
            <div className="card CardPatient">
              <div className="card-body text-start CardPatient">
                <span className='IconPatient'><ion-icon name="person-circle-outline" className="IconPt"></ion-icon></span>
                <span className='TitlePatient'>Patient</span>
                <br />
                <span className='CountPatient'>{listCoutPatient.count}</span>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div className="card">
              <div className="card-body text-start CardUsers">
                <span className='IconUsers'><ion-icon name="person-circle-outline" className="IconUs"></ion-icon></span>
                <span className='TitleUsers'>Users</span>
                <br />
                <span className='CountUsers'>{listCoutUsers.count}</span>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div className="card">
              <div className="card-body text-start CardPatient">
                <span className='IconPatient'><ion-icon name="person-circle-outline" className="IconPt"></ion-icon></span>
                <span className='TitlePatient'>Users</span>
                <br />
                <span className='CountPatient'>22,678</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container text-center DashboardGraphic">
        <div class="row RowGraphic">
          <div class="col-md-12 Graphic">
              <Line options={options} data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home