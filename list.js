//Add items to list -> form with submit 

class List {
    constructor() {
        //this.deleteButton 
        this.addButton = document.querySelector('.todo-button');
        this.todoInput = document.querySelector('.todo-input');
        this.todoOutput = document.querySelector('.todo-list');
        this.deleteBtn = document.getElementsByClassName('delete');
        this.completedBtn = document.querySelectorAll('.completed');
        this.form = document.getElementsByTagName('form');
        this.todoList = document.querySelector('.todo-list');

        

        //event listeners 
        this.addButton.addEventListener('click', ($event) => {
            $event.preventDefault();
            this.addTaskToList();  
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
        //this.saveToStorage(this.todoInput.value);
        //creating the buttons 
        this.checkedBtn = document.createElement('button');
        this.checkedBtn.innerHTML = '<i class="far fa-check-square"></i>';
        this.checkedBtn.classList.add('completed');
        this.todoItem.appendChild(this.checkedBtn);
        this.deleteBtn = document.createElement('button');
        this.deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
        this.deleteBtn.classList.add('delete');
        this.todoItem.appendChild(this.deleteBtn);
        
        //insert to top of list? How? Array.
        this.todoOutput.appendChild(this.todoItem);
        this.todoInput.value = '';
        this.buttonLoop();
        }


        buttonLoop() {
            let allDeleteButtons = document.querySelectorAll('.delete');
            let allCompletedButtons = document.querySelectorAll('.completed'); 
            let last = allDeleteButtons.length-1;

            allDeleteButtons[last].addEventListener('click', () => {
                
                this.deleteTodo(allDeleteButtons[last]);    
            });
            allCompletedButtons[last].addEventListener('click', () => {
                this.completeTodo(allCompletedButtons[last]);
            })
            
        }

        start() {
            let allDeleteButtons = document.querySelectorAll('.delete');
            for (let i=0; i < allDeleteButtons.length; i++) {
                allDeleteButtons[i].addEventListener('click', $event => {
                    this.deleteTodo(allDeleteButtons[i]);
                });
            };

            let allCompletedButtons = document.querySelectorAll('.completed');
            for (let i=0; i < allCompletedButtons.length; i++) {
                allCompletedButtons[i].addEventListener('click', () => {
                    this.completeTodo(allCompletedButtons[i]);
                });
            };
            localStorage.clear();
        }

        deleteTodo(childElement) {
            let todo = childElement.parentElement;
            
            todo.classList.add('falling');
                todo.addEventListener('transitionend', () => {
                    todo.remove();
                });
        };

        completeTodo(childElement) {
            childElement.parentElement.classList.toggle('todo-item-completed');
        };

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

        retrieveSavedTodos() {
            //
        }
    }

    let myApp = new List;
    myApp.start();