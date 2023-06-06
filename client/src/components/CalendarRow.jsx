import React from "react";
const CalendarRow = ({number, handleeventday}) => {
  
  return (
    number.map((i) => (
      <td onClick={handleeventday} id={i} className="table-date" value={i}>{i}</td>
    ))  
  );
}
export default CalendarRow;