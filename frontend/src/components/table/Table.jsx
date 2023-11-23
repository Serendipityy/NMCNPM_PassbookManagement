import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './table.css'

const List = () => {

    const rows = [
        {
            id: 1,
            code: 'STK001',
            type: 'DDA',
            customer: 'Helen',
            balance: '3000 USD'
        },
        {
            id: 2,
            code: 'STK002',
            type: '3 months',
            customer: 'Peter',
            balance: '1200 USD'
        },
        {
            id: 3,
            code: 'STK003',
            type: 'DDA',
            customer: 'Louis',
            balance: '1000 USD'
        },
        {
            id: 4,
            code: 'STK004',
            type: '6 months',
            customer: 'Glory',
            balance: '6666 USD'
        },
        {
            id: 5,
            code: 'STK005',
            type: '6 months',
            customer: 'Alexander',
            balance: '2028 USD'
        },
        {
          id: 6,
          code: 'STK006',
          type: '3 months',
          customer: 'Serendipity',
          balance: '1314666 USD'
      },
    ];

  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">No</TableCell>
            <TableCell className="tableCell">Code</TableCell>
            <TableCell className="tableCell">Type</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.code}</TableCell>
              
              <TableCell className="tableCell">
                <span className={`type _${row.type}`}>{row.type}</span>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default List