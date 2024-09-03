import React, { useState } from 'react';

// Define the type for the props
interface MonthYearSelectorProps {
  onChange?: (selectedDate: { month: number; year: number }) => void;
}

/**
 * 
 * @param param0 callback funtion
 * @returns 
 */

// Define the MonthYearSelector component using TypeScript
const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({ onChange }) => {
  // State to store the selected month and year
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // Default current month
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // Default current year

  // List of month names for the dropdown
  const months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];

  // Calculate the list of available years (last 5 years including current)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  // Handle changes in month or year selection
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(event.target.value);
    setSelectedMonth(month);
    if (onChange) onChange({ month, year: selectedYear });
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
    if (onChange) onChange({ month: selectedMonth, year });
  };

  return (
    <div>
      <label style={{color:"#fff"}}>
        Month:
        <select className='form-select ' value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.name}
            </option>
          ))}
        </select>
      </label>

      <label style={{color:"#fff"}}>
        Year:
        <select className='form-select ' value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default MonthYearSelector;
