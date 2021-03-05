const express = require('express');
const router = express.Router();
const registerUser = require('./controller/customer-controller');
const auth = require('./controller/auth-controller');
const { addOrder, getAllOrders } = require('./controller/order-controller');
const authMiddleware = require('./middleware/auth');
const paymentApi = require('./controller/payment-controller');

//TODO: user authMiddleware when I want to manage the access for th routes 
//to give authority to access those routes to user with certain privilege
//ex: router.post('/auth', authMiddleware, auth);
//CHECK MOSH AUTHORIZATION PART WHEN WORKING ON ADMIN PRIVILEGE


//Customers routers
router.post('/signUp', registerUser);
router.post('/login', auth);


//orders routes
router.post('/addOrder', addOrder);
router.get('/getOrders', getAllOrders);


//payment 
router.post('/checkout', paymentApi);



module.exports = router;