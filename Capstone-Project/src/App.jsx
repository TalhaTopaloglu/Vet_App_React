import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { CustomerListProvider } from "./contexts/CustomerContext";
import Customers from "./components/Customer/Customers";
import CustomerList from "./components/Customer/CustomerList";
import CustomerDetail from "./components/Customer/CustomerDetail";
import UpdateCustomerForm from "./components/Customer/UpdateCustomerForm";
import Animals from "./components/Animal/Animals";
import AnimalList from "./components/Animal/AnimalList";
import AnimalDetail from "./components/Animal/AnimalDetail";
import UpdateAnimalForm from "./components/Animal/UpdateAnimalForm";
import { AnimalListProvider } from "./contexts/AnimalContext";
import Home from "./components/Home/Home";
import { DoctorListProvider } from "./contexts/DoctorContext";
import Doctors from "./components/Doctor/Doctors";
import DoctorList from "./components/Doctor/DoctorList";
import DoctorDetail from "./components/Doctor/DoctorDetail";
import AvailableDates from "./components/AvailableDate/AvailableDates";
import UpdateDoctorForm from "./components/Doctor/UpdateDoctorForm";
import { AvailableDateListProvider } from "./contexts/AvailableDateContext";
import AvailableDateDetail from "./components/AvailableDate/AvailableDateDetail";
import { AppointmentListProvider } from "./contexts/Appointment";
import Appointments from "./components/Appointment/Appointments";
import AppointmentList from "./components/Appointment/AppointmentList";
import UpdateAppointmentForm from "./components/Appointment/UpdateAppointmentForm";
import AppointmentDetail from "./components/Appointment/AppointmentDetail";
import { VaccineListProvider } from "./contexts/VaccinesContext";
import Vaccines from "./components/Vaccine/Vaccines";
import VaccineList from "./components/Vaccine/VaccineList";
import VaccineDetail from "./components/Vaccine/VaccineDetail";
import UpdateVaccineForm from "./components/Vaccine/UpdateVaccineForm";
import AvailableDateList from "./components/AvailableDate/AvailableDateList";
import { ReportListProvider } from "./contexts/ReportContext";
import CreateReportForm from "./components/Reports/CreateReportForm";
import ReportDetail from "./components/Reports/ReportDetail";
import ReportList from "./components/Reports/ReportList";
import Reports from "./components/Reports/Reports";
import ReportUpdateForm from "./components/Reports/ReportUpdateForm";
import CreateVaccineForm from "./components/Vaccine/CreateVaccineForm";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
      <CustomerListProvider>
        <Routes>
          <Route path="/customer" element={<Customers />}>
            <Route index element={<CustomerList />} />
            <Route path=":id" element={<CustomerDetail />} />
            <Route path=":id/edit" element={<UpdateCustomerForm />} />
          </Route>
        </Routes>
      </CustomerListProvider>
      <AnimalListProvider>
        <Routes>
          <Route path="/animal" element={<Animals />}>
            <Route index element={<AnimalList />} />
            <Route path=":id" element={<AnimalDetail />} />
            <Route path=":id/edit" element={<UpdateAnimalForm />} />
          </Route>
        </Routes>
      </AnimalListProvider>
      <DoctorListProvider>
        <AvailableDateListProvider>
          <Routes>
            <Route path="/doctor" element={<Doctors />}>
              <Route index element={<DoctorList />} />
              <Route path=":id" element={<DoctorDetail />} />
              <Route path=":id/edit" element={<UpdateDoctorForm />} />
            </Route>
              <Route path="/available-date" element={<AvailableDates />}>
              <Route index element={<AvailableDateList />}/>
              <Route path="available-date:id" element={<AvailableDateDetail />}/>
            </Route>
          </Routes>
        </AvailableDateListProvider>
      </DoctorListProvider>
      <AppointmentListProvider>
        <Routes>
          <Route path="/appointment" element={<Appointments />}>
            <Route index element={<AppointmentList />} />
            <Route path=":id" element={<AppointmentDetail />} />
            <Route path=":id/edit" element={<UpdateAppointmentForm />} />
          </Route>
        </Routes>
      </AppointmentListProvider>
      <VaccineListProvider>
      <Routes>
          <Route path="/vaccine" element={<Vaccines />}>
            <Route index element={<VaccineList />} />
            <Route path=":id" element={<VaccineDetail />} />
            <Route path=":id/edit" element={<UpdateVaccineForm />} />
          </Route>
            <Route path="vaccine/new" element={<CreateVaccineForm />}/>
        </Routes>
      </VaccineListProvider>
      <ReportListProvider>
      <Routes>
          <Route path="/report" element={<Reports />}>
            <Route index element={<ReportList />} />
            <Route path=":id" element={<ReportDetail />} />
            <Route path=":id/edit" element={<ReportUpdateForm />}/>
            <Route path="/report/new" element={<CreateReportForm />}/>
          </Route>
        </Routes>
      </ReportListProvider>
    </>
  );
}

export default App;
