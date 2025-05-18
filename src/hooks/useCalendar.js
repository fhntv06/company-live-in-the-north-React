import { useState } from 'react';

const useCalendar = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const dateNow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  const [dateSelect, setDateSelect] = useState({
    firstSelect: dateNow,
    secondSelect: 0,
  });

  const toggleCalendarHandler = () => { setCalendarOpen(!calendarOpen); };

  const dateSelectHandler = (d) => {
    setDateSelect(d);
  };

  return {
    calendarOpen,
    toggleCalendarHandler,
    dateSelect,
    dateSelectHandler,
    dateNow,
  };
};

export default useCalendar;
