import React, { createContext, useContext, useEffect, useState } from "react";
import BackendData from "../utilities/BackendData";
import axios from "axios";

export const DataContext = createContext();
export default function DataProvider({ children }) {
  const [branches, setBranches] = useState([]);
  const [invoiceTypes, setInvoiceTypes] = useState([]);
  const [paidMethods, setPaidMethods] = useState([]);
  const[invoices, setInvoices] = useState([]);
  const[staff, setStaff] = useState([]);
 

  const fetchBranches = async () => {
    try {
      const response = await axios.get(`${BackendData.url}show/branches`);
      setBranches(response.data.data);
    } catch (error) {
      console.log("fetch branches error " + error);
    }
  };

  const fetchInvoiceTypes = async () => {
    try {
      const response = await axios.get(`${BackendData.url}show/invoices/type`);
      setInvoiceTypes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPaidMethods = async () => {
    try {
      const response = await axios.get(`${BackendData.url}show/method/type`);
      setPaidMethods(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${BackendData.url}show/invoices`);
      setInvoices(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${BackendData.url}show/staff`);
      setStaff(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };






  useEffect(() => {
    fetchBranches();
    fetchInvoiceTypes()
    fetchPaidMethods();
    fetchInvoices();
    fetchStaff();
  }, []);



  return (
    <DataContext.Provider value={{ branches, fetchBranches ,invoiceTypes,fetchInvoiceTypes,paidMethods,fetchPaidMethods,invoices,fetchInvoices,staff,fetchStaff}}>
      {children}
    </DataContext.Provider>
  );
}
