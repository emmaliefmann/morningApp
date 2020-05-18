//Add items to list -> form with submit 

class List {
    constructor() {
        this.addButton = document.querySelector('.todo-button');
        this.todoInput = document.querySelector('.todo-input');
        this.todoOutput = document.querySelector('.todo-list');
        this.deleteBtn = document.getElementsByClassName('delete');
        this.completedBtn = document.querySelectorAll('.completed');
        this.todoItems = document.querySelectorAll('.todo-item');
        this.form = document.getElementsByTagName('form');
        this.todoList = document.querySelector('.todo-list');
        this.dragBtn = document.querySelector('.drag');
        

        //event listeners 
        this.addButton.addEventListener('click', ($event) => {
            $event.preventDefault();
            let task = this.todoInput.value;
            this.addTaskToList(task);
            this.saveToStorage(task);  
        });

        
    }

        draggableLoop() {
            let newTodoItems = document.querySelectorAll('.todo-item');
            for (let i=0; i < newTodoItems.length; i++){
                newTodoItems[i].addEventListener('dragstart', () => {
                    //this.dragStart();
                    console.log('start');
                    newTodoItems[i].classList.add('hold');
                    setTimeout(() => (newTodoItems[i].classList.add('invisible'), 0));
                });
                newTodoItems[i].addEventListener('dragend', () => {
                    //this.dragEnd(); 
                    console.log('dragend');
                    newTodoItems[i].classList.remove('hold');
                    newTodoItems[i].classList.remove('invisible');
                });
                newTodoItems[i].addEventListener('dragover', ($event) => {
                    $event.preventDefault();
                    console.log('over');
                });
                newTodoItems[i].addEventListener('dragenter', ($event) => {
                    $event.preventDefault();
                    console.log('enter');
                    newTodoItems[i].classList.add('hovered');
                });
                newTodoItems[i].addEventListener('dragleave', () => {
                    newTodoItems[i].classList.remove('hovered');
                    console.log('leave');
                });
                newTodoItems[i].addEventListener('drop', () => {
                    console.log('drop');
                    newTodoItems[i].classList.remove('hovered');
                });
            };
        };
        dragStart() {
            console.log('start');
            this.classList.add('hold');
        }

        dragEnd() {
            console.log('dragend');
        }

        addTaskToList(task) {
        //creating outer div
        this.todoItem = document.createElement('div');
        this.todoItem.classList.add('todo-item'); 
        this.todoItem.setAttribute('draggable', true);
        //creating li items 
        this.todoListItem = document.createElement('li');
        this.todoListItem.innerText = task;
        this.todoItem.appendChild(this.todoListItem);
        
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
                this.removeFromStorage(allDeleteButtons[last]);
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
                    this.removeFromStorage(allDeleteButtons[i]);
                    this.deleteTodo(allDeleteButtons[i]);
                });
            };

            let allCompletedButtons = document.querySelectorAll('.completed');
            for (let i=0; i < allCompletedButtons.length; i++) {
                allCompletedButtons[i].addEventListener('click', () => {
                    this.completeTodo(allCompletedButtons[i]);
                });
            };
        }; 

        removeFromStorage(item) {
            let parent = item.parentElement;
            let taskText = parent.children[0].innerText;
            let savedTodos = JSON.parse(localStorage.getItem('savedTodos'));
            let itemToRemove = savedTodos.indexOf(taskText);
            savedTodos.splice(itemToRemove, 1);
            localStorage.setItem('savedTodos', JSON.stringify(savedTodos));            
           
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

        saveToStorage(value) {
            let savedTodos; 
            if(localStorage.getItem('savedTodos') === null) {
                savedTodos = [];
            } else {
                savedTodos = JSON.parse(localStorage.getItem('savedTodos'));
            }
            savedTodos.push(value);
            localStorage.setItem('savedTodos', JSON.stringify(savedTodos));
        }

        getSavedTodos() {
            let savedTodos; 
            if(localStorage.getItem('savedTodos') === null) {
                console.log('empty');
                savedTodos = [];
                
            } else {
                savedTodos = JSON.parse(localStorage.getItem('savedTodos'));
            } 
            savedTodos.forEach(savedTodo => this.addTaskToList(savedTodo));
        }
    }

    let myApp = new List;
    myApp.start();
    myApp.getSavedTodos();
    myApp.draggableLoop();