import * as axios from 'axios'
const client = axios.default;
function getQueryParam(paramName) {
    var searchString = window.location.search.substring(1);
    var params = searchString.split('&');
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        if (param[0] === paramName) {
            return decodeURIComponent(param[1]);
        }
    }
    return null;
}
var projectID = getQueryParam('pid');

function addTask(taskData) { 
    var newDiv = document.createElement('div');
    newDiv.className = 'todo1';
    document.getElementById('showDiv'+taskData.type).appendChild(newDiv);

    var newdate = document.createElement('input');
    newdate.className = 'todo2';
    newdate.id='taskDate';
    newdate.type = 'date';
    newdate.value=taskData.taskDate;
    newDiv.appendChild(newdate);

    var newperson = document.createElement('input');
    newperson.className = 'todo3';
    newperson.id='taskPerson';
    newperson.type = 'text';
    newperson.placeholder = 'person';
    newperson.value=taskData.taskPerson;
    newDiv.appendChild(newperson);

    var newtheme = document.createElement('input');
    newtheme.className = 'todo4';
    newtheme.id='taskTheme';
    newtheme.type = 'text';
    newtheme.placeholder = 'theme';
    newtheme.value=taskData.taskTheme;
    newDiv.appendChild(newtheme);

    var newfile = document.createElement('input');
    newfile.className = 'todo5';
    newfile.type = 'file';
    newDiv.appendChild(newfile);

    var newbut = document.createElement('button');
    newbut.className = 'todo6';
    newbut.textContent = "click for details";
    newDiv.appendChild(newbut);
    newbut.addEventListener('click', function () {
        window.location.href='/main/detail.html?tid='+taskData.tid;
    })

}

function saveTask(taskType){
    var taskPerson = document.getElementById("taskPerson"+taskType).value;
    var taskTheme = document.getElementById("taskTheme"+taskType).value;
    var taskDate = document.getElementById("taskDate"+taskType).value;
    if (!taskPerson) { alert("请输入参与人员"); return };
    if (!taskTheme) { alert("请输入任务简介"); return };
    if (!taskDate) { alert("请输入任务日期"); return };
    client.post('http://127.0.0.1:7001/api/save_Task',
        {
            type:taskType,
            taskPerson: taskPerson,
            taskTheme: taskTheme,
            taskDate: taskDate,
            pid:projectID
        }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (!response.data.data.success) {
            alert(response.data.data.message)
        } else {
            

          window.location.href = "/main/detail.html?tid="+response.data.data.tid;
        }

    })
}


document.addEventListener('DOMContentLoaded', function () {
    var today = new Date();
    var currentDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    document.getElementById('taskDate1').value = currentDate;
    document.getElementById('taskDate2').value = currentDate;
    document.getElementById('taskDate3').value = currentDate;

    client.get("http://127.0.0.1:7001/api/get_Task?pid=" + projectID).then((response) => {
        if (!response.data.data.success) {
            alert(response.data.data.message)
        } else {
            for (let fruit of response.data.data.data) {
                addTask(fruit);
            }
        }
    })
});

document.getElementById("addButtontodo").addEventListener('click', function () {
    document.getElementById("addDiv1").style.display = 'table-row';
})
document.getElementById("addButtondoing").addEventListener('click', function () {
    document.getElementById("addDiv2").style.display = 'table-row';
})
document.getElementById("addButtondone").addEventListener('click', function () {
    document.getElementById("addDiv3").style.display = 'table-row';
})

document.getElementById("saveTaskTodo").addEventListener('click', function () {
    saveTask(1);
})

document.getElementById("saveTaskDoing").addEventListener('click', function () {
    saveTask(2);
})

document.getElementById("saveTaskDone").addEventListener('click', function () {
    saveTask(3);
})