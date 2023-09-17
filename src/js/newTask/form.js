export function getFormData(){
    return{
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        created: getDateNow(),
        deadline: {
            date: document.getElementById('date').value.split('-').reverse().join('-'),
            time: document.getElementById('time').value,
        },
        done: false
    }
}

export function clearFormData(){
    document.getElementById('name').value = ''
    document.getElementById('description').value = ''
    document.getElementById('date').value = ''
    document.getElementById('time').value = ''
}
getDateNow();

function getDateNow(){
    let now = new Date();
    return {
        date: `${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}-${now.getMonth()+1 < 10 ? '0' + (now.getMonth()+1) : now.getMonth()+1}-${now.getFullYear()}`,
        time: `${now.getHours() < 10 ? '0' + now.getHours(): now.getHours()}:${now.getMinutes() < 10 ? '0' + now.getMinutes(): now.getMinutes()}`
    }
}

export function isDeadlineDateAppropriate(data){
    let created = data.created.date.split('-').reverse();
    let deadlineDate = data.deadline.date.split('-').reverse();

    if(created.length !== deadlineDate.length) return false;

    for (let i = 0; i < created.length; i++){
        if(+created[i] > +deadlineDate[i]) return false;
        if(+created[i] < +deadlineDate[i]) return true;
    }
    return true;
}