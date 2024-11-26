let tasks = [
  { name: 'Update Website', description: 'Revise homepage design', assignedTo: 'Alice', dueDate: '2024-11-15', status: 'Pending' },
  { name: 'Develop API', description: 'Create authentication API', assignedTo: 'Bob', dueDate: '2024-11-20', status: 'In Progress' },
  { name: 'Write Documentation', description: 'Complete user manual', assignedTo: 'Carol', dueDate: '2024-11-10', status: 'Completed' }
];

let editIndex = null;

function displayTasks() {
  const tableBody = document.querySelector('#taskTable tbody');
  tableBody.innerHTML = '';

  tasks.forEach((task, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.description}</td>
      <td>${task.assignedTo}</td>
      <td>${task.dueDate}</td>
      <td class="status" onclick="changeStatus(${index})">${task.status}</td>
      <td>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function showTaskForm(task = null) {
  const modal = document.getElementById('taskFormModal');
  modal.style.display = 'block';

  document.getElementById('formTitle').textContent = task ? 'Edit Task' : 'Add Task';
  document.getElementById('taskName').value = task ? task.name : '';
  document.getElementById('taskDescription').value = task ? task.description : '';
  document.getElementById('assignedTo').value = task ? task.assignedTo : '';
  document.getElementById('dueDate').value = task ? task.dueDate : '';
  document.getElementById('status').value = task ? task.status : 'Pending';

  editIndex = task ? tasks.indexOf(task) : null;
}

function closeTaskForm() {
  document.getElementById('taskFormModal').style.display = 'none';
}

function saveTask(event) {
  event.preventDefault();

  const task = {
    name: document.getElementById('taskName').value,
    description: document.getElementById('taskDescription').value,
    assignedTo: document.getElementById('assignedTo').value,
    dueDate: document.getElementById('dueDate').value,
    status: document.getElementById('status').value
  };

  if (editIndex !== null) {
    tasks[editIndex] = task;
  } else {
    tasks.push(task);
  }

  closeTaskForm();
  displayTasks();
}

function changeStatus(index) {
  const statusOptions = ['Pending', 'In Progress', 'Completed'];
  const currentStatus = tasks[index].status;
  const nextStatus = statusOptions[(statusOptions.indexOf(currentStatus) + 1) % statusOptions.length];
  tasks[index].status = nextStatus;
  displayTasks();
}

function editTask(index) {
  showTaskForm(tasks[index]);
}

function deleteTask(index) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.splice(index, 1);
    displayTasks();
  }
}

displayTasks();
