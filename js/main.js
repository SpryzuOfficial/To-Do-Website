const todoList = document.getElementById('todo-lst');
const todoNameInput = document.getElementById('todo-inpt');
const addTodoButton = document.getElementById('add-btn');

const saveToLocalStorage = (obj, key = new Date().getTime()) =>
{
    localStorage.setItem(key, JSON.stringify(obj));

    return key;
}

const reamoveLocalStorage = (key) =>
{
    localStorage.removeItem(key);
}

const addTodo = ({key, name, done}) =>
{
    const newTodo = document.createElement('li');
    newTodo.className = 'list-item';
    
    const todoCheckbox = document.createElement('input');
    todoCheckbox.className = 'list-item-check';
    todoCheckbox.type = 'checkbox';
    todoCheckbox.checked = done;

    const todoName = document.createElement('h2');
    todoName.className = 'list-item-name';
    todoName.innerHTML = name;

    todoName.className = `list-item-name ${todoCheckbox.checked ? 'list-item-name-completed' : ''}`;

    todoCheckbox.addEventListener('click', () =>
    {
        const checked = todoCheckbox.checked;

        todoName.className = `list-item-name ${checked ? 'list-item-name-completed' : ''}`;

        saveToLocalStorage({name, done: checked}, key);
    });

    const todoDelete = document.createElement('button');
    todoDelete.className = 'list-item-delete';
    todoDelete.innerHTML = 'X';

    todoDelete.addEventListener('click', () =>
    {
        todoList.removeChild(newTodo);

        reamoveLocalStorage(key);
    });

    newTodo.appendChild(todoCheckbox);
    newTodo.appendChild(todoName);
    newTodo.appendChild(todoDelete);

    todoList.appendChild(newTodo);
}

Object.keys(localStorage).forEach(key =>
{
    const todo = JSON.parse(localStorage.getItem(key));

    addTodo({key, ...todo});
});

addTodoButton.addEventListener('click', () =>
{
    if(todoNameInput.value === '') return;

    const nameValue = todoNameInput.value;
    const key = saveToLocalStorage({name: nameValue, done: false});

    addTodo({key, name: nameValue, done: false});

    todoNameInput.value = '';
});