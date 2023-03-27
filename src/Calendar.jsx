import React, { useEffect } from 'react'
import { useState } from 'react';
import Days from './Days';

function Calendar() {
    const date = new Date();
    const years = [2018, 2019, 2020, 2021 ,2022, 2023, 2024, 2025, 2026, 2027, 2028];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [monthId, setMonthId] = useState(date.getMonth());
    const [yearId, setYearId] = useState(years.indexOf(date.getFullYear()));
    const [selectedDay, setSelectedDay] = useState(date.getDate());
    const [selectedMonth, setSelectedMonth] = useState(months[date.getMonth()]);
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());


    function moveToPrevMonth(){
        monthId > 0 ? setMonthId(monthId - 1) :  moveToPrevYear();
    }

    function moveToNextMonth(){
        monthId < months.length - 1 ? setMonthId(monthId + 1) : moveToNextYear();
    }

    function moveToPrevYear(){
        setMonthId(months.length - 1);
        yearId > 0 ? setYearId(yearId - 1) : setYearId(years.length - 1);
    }
    function moveToNextYear(){
        setMonthId(0);
        yearId < years.length - 1 ? setYearId(yearId + 1) : setYearId(0);
    }
    



    useEffect(() =>{
        setMonthId(monthId);
        setYearId(yearId);
    },[monthId,yearId])



  return (
    <div className="content">
        <div className="info">
            <h1>Choose A Date</h1>
            <h2> {`${selectedDay} / ${selectedMonth} / ${selectedYear}`} </h2>
        </div>
        <table className='calendar'>
            <thead>
                <tr className='year'>
                    <th>{years[yearId]}</th>
                </tr>
                <tr className='month'>
                    <th>
                        <button onClick={moveToPrevMonth}> 
                            <i className="fa-solid fa-chevron-left fa-sm"></i> 
                        </button>
                    </th>
                    <th className='monthName'>{months[monthId]}</th>
                    <th>
                        <button onClick={moveToNextMonth}>
                            <i className="fa-solid fa-chevron-right fa-sm"></i>
                        </button>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr className='week'>
                    <td>S</td>
                    <td>M</td>
                    <td>T</td>
                    <td>W</td>
                    <td>T</td>
                    <td>F</td>
                    <td>S</td>
                </tr>
                <Days year={years[yearId]} 
                        months={months}
                        monthId={monthId} 
                        setSelectedDay={setSelectedDay} 
                        setSelectedMonth={setSelectedMonth} 
                        setSelectedYear={setSelectedYear} 
                />
            </tbody>
        </table>  
    </div>  
  )
}

export default Calendar