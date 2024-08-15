
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


var TaskID = getQueryParam('tid');

function addonecomment(value){
    var newDiv = document.createElement('div');
    newDiv.className = 'newcomment';
    showComment.appendChild(newDiv);
    var newcomments = document.createElement('input');
    newcomments.className = 'newc';
    newcomments.type = 'text';
    newcomments.value = value;
    newDiv.appendChild(newcomments);
}

function addComment(detailData) {
    console.log(detailData)
    taskdate.value = detailData.taskDate;
    taskperson.value = detailData.taskPerson;
    tasktheme.value = detailData.taskTheme;
    tasktext.value = detailData.taskText;
    for (var i = 0; i < detailData.comment.length; i++) {
        addonecomment(detailData.comment[i]);
    }

}


document.addEventListener('DOMContentLoaded', function () {
    client.get("http://127.0.0.1:7001/api/get_Detail?tid=" + TaskID).then((response) => {
        if (!response.data.data.success) {
            alert(response.data.data.message)
        } else {
            var fruit = response.data.data.data
            addComment(fruit[0]);
        }
    })
});
document.getElementById("comments").addEventListener('click', function () {
    document.getElementById("AddNewcomment").style.display = 'table-row';

})

document.getElementById("saveComment").addEventListener('click', function () {
    var taskText = document.getElementById("tasktext").value;
    var comment = document.getElementById("newc").value;

    if (!taskText) { alert("请输入任务详情"); return };
    if (!comment) { alert("请输入评论"); return };

    client.post('http://127.0.0.1:7001/api/save_Detail',
        {
            tid:TaskID,
            taskText: taskText,
            comment: comment
        }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (!response.data.data.success) {
            alert(response.data.data.message)
        } else {

            addonecomment(comment)
            document.getElementById("newc").style.display = 'none';
            document.getElementById("newc").value='';

            
        }

    })

})
