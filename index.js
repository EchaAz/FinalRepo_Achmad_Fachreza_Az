function displayTodo() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const listContainer = document.getElementById('list-todo-container');

    listContainer.innerHTML = '';
  
    if (todos) {
      for (let i = 0; i < todos.length; i++) {
        const todoItem = document.createElement('ul');
        todoItem.classList.add('list-group', 'list-group-horizontal', 'rounded-0', 'bg-transparent', 'm-2');
  
        const checkboxItem = document.createElement('li');
        checkboxItem.classList.add('list-group-item', 'd-flex', 'align-items-center', 'ps-0', 'pe-3', 'py-1', 'rounded-0', 'border-0', 'bg-transparent');
  
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.value = '';
        checkbox.id = todos[i].id;
        checkbox.checked = todos[i].checked;
        checkbox.addEventListener('change', function() {
          setComplete(this.checked, this.id);
        });
  
        const formCheck = document.createElement('div');
        formCheck.classList.add('form-check');
        formCheck.appendChild(checkbox);
  
        checkboxItem.appendChild(formCheck);
  
        const textItem = document.createElement('li');
        textItem.classList.add('list-group-item', 'px-3', 'py-1', 'd-flex', 'align-items-center', 'flex-grow-1', 'border-0', 'bg-transparent');
  
        const text = document.createElement('p');
        text.classList.add('lead', 'fw-normal', 'mb-0');
        text.textContent = todos[i].name;
  
        textItem.appendChild(text);
  
        const deleteItem = document.createElement('li');
        deleteItem.classList.add('list-group-item', 'px-3', 'py-1', 'd-flex', 'align-items-center', 'border-0', 'bg-transparent');
  
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.id = todos[i].id;
        deleteButton.addEventListener('click', function() {
          deleteTodo(this.id);
        });
        deleteButton.textContent = 'Delete';
  
        deleteItem.appendChild(deleteButton);
  
        todoItem.appendChild(checkboxItem);
        todoItem.appendChild(textItem);
        todoItem.appendChild(deleteItem);
  
        listContainer.appendChild(todoItem);
      }
    }
  }
  
  
function submitTodo() {
    const todo = document.getElementById("add-todo").value
    let todos = JSON.parse(localStorage.getItem("todos"))

    if (todos) {
        todos.push({
            id: todos[todos.length - 1].id + 1,
            name: todo,
            checked: false
        })
    }
    else {
        todos = [{
            id: 0,
            name: todo,
            checked: false
        }]
    }
    localStorage.setItem("todos", JSON.stringify(todos))
    document.getElementById("add-todo").value = ""

    displayTodo()
}

function setComplete(checked, id) {
    let todos = JSON.parse(localStorage.getItem("todos"))

    todos = todos.map(el => {
        if (el.id == Number(id)) {
            el.checked = checked
        }
        return el
    })

    localStorage.setItem("todos", JSON.stringify(todos))

    displayTodo()
}

function deleteTodo(id) {
    
    let todos = JSON.parse(localStorage.getItem("todos"))

    todos = todos.filter(el => el.id !== Number(id))

    if (todos.length) {
        localStorage.setItem("todos", JSON.stringify(todos))
    } else {
        localStorage.removeItem("todos")
    }
    displayTodo()
}
