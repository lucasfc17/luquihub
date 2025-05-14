const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const luckyButton = document.getElementById('lucky-button');

const settingsToggleBtn = document.getElementById('settings-toggle-btn');
const settingsPanel = document.getElementById('settings-panel');
const closeSettingsBtn = document.getElementById('close-settings-btn');

const themeToggleBtn = document.getElementById('theme-toggle-btn');
const bgColorPicker = document.getElementById('bg-color-picker');

const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoListUl = document.getElementById('todo-list');

const quickNotesTextarea = document.getElementById('quick-notes');

let todos = [];

// --- Search Functionality ---
function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
}

searchButton.addEventListener('click', performSearch);

searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

luckyButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI`;
    } else {
        // Optional: Default lucky behavior if no query (e.g., Google Doodles)
        window.location.href = 'https://www.google.com/doodles';
    }
});

// --- Settings Panel ---
settingsToggleBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('open');
});

closeSettingsBtn.addEventListener('click', () => {
    settingsPanel.classList.remove('open');
});

// --- Appearance Customization ---
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

themeToggleBtn.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('luquihub-theme', isDarkMode ? 'dark' : 'light');
});

bgColorPicker.addEventListener('input', (event) => {
    const color = event.target.value;
    document.body.style.backgroundColor = color;
    localStorage.setItem('luquihub-bgcolor', color);
});

// --- Productivity Tools ---

// To-Do List
function renderTodos() {
    todoListUl.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️'; // or 'X' or an icon
        deleteBtn.classList.add('delete-todo-btn');
        deleteBtn.addEventListener('click', () => {
            removeTodo(index);
        });
        
        li.appendChild(deleteBtn);
        todoListUl.appendChild(li);
    });
}

function addTodo() {
    const taskText = todoInput.value.trim();
    if (taskText) {
        todos.push({ text: taskText });
        todoInput.value = '';
        saveTodos();
        renderTodos();
    }
}

function removeTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('luquihub-todos', JSON.stringify(todos));
}

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Quick Notes
quickNotesTextarea.addEventListener('input', () => {
    localStorage.setItem('luquihub-notes', quickNotesTextarea.value);
});

// --- Load settings and data from localStorage on page load ---
function loadSettings() {
    // Theme
    const savedTheme = localStorage.getItem('luquihub-theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    // Background Color
    const savedBgColor = localStorage.getItem('luquihub-bgcolor');
    if (savedBgColor) {
        document.body.style.backgroundColor = savedBgColor;
        bgColorPicker.value = savedBgColor;
    } else {
         // Set default for picker if nothing is saved
        bgColorPicker.value = getComputedStyle(document.body).getPropertyValue('--bg-color').trim();
    }


    // To-Do List
    const savedTodos = localStorage.getItem('luquihub-todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
    }

    // Quick Notes
    const savedNotes = localStorage.getItem('luquihub-notes');
    if (savedNotes) {
        quickNotesTextarea.value = savedNotes;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadSettings);