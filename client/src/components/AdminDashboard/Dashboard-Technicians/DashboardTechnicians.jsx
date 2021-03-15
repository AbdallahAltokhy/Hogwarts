import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {
	postTechnician,
	updateTechnicianList,
	deleteTechnician,
} from '../../../Services/techniciansService';

const DashboardTechnician = ({ technicians }) => {
	//Dialog Functions
	const [open, setOpen] = useState(false);
	const [addOpen, setAddOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);
	const [technicianId, setTechnicianId] = useState(null);

	const addHandleClickOpen = () => {
		setOpen(true);
		setAddOpen(true);
		setUpdateOpen(false);
	};
	const updateHandleClickOpen = (id) => {
		setTechnicianId(id);
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
		postTechnician(data.name, data.phone, data.email);
		handleClose();
		window.location = '/admin/technician';
	};

	const onUpdateSubmit = (data) => {
		console.log(data);
		updateTechnicianList(technicianId, data.name, data.phone, data.email);
		handleClose();
		setTechnicianId(null);
		window.location = '/admin/technician';
	};

	return (
		<div className="container">
			<button
				onClick={addHandleClickOpen}
				className="btn btn-primary btn-block add-btn"
			>
				Add a Technician
			</button>
			<div className="table-responsive ">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Phone</th>
							<th>Email</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{technicians.length !== 0 ? (
							technicians.map((technician) => (
								<tr key={technician.id}>
									<td>{technician.id}</td>
									<td>{technician.name}</td>
									<td>{technician.phone}</td>
									<td>{technician.email}</td>
									<td>
										<button
											onClick={() => updateHandleClickOpen(technician.id)}
											className="btn btn-warning btn-bg ml-4"
										>
											Update
										</button>
										<button
											onClick={() => {
												deleteTechnician(technician.id);
												window.location = '/admin/technician';
											}}
											className="btn btn-danger btn-bg ml-4"
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td>.</td>
								<td>.</td>
								<td>.</td>
								<td>.</td>
								<td>.</td>
								<td>.</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<Dialog
				open={open}
				onClose={handleClose}
				addOpen={addOpen}
				updateOpen={updateOpen}
			>
				{addOpen ? (
					<DialogTitle id="form-dialog-title">Add New Technician</DialogTitle>
				) : (
					<DialogTitle id="form-dialog-title">Update Technician</DialogTitle>
				)}
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						name="name"
						label="Technician Name"
						type="text"
						inputRef={register}
						fullWidth
					/>
					<TextField
						margin="dense"
						id="phone"
						name="phone"
						label="Technician Phone"
						type="text"
						inputRef={register}
						fullWidth
					/>
					<TextField
						margin="dense"
						id="email"
						name="email"
						label="Technician Email"
						type="email"
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

export default DashboardTechnician;
