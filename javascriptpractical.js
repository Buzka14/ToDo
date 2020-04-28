var todoList = {        //creating an object from var
  todos: [],            // creating an array in an object
  addTodo: function (todoText){ // add properties function
    this.todos.push ({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function (position,todoText){  // change properties function
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function (position){  // delete properties function
    this.todos.splice (position, 1);
  },
  toggleCompleted: function (position){ // complete properties function with ! 
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
  toggleCompleted: function(){
    var toggleCompletedPositionInput = document.getElementById ('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
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
        todoTextWithCompletion = 'x ' + todo.todoText;
      } else {
        todoTextWithCompletion = '  ' + todo.todoText;
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion; // <li>( ) cook</li>
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function(){
    var todoUl = document.querySelector('ul');
    todoUl.addEventListener('click', function(event) {
      var elementClicked = event.target; // specify which element was clicked!
      if (elementClicked.className === 'deleteButton'){
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      } 
    });
  }
};
view.setUpEventListeners();





