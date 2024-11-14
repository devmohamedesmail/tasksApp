import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import BackendData from "../utilities/BackendData";

export const ServicesContextData = createContext();

export default function ServicesContext({ children }) {
  
  const [carstypesData, setcartypesData] = useState([]);

 

  const fetchCarsTypesData = async () => {
    try {
      const response = await axios.get(`${BackendData.url}show/car/types`);
      setcartypesData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   
    fetchCarsTypesData();
  }, []);

  return (
    <ServicesContextData.Provider
      value={{carstypesData, fetchCarsTypesData}}
    >
      {children}
    </ServicesContextData.Provider>
  );
}
