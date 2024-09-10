import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import BackendData from "../utilities/BackendData";

export const ServicesContextData = createContext();

export default function ServicesContext({ children }) {
  const [servicesData, setServicesData] = useState([]);
  const [carstypesData, setcartypesData] = useState([]);

  const fetchServicesData = async () => {
    try {
      const response = await axios.get(`${BackendData.url}show/services`);
      setServicesData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCarsTypesData = async () => {
    try {
      const response = await axios.get(`${BackendData.url}show/car/types`);
      setcartypesData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServicesData();
    fetchCarsTypesData();
  }, []);

  return (
    <ServicesContextData.Provider
      value={[servicesData, fetchServicesData, carstypesData, fetchCarsTypesData]}
    >
      {children}
    </ServicesContextData.Provider>
  );
}
