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
var UserID = getQueryParam('uid');

function addRow(rowData) { 
    var table = document.getElementById("myTable");
    var newRow = table.insertRow(table.rows.length - 1);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = rowData.projectTitle;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = rowData.projectTheme;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = rowData.projectDate;
    var cell4 = newRow.insertCell(3);
    var input4 = document.createElement("button");
    input4.textContent = "任务详情";
    cell4.appendChild(input4);
    input4.addEventListener('click', function () {
        window.location.href = "tasks.html?pid=" + rowData.pid;
    })
}

document.addEventListener('DOMContentLoaded', function () {
    var today = new Date();
    var currentDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    document.getElementById('projectDate').value = currentDate;

    client.get("http://127.0.0.1:7001/api/get_Project?uid=" + UserID).then((response) => {
        if (!response.data.data.success) {
            alert(response.data.data.message)
        } else {
            for (let fruit of response.data.data.data) {
                addRow(fruit);
            }
        }
    })
});


document.getElementById("addProject").addEventListener('click', function () {
    document.getElementById("trProAdd").style.display = 'table-row';
})

document.getElementById("saveProject").addEventListener('click', function () {
    var projectTitle = document.getElementById("projectTitle").value;
    var projectTheme = document.getElementById("projectTheme").value;
    var projectDate = document.getElementById("projectDate").value;
    if (!projectTitle) { alert("请输入项目名称"); return };
    if (!projectTheme) { alert("请输入项目简介"); return };
    if (!projectDate) { alert("请输入项目日期"); return };

    client.post('http://127.0.0.1:7001/api/save_Project',
        {
            projectTitle: projectTitle,
            projectTheme: projectTheme,
            projectDate: projectDate,
            uid:UserID
        }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (!response.data.data.success) {
            alert(response.data.data.message)
        } else {
            
            addRow(response.data.data.newproject)
            document.getElementById("trProAdd").style.display = 'none';


         //   window.location.href = "/main/tasks.html?pid="+response.data.data.pid;
        }

    })

})

