import { createContext, useState } from "react";

export const AppointmentContext = createContext();

export const AppointmentListProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [appointment, setAppointment] = useState({});

  const updateAppointments = (appointments) => {
    setAppointments(appointments);
  };

  const addAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const updateAppointment = (appointment) => {
    setAppointment(appointment);
  };

  const removeAppointmentById = (id) => {
    const newAppointment = appointments.filter((appointment) => appointment.id !== id);
    setAppointments(newAppointment);
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointment,
        appointments,
        updateAppointments,
        addAppointment,
        updateAppointment,
        removeAppointmentById,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
