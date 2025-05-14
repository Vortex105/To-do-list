import React, { useEffect, useState } from 'react';
import './style.css';
import { FaMoon, FaSun, FaCheck, FaTrashAlt, FaPlus } from 'react-icons/fa';
const ToDo = ({ showModal, setShowModal, listItems, setListItems }) => {
	const [darkMode, setDarkMode] = useState(
		JSON.parse(localStorage.getItem('theme')) || false
	);
	const [completedTasks, setCompletedTasks] = useState(
		JSON.parse(localStorage.getItem('completedTasks')) || []
	);

	const toggleDarkMode = () => {
		document.body.classList.toggle('dark-mode', darkMode);
	};

	const deleteTask = (id) => {
		setListItems((listItems) => listItems.filter((item) => item.id != id)) ||
			setCompletedTasks((completedTasks) =>
				completedTasks.filter((item) => item.id != id)
			);
	};

	const completeTask = (id) => {
		setListItems((listItems) => listItems.filter((item) => item.id != id));
		const currentItem = listItems.filter((item) => item.id == id);
		setCompletedTasks([
			...completedTasks,
			{
				id: completedTasks.length + 1,
				task: currentItem[0].task,
			},
		]);
	};

	useEffect(() => {
		toggleDarkMode();
	}, [darkMode]);

	useEffect(() => {
		localStorage.setItem('userTasks', JSON.stringify(listItems));
		localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
		localStorage.setItem('theme', JSON.stringify(darkMode));
	}, [listItems, darkMode, completedTasks]);

	return (
		<div className={showModal ? 'disabled container' : 'container'}>
			<FaSun
				aria-label="Switch to light mode"
				role="button"
				style={darkMode == false ? { display: 'none' } : { display: 'flex' }}
				id={darkMode == true ? 'dark-mode' : ''}
				onClick={() => {
					setDarkMode(false);
				}}
			/>
			<FaMoon
				aria-label="Switch to Dark mode"
				role="button"
				style={darkMode == false ? { display: 'flex' } : { display: 'none' }}
				id={darkMode == true ? '' : 'dark-mode'}
				onClick={() => {
					setDarkMode(true);
				}}
			/>
			<div className="header">
				<h2>To-Do</h2>
			</div>
			<div className="main">
				{listItems && (
					<ul id="listContainer">
						{listItems.map((listItem, index) => {
							return (
								<li className="task" key={listItem.id}>
									<p>{listItem.task}</p>
									<p className="actions">
										<FaCheck
											className="icon green"
											onClick={() => {
												completeTask(listItem.id);
											}}
										/>
										<FaTrashAlt
											className="icon red"
											onClick={() => {
												deleteTask(listItem.id);
											}}
										/>
									</p>
								</li>
							);
						})}
					</ul>
				)}
				{listItems == '' && <p className="empty">No Tasks</p>}
			</div>
			<hr />
			<h3 className="complete-title">Completed Tasks</h3>
			{completedTasks != '' && (
				<div className="completed-section">
					<ul id="completedTasks">
						{completedTasks.map((task) => (
							<li className="completed" key={task.id}>
								{task.task}
								<FaTrashAlt
									className="icon red"
									onClick={() => {
										deleteTask(task.id);
									}}
								/>
							</li>
						))}
					</ul>
				</div>
			)}
			<div className="add" id="add" onClick={() => setShowModal(true)}>
				<FaPlus />
			</div>
		</div>
	);
};

export default ToDo;
