import React from 'react'

function Days({ year, months, monthId, setSelectedDay, setSelectedMonth, setSelectedYear }) {
    const date = new Date(year, monthId);

    const monthDays = [];
    const daysOfMOnths = [31, 28, 31, 30 , 31, 30, 30, 31, 30, 31, 30, 31];
    let day = 1;
    let nullKey = 1;

    function getDays(){
        if(monthId == 1 && year % 4 === 0){
            return daysOfMOnths[monthId] + 1;
        }
        else return daysOfMOnths[monthId]
    }

    for(let i = 0; i < (getDays() + date.getDay()) / 7; i++){
        monthDays[i] = [];
        for(let j = 0; j < 7; j++){
            if( (i == 0 && j < date.getDay()) || day > getDays()) monthDays[i][j] = null;
            else monthDays[i][j] = new Date(year, monthId, day++);
        }

    }

    return(
        monthDays.map((week) =>{
           return <tr key={week}>
                {
                    week.map((day) => {     
                        return day != null ? (
                            <td key={ `day-${day.getDate()}`}
                            onClick={() =>{
                                setSelectedDay(day.getDate());
                                setSelectedMonth(months[monthId]);
                                setSelectedYear(year);
                            }} className="tdOfDay"> {day.getDate()} </td>

                        ): <td key={++nullKey}></td>
                    })
                }
                 </tr>
        })  
    )

}

export default Days