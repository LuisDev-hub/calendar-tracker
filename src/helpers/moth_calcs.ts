
//new Date(year, month + 1, 0)  ultimo dia del mes actual
export function getDaysInMonth(year: number, month: number) {
    return new Date(year, month+1, 0).getDate();
}

export function arrayDaysOfMonth(year: number, month: number) {
    const offset = getStartWeekDay(year, month);
    const total_days = getDaysInMonth(year, month);
    const days = new Array();
    for (let index = 0; index < offset; index++) {
        days.push("")
    }
    for (let index = 1; index <= total_days; index++) {
        days.push(index)
    }
    return days
}

export function getStartWeekDay(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
}

// Dates as is month number
export function toYMD(y: number, m: number, d: number): string {
    return `${String(y).padStart(2, "0")}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`
}
export function toYMDLegible(y: number, m: number, d: number): string {
    return `${String(y).padStart(2, "0")}-${String(m+1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
}

export function formatDateF(date: Date) {
    return {
        year: date.getFullYear(), 
        month: date.getMonth(), 
        day: date.getDate()
    }
}
