import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './listInfo.css'


const ListDailyInfo = ({ date }) => {

    const rows = [
        {
            id: 1,
            type: 'DDA',
            totalRevenue: '3000 USD',
            totalExpenditure: '6000 USD',
            difference: '3000 USD',
            date: '2023-11-11'
        },
        {
            id: 2,
            type: '3 months',
            totalRevenue: '3000 USD',
            totalExpenditure: '6000 USD',
            difference: '3000 USD',
            date: '2023-11-11'
        }, {
            id: 3,
            type: '6 months',
            totalRevenue: '3000 USD',
            totalExpenditure: '6000 USD',
            difference: '3000 USD',
            date: '2023-11-10'
        }
    ];

    return (
        <TableContainer component={Paper} className='table'>
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
                    {rows
                        .filter((row) => row.date === date)
                        .map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="tableCell">{row.id}</TableCell>
                                <TableCell className="tableCell">
                                    <span className={`type _${row.type}`}>{row.type}</span>
                                </TableCell>
                                <TableCell className="tableCell">{row.totalRevenue}</TableCell>
                                <TableCell className="tableCell">{row.totalExpenditure}</TableCell>
                                <TableCell className="tableCell">{row.difference}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ListDailyInfo