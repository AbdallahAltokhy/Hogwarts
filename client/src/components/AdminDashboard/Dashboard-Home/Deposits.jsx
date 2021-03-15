import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';

const useStyles = makeStyles({
	depositContext: {
		flex: 1,
	},
	depositContainer: {
		marginTop: 50,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
});

export default function Deposits({ totalCost }) {
	const classes = useStyles();

	return (
		<div className={classes.depositContainer}>
			<Title>Recent Deposits</Title>
			<Typography component="p" variant="h4">
				${totalCost}
			</Typography>
			<Typography color="textSecondary" className={classes.depositContext}>
				{moment(Date()).format('Do MMM  YY')}
			</Typography>
		</div>
	);
}
