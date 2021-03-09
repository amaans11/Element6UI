import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const AgGridTable = ({ Heading }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
    { make: "Toyot2a", model: "Celica", price: 35000 },
    { make: "Forrwed", model: "Mondeo", price: 32000 },
    { make: "Porwesfsche", model: "Boxter", price: 72000 },
    { make: "Toysdfota", model: "Celica", price: 35000 },
    { make: "Fofsrd", model: "Mondeo", price: 32000 },
    { make: "Powerrsche", model: "Boxter", price: 72000 },
    { make: "Toweryota", model: "Celica", price: 35000 },
    { make: "Fowerrd", model: "Mondeo", price: 32000 },
    { make: "Powerrsche", model: "Boxter", price: 72000 },
    { make: "Toywddrewota", model: "Celica", price: 35000 },
    { make: "Forwerd", model: "Mondeo", price: 32000 },
    { make: "Porwewrsche", model: "Boxter", price: 72000 },
    { make: "Toretetyot2a", model: "Celica", price: 35000 },
    { make: "For6456rwed", model: "Mondeo", price: 32000 },
    { make: "Porwerewesfsche", model: "Boxter", price: 72000 },
    { make: "Toyssffsdfota", model: "Celica", price: 35000 },
    { make: "Fofsgdfgrd", model: "Mondeo", price: 32000 },
    { make: "Powerrsdfsfsdfsche", model: "Boxter", price: 72000 },
    { make: "Towsfderyota", model: "Celica", price: 35000 },
    { make: "Fowsfserrd", model: "Mondeo", price: 32000 },
    { make: "Powsfdsferrsche", model: "Boxter", price: 72000 },
  ]);

  const exportCsv = () => {
    var params = {
      fileName: "test",
    };

    gridApi.exportDataAsCsv(params);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <div
        style={{
          display: "flex",
          background: "#000",
          padding: "10px",
          color: "#cecece",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6 className="text-uppercase">{Heading}</h6>
        <CloudDownloadOutlinedIcon
          onClick={exportCsv}
          style={{ fontSize: 24, cursor: "pointer" }}
        />
      </div>
      <AgGridReact
        rowData={rowData}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={20}
      >
        <AgGridColumn field="make" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn
          field="model"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="price"
          sortable={true}
          filter={true}
        ></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default AgGridTable;
