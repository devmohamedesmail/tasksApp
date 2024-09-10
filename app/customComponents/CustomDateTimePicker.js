import { useState, useEffect } from "react";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker"; // Make sure to install this package

export default function CustomDateTimePicker({ isVisible, onClose, onConfirm }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      if (mode === "date") {
        setDate(selectedDate);
        setMode("time");
        
      } else {
        setDate(selectedDate);
        onConfirm(selectedDate);
        onClose(); 
        setMode("date"); 
      }
    } else {
      onClose(); 
      setMode("date"); 
    }
  };


  
  return (
    isVisible && (
      <DateTimePicker
        value={date}
        mode={mode}
        is24Hour={false}
        display="spinner"
        onChange={onChange}
      />
    )
  );
}
