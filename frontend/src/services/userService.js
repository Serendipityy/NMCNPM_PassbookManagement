import axios from "axios";
const createNewPassbook = async (data) => {
  const formData = new FormData();
  formData.append("passbookCode", data.code);
  formData.append("name", data.username);
  formData.append("address", data.address);
  formData.append("money", data.deposit);
  formData.append("type", data.type);
  formData.append("identityNumber", data.identity);
  formData.append("dateOpened", data.date);
  console.log("check axios: ", formData);

  return await axios.post(
    "http://localhost:8080/api/customer-passbook",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Đặt kiểu dữ liệu là multipart/form-data
      },
    }
  );
};
const listPassbook = () => {
  return axios.get("http://localhost:8080/api/passbook/tracuu");
};
const paginatePassbook = (page) => {
  return axios.get(
    `http://localhost:8080/api/passbook/lookup?page=${page}&per_page=8`
  );
};
const putMoney = async (data) => {
  const formData = new FormData();
  formData.append("passbookCode", data.passbookCode);
  formData.append("customerName", data.customerName);
  formData.append("depositDate", data.depositDate);
  formData.append("money", data.deposit);
  console.log(data);
  return await axios.post("http://localhost:8080/api/deposit", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Đặt kiểu dữ liệu là multipart/form-data
    },
  });
};
const withdrawMoney = async (data) => {
  const formData = new FormData();
  formData.append("passbookCode", data.passbookCode);
  formData.append("customerName", data.customerName);
  formData.append("withdrawalDate", data.withdrawalDate);
  formData.append("money", data.withdraw);
  console.log(data);
  return await axios.post("http://localhost:8080/api/withdraw", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Đặt kiểu dữ liệu là multipart/form-data
    },
  });
};
const getDailyReport = async (date) => {
  return await axios.get(
    `http://localhost:8080/api/passbook/daily-turnover?date=${date}`
  );
};
const getMonthlyReport = async (data) => {
  return await axios.get(
    `http://localhost:8080/api/passbook/report?monthYear=${data.month}&type=${data.type}`
  );
};
const getListTerm = async () => {
  return await axios.get(`http://localhost:8080/api/term`);
};
const changeType = async (data) => {
  // console.log("dataalo???:", data.type);
  const formData = new FormData();
  formData.append("type", data.type);
  formData.append("interestRate", data.interestRate);
  formData.append("minDeposit", data.minDepo);
  formData.append("minDepositTime", data.minTime);
  // console.log("check form data: ", formData);
  return await axios.put("http://localhost:8080/api/term", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Đặt kiểu dữ liệu là multipart/form-data
    },
  });
};
const deleteType = async (type) => {
  console.log(type);
  return await axios.delete(`http://localhost:8080/api/term/${type}`);
};
const addNewType = async (data) => {
  const formData = new FormData();
  formData.append("monthsOfTerm", data.typeName);
  formData.append("interestRate", data.interestRate);
  formData.append("minDeposit", data.minDepo);
  return await axios.post("http://localhost:8080/api/term", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Đặt kiểu dữ liệu là multipart/form-data
    },
  });
};
export {
  createNewPassbook,
  listPassbook,
  putMoney,
  withdrawMoney,
  getDailyReport,
  getMonthlyReport,
  getListTerm,
  changeType,
  deleteType,
  addNewType,
  paginatePassbook,
};
