import React, { useEffect, useState, useReducer } from 'react'
import Days from './Days';

function Calendar() {
    const date = new Date();
    const years = [2018, 2019, 2020, 2021 ,2022, 2023, 2024, 2025, 2026, 2027, 2028];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [monthId, dispatchMonthId] = useReducer(useMonthReducer, {month: date.getMonth()} );
    const [yearId, dispatchYearId] = useReducer(useYearReducer, {year: years.indexOf(date.getFullYear())} );
    const [selectedDay, setSelectedDay] = useState(date.getDate());
    const [selectedMonth, setSelectedMonth] = useState(months[date.getMonth()]);
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());

    function useMonthReducer(state, action){
        if(action.type == "moveToPrevMonth") return { month: state.month - 1 }
        else if(action.type == "moveToNextMonth") return { month: state.month + 1 }
        else if(action.type == "moveToLastMonthInPrevYear") return { month: months.length - 1 }
        else if(action.type == "moveToFirstMonthInNextYear") return { month: 0 }
    }

    function useYearReducer(state, action){
        if(action.type == "moveToPrevYear"){
            dispatchMonthId({type: "moveToLastMonthInPrevYear"}) 
            return state.year > 0 ? {year: state.year - 1} : {year: years.length - 1}
        }
        else if(action.type == "moveToNextYear"){
            dispatchMonthId({type: "moveToFirstMonthInNextYear"})
            return state.year < years.length - 1 ? {year: state.year + 1} : {year: 0}
        }
    }
    
  return (
    <div className="content">
        <div className="info">
            <h1>Choose A Date</h1>
            <h2> {`${selectedDay} / ${selectedMonth} / ${selectedYear}`} </h2>
        </div>
        <table className='calendar'>
            <thead>
                <tr className='year'>
                    <th>{years[yearId.year]}</th>
                </tr>
                <tr className='month'>
                    <th>
                        <button onClick={() => { monthId.month > 0 ? dispatchMonthId({type: "moveToPrevMonth"}) : dispatchYearId( {type: "moveToPrevYear"} )} }> 
                            <i className="fa-solid fa-chevron-left fa-sm"></i> 
                        </button>
                    </th>
                    <th className='monthName'>{months[monthId.month]}</th>
                    <th>
                        <button onClick={() => { monthId.month < months.length - 1 ? dispatchMonthId({type: "moveToNextMonth"}) : dispatchYearId( {type: "moveToNextYear"} )} }>
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
                <Days year={years[yearId.year]} 
                        months={months}
                        monthId={monthId.month} 
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