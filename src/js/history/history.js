'use strict'
import {getHistory, getItem, removeItem, updateItem} from "../localStorage.js";
import {setSubmit, submitTypes} from "../newTask/newTask.js";

updateHistory();

export function updateHistory() {
    _clearHistory();
    let history = getHistory();

    if(!history.length) return;

    _fillHistory(history);
}

function _fillHistory(history){
    document.getElementById('historyArticle').innerText = 'History';
    document.querySelector('.history-list').style.display = 'block';

    for (let key of history){
        let itemData = getItem(key);
        _createHistoryElement(itemData);
    }
}

function _clearHistory(){
    let tr = document.querySelectorAll('.history-item');
    tr.forEach(item => item.remove());

    document.querySelector('.history-list').style.display = 'none';
    document.getElementById('historyArticle').innerText = 'No records';
}


function _createHistoryElement(data){
    let tr = document.createElement('tr');
    tr.classList.add('history-item');
    let entries = Object.entries(data);

    for (let [key, value] of entries){
        if(key === 'done'){
            if(value) tr.classList.add('done')
            continue;
        }
        let td = document.createElement('td');
        td.classList.add('elemData');
        td.innerText = getValue(value);
        tr.append(td);
    }

    document.querySelector('.history-items tbody').append(tr);

    function getValue(data){
        if(typeof data === 'object'){
            let result = '';
            let values = Object.values(data)
            for (let value of values){
                result += getValue(value) + ' '
            }
            return result;
        }
        return data
    }
}


document.getElementById('created').addEventListener('click', sortTable(2))
document.getElementById('deadline').addEventListener('click', sortTable(3))


function sortTable(headerCell){
    let table = document.querySelector('.history-items');
    return function (e){
        e.stopPropagation();
        let sortedRows = Array.from(table.rows)
            .slice(1)
            .sort((rowA, rowB) => {
                return rowA.cells[headerCell].innerHTML > rowB.cells[headerCell].innerHTML ? 1 : -1
            })
        table.tBodies[0].append(...sortedRows);
    }
}


document.querySelector('.history-items tbody').addEventListener('click', (e)=>{
    for (let item of e.currentTarget.children){
        item.id = '';
    }
    if (!e.target.closest('tr')) return;

    e.stopPropagation();
    e.target.parentNode.id = 'selected';

    document.querySelector('.history-nav').style.display = 'flex';
})


// history-nav click event
document.querySelector('.history-nav').addEventListener('click', (e)=>{
    if(e.target.tagName !== 'INPUT') return;

    switch (e.target.id) {
        case 'edit':
            _editSelectedItem();
            break;
        case 'done':
            e.stopPropagation();
            let selectedItem = document.getElementById('selected');
            if(selectedItem.classList.contains('done')){
                selectedItem.classList.remove('done');
                _updateSelectedItem({done: false});
            } else {
                selectedItem.classList.add('done');
                _updateSelectedItem({done: true});
            }
            break;
        case 'delete':
            _deleteSelectedItem();
            break;
        default:
            break;
    }
})



window.addEventListener('click',(e)=>{
    let tableBody = document.querySelector('.history-items tbody');
    for (let item of tableBody.children){
        item.id = '';
    }
    document.querySelector('.history-nav').style.display = 'none';
})


function _editSelectedItem(){
    let key = document.querySelector('#selected td').innerText;
    let item = getItem(key);

    document.querySelector('.historyPage').style.display = 'none';
    document.querySelector('.newTaskPage').style.display = 'block';

    document.getElementById('name').value = item.name;
    document.getElementById('description').value = item.description;
    document.getElementById('date').value = item.deadline.date.split('-').reverse().join('-');
    document.getElementById('time').value = item.deadline.time;

    sessionStorage.setItem('tempKey', item.name);
    setSubmit(submitTypes.edit);
}


function _updateSelectedItem(data){
    let key = document.querySelector('#selected td').innerText;
    let item = getItem(key);
    item = Object.assign(item, data);

    updateItem(key, item);
}


function _deleteSelectedItem(){
    let key = document.querySelector('#selected td').innerText;
    removeItem(key)
    updateHistory();
}
