import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { makeStyles } from '@material-ui/core/styles';
import pay from './../../Services/payment';

const useStyles = makeStyles({
	payBtn: {
		height: '30px',
		marginTop: '28px',
	},
});

const Payment = (order) => {
	const classes = useStyles();

	//This is a public key, The secret key added to .env file
	const publishableKey =
		'pk_test_51IQB1zJgjiR5JIS9aB81HFYQ1HxdIjbgkxf2K1OYnrpzKW5hnAtfM9mkMkQh8cQ5ukkyxF87FriI4db16ASz8kNJ00C0ZWxaxX';

	const onSubmit = (token) => {
		pay(order.order.cost, token);
	};

	return (
		<StripeCheckout
			className={classes.payBtn}
			label="Place Order"
			name="Hogwarts"
			description="Just like Magic ."
			panelLabel="Abra Kadabra"
			token={onSubmit}
			stripeKey={publishableKey}
			billingAddress={false}
		/>
	);
};

export default Payment;
