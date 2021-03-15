const axios = require('axios');


const addCustomer = (name, phone, email, password, location) => {
  return axios.post('http://localhost:4000/signUp', {
    name, phone, email, password, location
  });
};


const getCustomers = async () => {
  let customerList;
  await axios('http://localhost:4000/customers').then(res => {
    customerList = res.data;
  });
  return customerList;
};

const getCustomerById = async (id) => {
  let currentCustomer;
  await axios(`http://localhost:4000/customer/${id}`).then(res => {
    currentCustomer = res.data;
  });
  return currentCustomer;
};



module.exports = { addCustomer, getCustomers, getCustomerById };


