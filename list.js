//Add items to list -> form with submit 

class List {
    constructor() {
        //this.deleteButton 
        this.addButton = document.querySelector('.todo-button');
        this.todoInput = document.querySelector('.todo-input');
        this.todoOutput = document.querySelector('.todo-list');
        this.deleteBtn = document.getElementsByClassName('.delete');
        this.completedBtn = document.querySelector('.completed');
        this.form = document.getElementsByTagName('form');
        this.todoList = document.querySelector('.todo-list');
        

        //event listeners 
        this.addButton.addEventListener('click', ($event) => {
            $event.preventDefault();
            this.addTaskToList();
            
        });

        this.todoOutput.addEventListener('click', ($event) => {
            //how to separate the functions when variable comes from event listener?
            let item = $event.target;
            const todo = item.parentElement; 
            if (item.classList[0] === 'delete') {
                todo.classList.add('falling');
                todo.addEventListener('transitionend', () => {
                    todo.remove();
                });
                
            }
    
            if (item.classList[0] === 'completed') {
                //this.completeTodo();
                todo.classList.toggle('todo-item-completed');
            }
            else {
                return;
            }
        });
    }

        addTaskToList() {
        //creating outer div
        this.todoItem = document.createElement('div');
        this.todoItem.classList.add('todo-item');   
        //creating li items 
        this.todoListItem = document.createElement('li');
        this.todoListItem.innerText = this.todoInput.value;
        this.todoItem.appendChild(this.todoListItem);
        //local storage 
        this.saveToStorage(this.todoInput.value);
        //creating the buttons 
        this.checkedBtn = document.createElement('button');
        this.checkedBtn.innerHTML = '<i class="far fa-check-square"></i>';
        this.checkedBtn.classList.add('completed');
        this.todoItem.appendChild(this.checkedBtn);
        this.deleteBtn = document.createElement('button');
        this.deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
        this.deleteBtn.classList.add('delete');
        this.todoItem.appendChild(this.deleteBtn);
        
        //append whole div to ul list
        //insert before??
        this.todoOutput.appendChild(this.todoItem);
        this.todoInput.value = '';
        }

        saveToStorage(todo) {
            let savedTodos; 
            if(localStorage.getItem('savedTodos') === null) {
                savedTodos = [];
            } else {
                savedTodos = JSON.parse(localStorage.getItem('savedTodos'));
            }
            savedTodos.push(todo);
            localStorage.setItem('savedTodos', JSON.stringify(savedTodos));
        }
}

const myTodoApp = new List; 
