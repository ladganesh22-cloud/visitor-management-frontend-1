import { useState } from "react";
import { useVisitorContext } from "../hooks/useVisitorContext";
import { useAppointmentContext } from "../hooks/useAppointmentContext";
import { usePassContext } from "../hooks/usePassContext";
import ExportCSV from "../../components/ExportCSV";


const Reports = () => {
  const { visitors } = useVisitorContext();
  const { appointments } = useAppointmentContext();
  const { passes } = usePassContext();

  const [reportType, setReportType] = useState("VISITORS");

  const getReportData = () => {
    switch (reportType) {
      case "VISITORS":
        return visitors;
      case "APPOINTMENTS":
        return appointments;
      case "PASSES":
        return passes;
      default:
        return [];
    }
  };

  const data = getReportData();

  return (
    <div>
      <h2>Reports & Exports</h2>

      <select
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
      >
        <option value="VISITORS">Visitors</option>
        <option value="APPOINTMENTS">Appointments</option>
        <option value="PASSES">Passes</option>
      </select>

      <div style={{ marginTop: "15px" }}>
        <ExportCSV data={data} filename={reportType} />
        <ExportPDF data={data} title={reportType} />
      </div>

      <table border="1" cellPadding="6" style={{ marginTop: "15px" }}>
        <thead>
          <tr>
            {data[0] &&
              Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, idx) => (
                <td key={idx}>{String(val)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
