let tasks = JSON.parse(localStorage.getItem('tasks')) || {};
let selectedDate = new Date();
let darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const selectedDateDisplay = document.getElementById('selectedDateDisplay');
const searchTask = document.getElementById('searchTask');
const filterTasks = document.getElementById('filterTasks');
const clearAllBtn = document.getElementById('clearAllBtn');
const toggleDarkMode = document.getElementById('toggleDarkMode');
const weeklyStats = document.getElementById('weeklyStats');

if (darkMode) document.body.classList.add('dark-mode');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getDateStr(date) {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

function renderCalendar() {
  calendar.querySelectorAll('.day').forEach(d => d.remove());

  let year = selectedDate.getFullYear();
  let month = selectedDate.getMonth();
  let firstDay = new Date(year, month, 1).getDay();
  let lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = selectedDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement('div'));
  }

  for (let i = 1; i <= lastDate; i++) {
    const dayDiv = document.createElement('div');
    const dateStr = `${year}-${month+1}-${i}`;

    dayDiv.textContent = i;
    dayDiv.classList.add('day');

    if (dateStr === getDateStr(new Date())) dayDiv.classList.add('today');
    if (dateStr === getDateStr(selectedDate)) dayDiv.classList.add('selected');

    dayDiv.onclick = () => {
      selectedDate.setDate(i);
      renderCalendar();
      renderTasks();
    };

    calendar.appendChild(dayDiv);
  }
}

function renderTasks() {
  selectedDateDisplay.textContent = selectedDate.toDateString();
  const key = getDateStr(selectedDate);
  taskList.innerHTML = '';

  (tasks[key] || []).forEach((task, index) => {
    const matchesSearch = task.name.toLowerCase().includes(searchTask.value.toLowerCase());

    let matchesFilter = false;
    if (filterTasks.value === 'all') matchesFilter = true;
    if (filterTasks.value === 'completed') matchesFilter = task.completed;
    if (filterTasks.value === 'pending') matchesFilter = !task.completed;

    if (matchesSearch && matchesFilter) {
      const div = document.createElement('div');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;

      checkbox.onchange = () => {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      };

      const span = document.createElement('span');
      span.textContent = task.name;
      if (task.completed) span.classList.add('completed');

      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑';

      delBtn.onclick = () => {
        tasks[key].splice(index, 1);
        saveTasks();
        renderTasks();
      };

      div.append(checkbox, span, delBtn);
      taskList.appendChild(div);
    }
  });

  renderWeeklyStats();
}

addTaskBtn.onclick = () => {
  const val = taskInput.value.trim();
  if (!val) return alert('Enter a task');

  const key = getDateStr(selectedDate);
  if (!tasks[key]) tasks[key] = [];

  tasks[key].push({ name: val, completed: false });

  taskInput.value = '';
  saveTasks();
  renderTasks();
};

searchTask.oninput = renderTasks;
filterTasks.onchange = renderTasks;

clearAllBtn.onclick = () => {
  if (confirm('Delete ALL tasks?')) {
    tasks = {};
    saveTasks();
    renderTasks();
  }
};

toggleDarkMode.onclick = () => {
  document.body.classList.toggle('dark-mode');
  darkMode = !darkMode;
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
};

function renderWeeklyStats() {
  let total = 0, completed = 0;
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    const key = getDateStr(d);
    if (tasks[key]) {
      total += tasks[key].length;
      completed += tasks[key].filter(t => t.completed).length;
    }
  }

  weeklyStats.textContent = `Last 7 days: ${completed}/${total} tasks completed`;
}

document.getElementById('prevMonth').onclick = () => {
  selectedDate.setMonth(selectedDate.getMonth() - 1);
  renderCalendar();
};

document.getElementById('nextMonth').onclick = () => {
  selectedDate.setMonth(selectedDate.getMonth() + 1);
  renderCalendar();
};

renderCalendar();
renderTasks();