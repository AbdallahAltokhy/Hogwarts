const axios = require('axios');

const postOrder = (cost, paymentMethod, TechnicianId, CustomerId, serviceID) => {
  return axios.post('http://localhost:4000/addOrder', {
    cost, paymentMethod, TechnicianId, CustomerId, serviceID
  });
};


const getOrders = async () => {
  try {
    let ordersList;
    await axios('http://localhost:4000/orders').then(res => {
      ordersList = res.data;
    });
    return ordersList;

  } catch (error) {
    console.log(error);
  }
};


module.exports = { postOrder, getOrders };