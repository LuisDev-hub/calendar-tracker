import { useState } from "react";
import { toYMD, getStartWeekDay, getDaysInMonth, arrayDaysOfMonth, formatDateF } from "../helpers/moth_calcs";
import { WEEKDAYS, MONTHS_NAMES } from "../constants/months";
import { useCalenContext } from "../AppContext";
import "./GridCalendar.css"

interface CGridPropos {
  date: Date;
}

function CalendarGrid({date}:CGridPropos) {
  const { getArrayLang } = useCalenContext()
  const {year, month, day} = formatDateF(new Date(date))
  const today = new Date();
  const MONTHS = getArrayLang(MONTHS_NAMES)
  const WEEK = getArrayLang(WEEKDAYS)
  const days = arrayDaysOfMonth(year, month)

  const textToChar = (text: string) => {
    return text.substring(0, 1);
  }
    
  return (
    <div className="calendar-container">
      {/* Header controls */}
      <div className="calendar-header">
        {/* <button onClick={handlePrevMonth}>&lt;</button> */}
        <h2>{MONTHS[month]} {year}</h2>
        {/* <button onClick={handleNextMonth}>&gt;</button> */}
      </div>

      {/* Weekdays row */}
      <div className="calendar-grid weekdays">
        {WEEK.map((day) => (
          <div key={day} className="weekday-cell">{textToChar(day)}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="calendar-grid days">
        {days.map((d, index) => {
          const {
            year: tY, 
            month: tM, 
            day: tD
          } = formatDateF(today)
          const isToday = 
            d === tD && 
            month === tM && 
            year === tY;

          return (
            <div 
              key={index} 
              className={`day-cell ${d ? '' : 'empty'} ${isToday ? 'today' : ''}`}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;