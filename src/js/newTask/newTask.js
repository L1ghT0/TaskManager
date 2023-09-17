'use strict'
import {getFormData, clearFormData, isDeadlineDateAppropriate} from "./form.js";
import {storeItem, updateItem} from "../localStorage.js";
import {updateHistory} from "../history/history.js";


export const submitTypes = {
    create: 'create',
    edit: 'edit'
}


setSubmit(submitTypes.create);


export function setSubmit(type){
    if (!type || typeof type !== 'string') return;
    let submit = document.getElementById('create');
    submit.onclick = null;
    submit.onclick = submitHandler(type)
    submit.value = type[0].toUpperCase() + type.slice(1);
}


function submitHandler(type){
    let key;
    switch (type){
        case 'create':
            break;
        case 'edit':
            key = sessionStorage.getItem('tempKey');
            break;
        default:
            break;
    }
    return function (e){
        e.preventDefault();
        let data = getFormData();

        if(!isDeadlineDateAppropriate(data)) return;
        if(!data.name || !data.deadline.date || !data.deadline.time) return;
        if(data.name.length > 40) return;

        if(key){
            updateItem(key, data)
        } else {
            storeItem(data.name, data);
        }
        clearFormData();
        updateHistory();
    }
}
