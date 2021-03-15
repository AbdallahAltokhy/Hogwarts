import React from 'react';
import moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
} from 'recharts';
import Title from '../Title';

export default function Chart({ orders }) {
	const theme = useTheme();

	const orderPerDay = orders.reduce((result, order) => {
		const day = moment(order.createdAt).format('MMM Do YY');
		if (!result[day]) {
			result[day] = 0;
		}
		result[day] += +order.cost;
		return result;
	}, {});

	function data() {
		let res = [];
		for (const key in orderPerDay) {
			res.push({ time: key, amount: orderPerDay[key] });
		}
		return res;
	}

	return (
		<React.Fragment>
			<Title>Today</Title>
			<ResponsiveContainer>
				<LineChart
					data={data()}
					margin={{
						top: 16,
						right: 16,
						bottom: 0,
						left: 24,
					}}
				>
					<XAxis dataKey="time" stroke={theme.palette.text.secondary} />
					<YAxis stroke={theme.palette.text.secondary}>
						<Label
							angle={270}
							position="left"
							style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
						>
							Sales ($)
						</Label>
					</YAxis>
					<Line
						type="monotone"
						dataKey="amount"
						stroke={theme.palette.primary.main}
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
}
