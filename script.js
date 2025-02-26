document.addEventListener('DOMContentLoaded', () => {
	const listContainer = document.getElementById('listContainer');
	const completedTasks = document.getElementById('completedTasks');
	const newTask = document.getElementById('add');
	const toggleDarkMode = document.getElementById('dark-mode');

	// Load tasks from localStorage
	function loadTasks() {
		const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
		const completed = JSON.parse(localStorage.getItem('completedTasks')) || [];

		tasks.forEach((task) => addTaskToDOM(task, false));
		completed.forEach((task) => addTaskToDOM(task, true));
	}

	function saveTasks() {
		const tasks = [...listContainer.querySelectorAll('li')].map(
			(li) => li.innerHTML
		);
		const completed = [...completedTasks.querySelectorAll('li')].map(
			(li) => li.innerHTML
		);
		localStorage.setItem('tasks', JSON.stringify(tasks));
		localStorage.setItem('completedTasks', JSON.stringify(completed));
	}

	// Function to add a task to the DOM
	function addTaskToDOM(taskHTML, isCompleted) {
		const taskItem = document.createElement('li');
		taskItem.innerHTML = taskHTML;
		if (isCompleted) {
			taskItem.classList.add('completed');
			completedTasks.appendChild(taskItem);
		} else {
			listContainer.appendChild(taskItem);
		}
	}

	// Function to remove tasks with animation
	function removeTask(event) {
		if (event.target.classList.contains('del')) {
			const taskItem = event.target.closest('li');
			taskItem.classList.add('removed');
			setTimeout(() => {
				taskItem.remove();
				saveTasks();
			}, 300);
		}
	}

	// Function to mark task as completed
	function completeTask(event) {
		if (event.target.classList.contains('check')) {
			const taskItem = event.target.closest('li');
			taskItem.classList.add('completed');
			listContainer.removeChild(taskItem);
			completedTasks.appendChild(taskItem);
			saveTasks();
		}
	}

	// Function to add a new task
	function addTaskModal() {
		const taskModal = document.createElement('div');
		taskModal.className = 'taskmodal';
		taskModal.innerHTML = `
            <form class="taskForm">
                <label for="enterTask" class="gray">Add new task</label>
                <input type="text" id="enterTask" placeholder="Enter new task..." />
                <div class="btn">
                    <button type="submit" class="addtask">Add Task</button>
                    <button type="button" class="canceltask">Cancel</button>
                </div>
            </form>
        `;
		document.body.appendChild(taskModal);

		// Close modal
		taskModal.querySelector('.canceltask').addEventListener('click', () => {
			taskModal.remove();
		});

		// Handle task addition
		taskModal.querySelector('.addtask').addEventListener('click', (e) => {
			e.preventDefault();
			const taskInput = document.getElementById('enterTask');
			if (taskInput.value.trim() !== '') {
				const newTask = document.createElement('li');
				newTask.innerHTML = `
                    <p>${taskInput.value}</p>
                    <p class="actions">
                        <span class="material-symbols-outlined green check"> check </span>
                        <span class="material-symbols-outlined red del"> delete </span>
                    </p>
                `;
				listContainer.appendChild(newTask);
				taskModal.remove();
				saveTasks();
			} else {
				alert('Please enter a valid task.');
			}
		});
	}

	// Load stored tasks on page load
	loadTasks();

	//Function to toggle dark mode
	toggleDarkMode.addEventListener('click', () => {
		document.body.classList.toggle('dark-mode');
	});

	// Event Listeners
	listContainer.addEventListener('click', removeTask);
	listContainer.addEventListener('click', completeTask);
	newTask.addEventListener('click', addTaskModal);
});
