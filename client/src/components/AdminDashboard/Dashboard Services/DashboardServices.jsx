import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import './DashboardServices.css';
import {
	postService,
	updateServiceList,
	deleteService,
} from '../../../Services/ServicesService';

const DashboardService = ({ services }) => {
	//Dialog Functions
	const [open, setOpen] = useState(false);
	const [addOpen, setAddOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);
	const [serviceId, setServiceId] = useState(null);

	const addHandleClickOpen = () => {
		setOpen(true);
		setAddOpen(true);
		setUpdateOpen(false);
	};
	const updateHandleClickOpen = (id) => {
		setServiceId(id);
		setOpen(true);
		setUpdateOpen(true);
		setAddOpen(false);
	};

	const handleClose = () => {
		setOpen(false);
		setAddOpen(false);
		setUpdateOpen(false);
	};

	//Handle Add and Update functions

	const { register, handleSubmit } = useForm();

	const onAddSubmit = (data) => {
		postService(data.name);
		handleClose();
		window.location = '/admin/Services';
	};

	const onUpdateSubmit = (data) => {
		console.log(serviceId);
		updateServiceList(serviceId, data.name);
		handleClose();
		setServiceId(null);
		window.location = '/admin/Services';
	};

	return (
		<div className="container">
			<button
				onClick={addHandleClickOpen}
				className="btn btn-primary btn-block add-btn"
			>
				Add a Service
			</button>
			<table className="table table-responsive table-dash">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{services.map((service) => (
						<tr key={service.id}>
							<td>{service.id}</td>
							<td>{service.name}</td>
							<td>
								<button
									onClick={() => updateHandleClickOpen(service.id)}
									className="btn btn-warning btn-bg"
								>
									Update
								</button>
							</td>
							<td>
								<button
									onClick={() => {
										deleteService(service.id);
										window.location = '/admin/Services';
									}}
									className="btn btn-danger btn-bg"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Dialog
				open={open}
				onClose={handleClose}
				addOpen={addOpen}
				updateOpen={updateOpen}
			>
				{addOpen ? (
					<DialogTitle id="form-dialog-title">Add New Service</DialogTitle>
				) : (
					<DialogTitle id="form-dialog-title">Update Service</DialogTitle>
				)}
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						name="name"
						label="Service Name"
						type="text"
						inputRef={register}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					{addOpen ? (
						<Button onClick={handleSubmit(onAddSubmit)} color="primary">
							Add
						</Button>
					) : (
						<Button onClick={handleSubmit(onUpdateSubmit)} color="primary">
							update
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default DashboardService;
