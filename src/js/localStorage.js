'use strict'

let history = localStorage.getItem('task_manager_history');

if(!history){
    _setHistory([]);
}


export function getHistory(){
    return JSON.parse(localStorage.getItem('task_manager_history'));
}

function _setHistory(history){
    localStorage.setItem('task_manager_history', JSON.stringify(history))
}

export function storeItem(key, value){
    if(!key || typeof key !== "string" || !value) return;

    localStorage.setItem(key, JSON.stringify(value));

    let history = getHistory();
    history.push(key);
    _setHistory(history);

    console.log('Item has been stored');
}

export function removeItem(key){
    if(!key || typeof key !== "string") return;

    localStorage.removeItem(key);

    let history = getHistory();
    history = history.filter(item => item !== key);
    _setHistory(history);
}

export function getItem(key){
    return JSON.parse(localStorage.getItem(key));
}

export function updateItem(key, value){
    if(!key || typeof key !== "string" || !value) return;

    if(key !== value.name){
        removeItem(key);
        storeItem(value.name, value)
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }

    console.log('Item has been updated');
}