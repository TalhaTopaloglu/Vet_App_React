import { createContext, useState } from "react";

export const ReportContext = createContext();

export const ReportListProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [report, setReport] = useState({});

  const updateReports = (reports) => {
    setReports(reports);
  };

  const addReport = (report) => {
    setReports([...reports, report]);
  };

  const updateReport = (report) => {
    setReport(report);
  };

  const removeReportById = (id) => {
    const newReport = reports.filter((report) => report.id !== id);
    setReports(newReport);
  };

  return (
    <ReportContext.Provider
      value={{
        report,
        reports,
        updateReports,
        addReport,
        updateReport,
        removeReportById,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
