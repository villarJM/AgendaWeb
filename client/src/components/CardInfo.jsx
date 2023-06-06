import React from 'react'

function CardInfo({nombre}) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{nombre}</h5>
        <hr />
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  )
}

export default CardInfo