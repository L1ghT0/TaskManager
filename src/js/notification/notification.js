'use strict'
import {getHistory, getItem} from "../localStorage.js";
let history = getHistory();

if (!("Notification" in window)){
    // Check if the browser supports notifications
    console.log("This browser does not support desktop notification");
}else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    makeNotifications();
} else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            makeNotifications();
        }
    });
}

function makeNotifications(){
    for (let key of history){
        let item = getItem(key);
        if(!item.done) planNotification(item);
    }
}


function planNotification(item){
    let now = new Date();
    let [deadline_day, deadline_month, deadline_year] = item.deadline.date.split('-');
    let [deadline_hours, deadline_minutes] = item.deadline.time.split(':');

    if(now.getFullYear() === +deadline_year && now.getMonth()+1 === +deadline_month && now.getDate() === +deadline_day) {
        let hours = deadline_hours - now.getHours();
        let minutes = 0;
        let noticeIn = 0;
        if(deadline_minutes - now.getMinutes() < 0){
            minutes = deadline_minutes - now.getMinutes() + 60;
            hours--;
            if(hours < 0) return;
        } else {
            minutes = deadline_minutes - now.getMinutes();
        }
        noticeIn = hours*3600000;
        noticeIn += minutes*60000;
        notify(item.name, noticeIn);
    }
}

function notify(taskName = '', time = 0){
    setTimeout(()=>{
        const notification = new Notification(`The deadline for completing the task with name: '${taskName}' is over`);
    }, time)
}

// in ms ->>
// 86 400 000 - day
// 3 600 000 - hour
// 60 000 - minute