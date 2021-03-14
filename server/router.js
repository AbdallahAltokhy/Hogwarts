const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/auth');
const paymentApi = require('./controller/payment-controller');
const auth = require('./controller/auth-controller');
const { addOrder, getAllOrders } = require('./controller/order-controller');
const { registerUser, getCustomerById, getAllCustomers } = require('./controller/customer-controller');
const { addTechnician, getAllTechnicians, updateTechnician, deleteTechnician } = require('./controller/technician-controller');
const { addService, getAllServices, updateService, deleteService } = require('./controller/services-controller');



//Customers routers
router.post('/signUp', registerUser);
router.post('/login', auth);
router.get('/customer/:id', getCustomerById);
router.get('/customers', getAllCustomers);


//orders routes
router.post('/addOrder', addOrder);
router.get('/orders', getAllOrders);


//technicians routes
router.post('/technician', addTechnician);
router.get('/technicians', getAllTechnicians);
router.put('/technician/:id', updateTechnician);
router.delete('/technician/:id', deleteTechnician);


//services routes
router.post('/service', addService);
router.get('/services', getAllServices);
router.put('/service/:id', updateService);
router.delete('/service/:id', deleteService);



//payment 
router.post('/checkout', paymentApi);



module.exports = router;