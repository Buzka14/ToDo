var todoList = {
  todos: [],            
  addTodo: function (todoText){ 
    this.todos.push ({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function (position,todoNewText){  
    this.todos[position].todoText = todoNewText;
  },
  deleteTodo: function (position){ 
    this.todos.splice (position, 1);
  },
  toggleCompleted: function (position){ 
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function(){
    var totalTodos = this.todos.length;
    var completedTodos = 0;
 
    this.todos.forEach(function(todo){
      if(todo.completed === true){
        completedTodos++;
      }
    })
    this.todos.forEach(function(todo){
      if(completedTodos === totalTodos){
        todo.completed = false;
      } else {
         todo.completed =true;
      }
    });
  }
};
var handlers = {
  addTodo: function(){
    var addTodoTextInput = document.getElementById ('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function(){
    var changeTodoPositionInput = document.getElementById ('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById ('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber,changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position){
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();
  }
};
var view = {
  displayTodos: function(){
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('li'); // <li></li>
      var todoTextWithCompletion = '';

      if (todo.completed === true){
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion; // <li>( ) cook</li>
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
      todoLi.appendChild(this.createToggleButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  createToggleButton: function(){
    var toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle';
    toggleButton.className = 'toggleButton';
    return toggleButton;
  },
  setUpEventListeners: function(){
    var todoUl = document.querySelector('ul');
    todoUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
     // specify which element was clicked!
      if (elementClicked.className === 'deleteButton'){
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      } else if (elementClicked.className === 'toggleButton') {
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};
view.setUpEventListeners();





