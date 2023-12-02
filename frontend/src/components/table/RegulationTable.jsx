import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getListTerm } from "../../services/userService";
import ModalPassbook from "../../pages/ModalPassbook";
import "./table.css";
import "@fortawesome/fontawesome-free/css/all.css";
const RegulationTable = () => {
  const [data, setData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getListTerm();
        if (+apiData.status === 200) {
          console.log("check term: ", apiData);
          // console.log("check data: ", apiData.data);
          if (apiData.data) {
            setData(apiData.data);
          }
          console.log("data: ", data);
        }
      } catch (error) {
        // Handle errors as needed
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleChange = (item) => {
    // console.log("check item: ", item);
    setIsOpenModal(true);
    setDataModal({ data: item, state: 1 });
  };
  const handleDelete = (item) => {};
  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">No</TableCell>
              <TableCell className="tableCell">Type</TableCell>
              <TableCell className="tableCell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="tableCell">{index + 1}</TableCell>

                  <TableCell className="tableCell">
                    <span
                      className={`type _${
                        item.type === 0
                          ? "DDA"
                          : item.type === 1
                          ? "3 months"
                          : "6 months"
                      }`}
                    >
                      {item.type === 0
                        ? "DDA"
                        : item.type === 1
                        ? "3 months"
                        : "6 months"}
                    </span>
                  </TableCell>
                  <TableCell className="tableCell">
                    <span onClick={() => handleChange(item)}>
                      <i className="fas fa-user-edit"></i>
                    </span>
                    <span onClick={() => handleDelete(item)}>
                      <i className="fa-solid fa-trash-can"></i>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isOpenModal && (
        <ModalPassbook
          show={isOpenModal}
          handleCloseModal={handleCloseModal}
          dataModal={dataModal}
        />
      )}
    </>
  );
};

export default RegulationTable;
