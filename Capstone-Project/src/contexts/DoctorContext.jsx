import { createContext, useState } from "react";

export const DoctorContext = createContext();

export const DoctorListProvider = ({ children }) => {

    const [doctors, setDoctors] = useState([]);
    const [doctor, setDoctor] = useState({});

    const updateDoctors = (doctors) => {
        setDoctors(doctors);
    }

    const addDoctor = (doctor) => {
        setDoctors([...doctors, doctor]);
    }

    const updateDoctor = (doctor) => {
        setDoctor(doctor);
    } 

    const removeDoctorById = (id) => {
        const newDoctor = doctors.filter((doctor) => doctor.id !== id);
        setDoctors(newDoctor);
    }

    return (
        <DoctorContext.Provider value={{doctors, doctor, updateDoctors,addDoctor,updateDoctor,removeDoctorById}}>
            {children}
        </DoctorContext.Provider>
    )
}