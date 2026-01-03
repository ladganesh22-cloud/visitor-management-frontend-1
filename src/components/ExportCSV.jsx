import React from "react";

const ExportCSV = ({ data = [], filename = "export" }) => {
  const exportCSV = () => {
    if (!data.length) {
      alert("No data available to export");
      return;
    }

    // Extract headers
    const headers = Object.keys(data[0]).join(",");

    // Build rows
    const rows = data.map((row) =>
      Object.values(row)
        .map((val) =>
          `"${String(val ?? "")
            .replace(/"/g, '""')
            .replace(/\n/g, " ")}"`
        )
        .join(",")
    );

    const csvContent = [headers, ...rows].join("\n");

    // Create file
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    // Download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={exportCSV} disabled={!data.length}>
      Export CSV
    </button>
  );
};

export default ExportCSV;
