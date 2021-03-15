const axios = require('axios');

const postTechnician = (name, phone, email) => {
  return axios.post('http://localhost:4000/technician', { name, phone, email });
};

const getTechnicians = async () => {
  try {
    let TechniciansList;
    await axios('http://localhost:4000/technicians').then(res => {
      TechniciansList = res.data;
    });
    return TechniciansList;

  } catch (error) {
    console.log(error);
  }
};

const updateTechnicianList = async (id, name, phone, email) => {
  try {
    return await axios.put(`http://localhost:4000/technician/${id}`, { name, phone, email });
  } catch (error) {
    console.log(error);
  }
};

const deleteTechnician = async (id) => {
  try {
    return await axios.delete(`http://localhost:4000/technician/${id}`);
  } catch (error) {
    console.log(error);
  }
};


module.exports = { postTechnician, getTechnicians, updateTechnicianList, deleteTechnician };