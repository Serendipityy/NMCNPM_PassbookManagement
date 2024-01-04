import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./listInfo.css";

const ListlyInfo = ({ data, confirmed }) => {
  // const rows = [
  //     {
  //         id: 1,
  //         date: '2023-11-11',
  //         open: '3000 USD',
  //         close: '6000 USD',
  //         difference: '3000 USD',
  //         type: 'DDA'
  //     },
  //     {
  //         id: 2,
  //         date: '2023-11-15',
  //         open: '3000 USD',
  //         close: '6000 USD',
  //         difference: '3000 USD',
  //         type: '3-months'
  //     },
  //     {
  //         id: 3,
  //         date: '2023-10-16',
  //         open: '3000 USD',
  //         close: '6000 USD',
  //         difference: '3000 USD',
  //         type: '6-months'

  //     },
  // ];

  // rows.map(row => {
  //     row.month = row.date.split('-')[1]
  // })

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">No</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Open number</TableCell>
            <TableCell className="tableCell">Close number</TableCell>
            <TableCell className="tableCell">Difference</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {confirmed &&
            (data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">{item.day}</TableCell>
                <TableCell className="tableCell">{item.numOfOpened}</TableCell>
                <TableCell className="tableCell">{item.numOfClosed}</TableCell>
                <TableCell className="tableCell">
                  {item.numOfOpened - item.numOfClosed}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
                <TableCell colSpan={5} className="tableCell">
                  There are no monthly reports to display
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListlyInfo;
