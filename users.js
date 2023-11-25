// users.js

// Написать функционал по добавлению, изменению и удалению пользователей.
// Данные должны храниться в массиве, данные о пользователе должны быть в виде объекта (id, имя, фамилия, возраст)

// Должны быть реализованы функции:
// 1. addUser(имя, фамилия, возраст) - добавление нового пользователя
// 2. updateUser(id, имя, фамилия, возраст) - изменение данных о пользователе
// 3. deleteUser(id) - удаление пользователей в массиве (по id)

// Все функции должны ссылаться на 1 массив users:
// let users = [
//     {id: 1, name: 'Alex', lastname: 'Wilyam', age: 20},
//     {id: 2, name: 'Steven', lastname: 'King', age: 34} 
// ]

// Примечание: 
// 1. При добавлении пользователя id должен формироваться автоматически (в зависимости и количества пользователей). Например, очередная запись должна иметь значение id = 3
// 2. Продемонстрируйте работу всех функции на примерах (примеры могут быть произвольными)


// Значения переменных получаем по id тегов(см. index.html)
let inputElement = document.getElementById("user")
let addBtn = document.getElementById("add")
let listElement = document.getElementById("list")


// Изначальный массив с юзерами
let users = [
    {id: 1, name: 'Alex', lastname: 'Wilyam', age: 20},
    {id: 2, name: 'Steven', lastname: 'King', age: 34} 
]


// Функция добавления юзера в массив
function addUser(name, lastname, age) {
    let id = users.indexOf(users.at(-1)) + 2
    
    set = new Set()
    for(index in users) {
        set.add(users[index].id)
    }

    for(el of set) {
        if(id == el) {id += 1}
    }

    age = Number(age)
    users.push({id, name, lastname, age})
}


// Функция обновления информации о юзере
function updateUser(id, name, lastname, age) {
    let user = users.filter(item => item.id == id)
    user[0].id = Number(id)
    user[0].name = name
    user[0].lastname = lastname
    user[0].age = Number(age)
}


// Функция удаления юзера из массива
function deleteUser(id) {
    users = users.filter(user => user.id !== id)
}


// Функция отображения юзеров в веб-приложении
function render() {
    listElement.innerHTML = ""
    
    if(users.length === 0) {
        listElement.innerHTML = '<p class="text-center">Пользователей нет</p>'
    }

    for(let index in users) {
        listElement.insertAdjacentHTML("beforeend", getListUsers(users[index], index))
    }

    console.log(users)
}

render()


// Функция получения списка юзеров
function getListUsers(user) {
    return `
        <li class="list-group-item bg-dark text-light border-0 d-flex justify-content-between align-items-center">
            <span class="user" id="span${user.id}" contentEditable="true" data-index="${user.id}">${user.id}. ${user.name} ${user.lastname} ${user.age}</span>
            <span>
                <span class="btn btn-lg btn-success" data-index="${user.id}" data-type="edit">&check;</span>
                <span class="btn btn-lg btn-danger" data-index="${user.id}" data-type="remove">&times;</span>
            </span>
        </li>
    `
}


// Кнопка добавления юзера
addBtn.onclick = function() {
    if(inputElement.value.length === 0) {return undefined}
    let user = inputElement.value.split(" ")
    addUser(user[0], user[1], user[2])
    render()
    inputElement.value = ""
}


// Редактирование и удаление юзера
listElement.onclick = function(event) {
    if(event.target.dataset.index) {
        const id = parseInt(event.target.dataset.index)
        const type = event.target.dataset.type
        let span = document.getElementById(`span${id}`)

        if(type == "edit") {
            let user = span.textContent
            user = user.split(" ")
            updateUser(id, user[1], user[2], user[3])
            render()
        }

        else if(type == "remove") {
            deleteUser(id)
            render()
        }
    }
}
