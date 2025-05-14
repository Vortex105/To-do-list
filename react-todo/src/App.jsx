import ToDo from './ToDo';
import { useState } from 'react';
import InputForm from './InputForm';
import './App.css';

function App() {
	const [showModal, setShowModal] = useState(false);

	const [listItems, setListItems] = useState(
		JSON.parse(localStorage.getItem('userTasks')) || [
			{
				id: 1,
				task: 'To-Do List',
			},
			{
				id: 2,
				task: 'Copy List',
			},
		]
	);
	return (
		<>
			<ToDo
				showModal={showModal}
				setShowModal={setShowModal}
				listItems={listItems}
				setListItems={setListItems}
			/>
			{showModal && (
				<InputForm
					setShowModal={setShowModal}
					listItems={listItems}
					setListItems={setListItems}
				/>
			)}
		</>
	);
}

export default App;
