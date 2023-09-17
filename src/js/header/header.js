'use strict'
import {clearFormData} from "../newTask/form.js";


document.getElementById('newTask').addEventListener('click', (e)=>{
    document.querySelector('.newTaskPage').style.display = 'block';
    document.querySelector('.historyPage').style.display = 'none';
    document.getElementById('create').value = 'Create';
    clearFormData();
})


document.getElementById('history').addEventListener('click', (e)=>{
    document.querySelector('.newTaskPage').style.display = 'none';
    document.querySelector('.historyPage').style.display = 'block';
})