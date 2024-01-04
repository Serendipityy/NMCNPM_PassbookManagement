import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./table.css";

// const ListDailyInfo = ({ date }) => {
const ListDailyInfo = ({ data }) => {
  //   const rows = [
  //     {
  //       id: 1,
  //       type: "DDA",
  //       totalRevenue: "3000 USD",
  //       totalExpenditure: "6000 USD",
  //       difference: "3000 USD",
  //       date: "2023-11-11",
  //     },
  //     {
  //       id: 2,
  //       type: "3 months",
  //       totalRevenue: "3000 USD",
  //       totalExpenditure: "6000 USD",
  //       difference: "3000 USD",
  //       date: "2023-11-11",
  //     },
  //     {
  //       id: 3,
  //       type: "6 months",
  //       totalRevenue: "3000 USD",
  //       totalExpenditure: "6000 USD",
  //       difference: "3000 USD",
  //       date: "2023-11-10",
  //     },
  //   ];

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">No</TableCell>
            <TableCell className="tableCell">Type</TableCell>
            <TableCell className="tableCell">Total Revenue</TableCell>
            <TableCell className="tableCell">Total expenditure</TableCell>
            <TableCell className="tableCell">Difference</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            // .filter((row) => row.date === date)
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">
                  <span
                    className={`type _${
                      item.type === 0
                        ? "Non-term"
                        : item.type === 1
                        ? "3 months"
                        : item.type ===2 ? 
                        "6 months"
                        : "other"
                    }`}
                  >
                    {item.termName}
                  </span>
                </TableCell>
                <TableCell className="tableCell">{item.totalRevenue}</TableCell>
                <TableCell className="tableCell">
                  {item.totalExpenditure}
                </TableCell>
                <TableCell className="tableCell">
                  {item.totalRevenue - item.totalExpenditure}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListDailyInfo;
