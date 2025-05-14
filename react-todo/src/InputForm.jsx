import React from 'react';
import './style.css';
import { useState } from 'react';

const InputForm = ({ setShowModal, listItems, setListItems }) => {
	const [listItem, setListItem] = useState('');
	const MAX_TASKS = 20;

	const createTask = () => {
		if (listItems.length >= MAX_TASKS) {
			alert(`Maximum of ${MAX_TASKS} tasks allowed`);
			return;
		}
		const newItem = {
			id: Date.now(),
			task: listItem,
		};
		setListItems([...listItems, newItem]);
	};
	return (
		<div className="taskmodal">
			<form
				className="taskForm"
				onSubmit={(e) => {
					e.preventDefault();
					createTask();
					setListItem('');
					setShowModal(false);
				}}
			>
				<label htmlFor="enterTask" className="gray">
					Add new task
				</label>
				<input
					autoFocus
					type="text"
					id="enterTask"
					placeholder="Enter new task..."
					value={listItem}
					onChange={(e) => {
						setListItem(e.target.value);
					}}
				/>
				<div className="btn">
					<button type="submit" className="addtask">
						Add Task
					</button>
					<button
						type="button"
						className="canceltask"
						onClick={() => {
							setShowModal(false);
						}}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default InputForm;
