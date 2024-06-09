import { createContext, useState } from "react";

export const CustomerContext = createContext();

export const CustomerListProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});

  const updateCustomers = (customers) => {
    setCustomers(customers);
  };

  const addCustomer = (customer) => {
    setCustomers([...customers, customer]);
  };

  const updateCustomer = (customer) => {
    setCustomer(customer);
  };

  const removeCustomerById = (id) => {
    const newCustomer = customers.filter((customer) => customer.id !== id);
    setCustomers(newCustomer);
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        customers,
        updateCustomers,
        addCustomer,
        updateCustomer,
        removeCustomerById,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
