init();

function init() {
    var todoList = [ 
        { todo: "buy milk", date: "12.06.2003", done: true}, 
        { todo: "walk the dog", date: "07.07.2019", done: false}, 
        { todo: "read a book", date: "08.07.2008", done: false},
        {todo: "learn English, learn all programming languages, read all the books in the universe, count all the stars in the sky ... :)", date: "10.11.2018", done: false} 
    ];
    var todayElement = document.getElementById('today');
    var today = document.createTextNode(getToday());
    todayElement.appendChild(today);

    createTodoList(todoList);
    deleteTodo();
    checkTodo();
    var deadline =  document.getElementById("deadline-input");
    dateInputMask(deadline);
    checkDeadline();
}

function getToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; 
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 
    today = dd + '.' + mm + '.' + yyyy;
    return today;
}

function createTodoList(todoList) {
    var ul = document.getElementById("todo-list");
    todoList.forEach(function(item, i, arr) {
        var span = document.createElement("span");
        var close = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(close);
        var li = document.createElement("li");
        li.innerHTML = item.todo + " - " + "<span class='todo-date'>" + item.date + "</span>";
        li.appendChild(span);
        ul.appendChild(li);
    });
}

function deleteTodo() {
    var close = document.getElementsByClassName("close");
    for(var i=0; i<close.length; i++) {
        close[i].onclick = function() {
            var li = this.parentElement;
            li.style.display = "none";
        }
    }  
}

function clearAll() {
    var close = document.getElementsByClassName("close");
    for(var i=0; i<close.length; i++) {    
        var li = close[i].parentElement;
        li.style.display = "none";
    }      
}

function checkTodo() {
    var list = document.querySelector('ul');
    list.addEventListener('click', function(event) {  
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('checked');
        }
    }, false);
}

function add() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("todo-input").value;
    var dateValue =  document.getElementById("deadline-input").value;
    var todo = inputValue + " - " + "<span class='todo-date'>" + dateValue + "</span>";
    li.innerHTML = todo;
    if (inputValue === '' || dateValue === '') {
        alert("Write todo and deadline!");
    } else {
        document.getElementById("todo-list").appendChild(li);
    }
    document.getElementById("todo-input").value = "";
    document.getElementById("deadline-input").value = "";

    var span = document.createElement("span");
    var close = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(close);
    li.appendChild(span);
    deleteTodo();
}

function dateInputMask(element) {
    element.addEventListener('keypress', function(event) {
        if(event.keyCode < 47 || event.keyCode > 57) {
        event.preventDefault();
        }
        
        var length = element.value.length;
        
        if(length !== 1 || length !== 3) {
            if(event.keyCode == 47) {
                event.preventDefault();
            }
        }
        
        if(length === 2) {
            element.value += '.';
        }

        if(length === 5) {
            element.value += '.';
        }
    });
};

function checkDeadline() {
    var deadline = document.getElementsByClassName("todo-date");
    var checkbox = document.getElementById('deadline');
    checkbox.addEventListener('change', function (event) {
        if (event.target.checked) {
            for(var i=0; i<deadline.length; i++) {    
                var li = deadline[i].parentElement;
                var deadlineDate = new Date(deadline[i].innerHTML);
                var now = new Date();
                var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                if(today.getTime() < deadlineDate.getTime()) {
                    li.style.display = "none";
                }
            }
        } else {
            for(var i=0; i<deadline.length; i++) {    
                var li = deadline[i].parentElement;
                li.style.display = "block";
            }
        }
    });
}
