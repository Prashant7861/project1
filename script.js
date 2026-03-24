// Scheduler App JS with checkboxes
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
const clearAllBtn = document.getElementById('clearAllBtn');
const toggleDarkMode = document.getElementById('toggleDarkMode');
const weeklyStats = document.getElementById('weeklyStats');

if(darkMode) document.body.classList.add('dark-mode');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getDateStr(date){ return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`; }

function renderCalendar() {
  calendar.querySelectorAll('.day').forEach(d=>d.remove());
  let year = selectedDate.getFullYear();
  let month = selectedDate.getMonth();
  let firstDay = new Date(year, month, 1).getDay();
  let lastDate = new Date(year, month+1, 0).getDate();

  monthYear.textContent = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  for(let i=0; i<firstDay; i++){
    const empty = document.createElement('div');
    calendar.appendChild(empty);
  }
  for(let i=1;i<=lastDate;i++){
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    const dateStr = `${year}-${month+1}-${i}`;
    dayDiv.textContent = i;
    if(dateStr===getDateStr(new Date())) dayDiv.classList.add('today');
    if(dateStr===getDateStr(selectedDate)) dayDiv.classList.add('selected');
    dayDiv.addEventListener('click', ()=>{
      selectedDate.setDate(i);
      renderCalendar();
      renderTasks();
    });
    calendar.appendChild(dayDiv);
  }
}

function renderTasks() {
  selectedDateDisplay.textContent = selectedDate.toDateString();
  const dateKey = getDateStr(selectedDate);
  taskList.innerHTML = '';
  (tasks[dateKey] || []).forEach((task, index)=>{
    if(task.name.toLowerCase().includes(searchTask.value.toLowerCase())){
      const div = document.createElement('div');

      const checkbox = document.createElement('input');
      checkbox.type='checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', ()=>{
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      const span = document.createElement('span');
      span.textContent = task.name;
      if(task.completed) span.classList.add('completed');

      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑';
      delBtn.addEventListener('click', ()=>{
        tasks[dateKey].splice(index,1);
        saveTasks();
        renderTasks();
      });

      div.appendChild(checkbox);
      div.appendChild(span);
      div.appendChild(delBtn);
      taskList.appendChild(div);
    }
  });
  renderWeeklyStats();
}

addTaskBtn.addEventListener('click', ()=>{
  const val = taskInput.value.trim();
  if(!val) return alert('Enter a task');
  const dateKey = getDateStr(selectedDate);
  if(!tasks[dateKey]) tasks[dateKey] = [];
  tasks[dateKey].push({name: val, completed: false});
  taskInput.value='';
  saveTasks();
  renderTasks();
});

searchTask.addEventListener('input', renderTasks);

clearAllBtn.addEventListener('click', ()=>{
  if(confirm('Delete ALL tasks?')){
    tasks = {};
    saveTasks();
    renderTasks();
  }
});

toggleDarkMode.addEventListener('click', ()=>{
  document.body.classList.toggle('dark-mode');
  darkMode = !darkMode;
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
});

function renderWeeklyStats(){
  let total=0, completed=0;
  const today = new Date();
  for(let i=0;i<7;i++){
    const d = new Date(today);
    d.setDate(d.getDate()-i);
    const key = getDateStr(d);
    if(tasks[key]) {
      total += tasks[key].length;
      completed += tasks[key].filter(t=>t.completed).length;
    }
  }
  weeklyStats.textContent = `Last 7 days: ${completed}/${total} tasks completed`;
}

document.getElementById('prevMonth').addEventListener('click', ()=>{
  selectedDate.setMonth(selectedDate.getMonth()-1);
  renderCalendar();
});
document.getElementById('nextMonth').addEventListener('click', ()=>{
  selectedDate.setMonth(selectedDate.getMonth()+1);
  renderCalendar();
});

renderCalendar();
renderTasks();