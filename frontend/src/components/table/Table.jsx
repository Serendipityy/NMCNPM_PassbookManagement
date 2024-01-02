import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { listPassbook, paginatePassbook } from "../../services/userService";
import "./table.css";
import ReactPaginate from "react-paginate";

const List = () => {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState([]);

  const fetchData = async (page) => {
    try {
      // const apiData = await listPassbook();
      const apiData = await paginatePassbook(page);
      // console.log("check api: ", apiData);
      if (+apiData.status === 200) {
        // console.log("check apiData: ", apiData);
        // console.log("check data: ", apiData.data);
        if (apiData.data && apiData.data.data) {
          setData(apiData.data.data);
          setTotalPage(apiData.data.total_pages);
        }
        console.log("data: ", data);
      }
    } catch (error) {
      // Handle errors as needed
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(0);
  }, []);
  const handlePageClick = (event) => {
    // console.log("check event: ", event.selected);
    fetchData(event.selected);
  };
  return (
    <>
      <TableContainer component={Paper} className="table">
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
            {data &&
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="tableCell">{index + 1}</TableCell>
                  <TableCell className="tableCell">
                    {item.passbookCode}
                  </TableCell>

                  <TableCell className="tableCell">
                    <span
                      className={`type _${
                        item.type === 0
                          ? "Non-term"
                          : item.type === 1
                          ? "3 months"
                          : "6 months"
                      }`}
                    >
                      {item.type === 0
                        ? "Non-term"
                        : item.type === 1
                        ? "3 months"
                        : "6 months"}
                    </span>
                  </TableCell>
                  <TableCell className="tableCell">
                    {item.customerName}
                  </TableCell>
                  <TableCell className="tableCell">{item.money}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
};

export default List;
