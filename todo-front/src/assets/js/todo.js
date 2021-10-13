let input = document.querySelector('#writeText');
let inputUrl = document.querySelector('#writeUrl');
let btn = document.querySelector('#btn');
let btn1 = document.querySelector('#btn1');
let imgBtn = document.querySelector('#imgBtn');
let place = document.querySelector('#place');
let main = document.querySelector('.chat-main');
let chatForm = document.querySelector('.chat-form');

let token = window.localStorage.getItem('token')
let username = window.localStorage.getItem('username')
let userID = window.localStorage.getItem('userID')

if (!token && !username) window.location = '/login'
usernameIndex.textContent = 'Username: ' + username

const getTodos = async () => {
    let data = await request('/todos', 'GET', undefined, true)
    let res = await data.json()
    let messages = res.data
    console.log(messages)
    for (let i of messages) {

        
        let div = newElement('div');
        let divPimg = newElement('div');
        let p = newElement('p');
        let p2 = newElement('p');
        let div2 = newElement('div')
        let time = newElement('time');
        divPimg.classList.add('pimg')
        div.classList.add('message')
        console.log(i.username[0].toUpperCase());
        div2.textContent = i.username[0].toUpperCase()
        // p2.textContent = i.username
        if (userID == i.user_id) {
            div.classList.add('message-right');
            time.textContent = i.message_time
            let button = document.createElement('button')
            button.textContent = 'X'    
            button.style.width='20px'

            div.append(button)
            p.textContent = i.message_text

            p.contentEditable = true

            button.onclick = async () => {
                let res = await request('/todos', 'DELETE', { todo_id: i.todo_id }, true)
                if (res.status == 200) {
                    div.remove()
                }
            }

            p.onkeyup = async (event) => {
                if (event.keyCode == 13) {
                    let x = p.textContent
                    let res = await request('/todos', 'PUT', { todo_id: i.todo_id, message_text: p.textContent }, true)
                    p.textContent = x
                }
            }
        }
        else {
            div.classList.add('message-left');
            // p2.textContent = i.username
            time.textContent = i.message_time
            p.textContent = i.message_text


        }
        // img.src = '/img/wats.png'
        // img.style.width = '50px'
        // img.style.height = '50px'
        // divPimg.classList.add('pimg')
        p.classList.add('message-text');

        main.appendChild(div)
        div.appendChild(divPimg);
        divPimg.appendChild(div2)
        divPimg.appendChild(p);
        divPimg.appendChild(p2);
        div.appendChild(time);
    }
}

function newElement(element) {
    return document.createElement(element);
}

let btnClose = newElement('button');
btnClose.setAttribute('type', "button");
function getTime() {
    let date = new Date();
    let minut = date.getMinutes();
    let hours = date.getHours();
    if (minut < 10) {
        minut = "0" + minut;
    } if (hours < 10) {
        hours = "0" + hours;
    }
    let time = hours + ":" + minut;
    return time;
}
async function addMessage(event) {

    event.preventDefault()
    let newTodo = {
        message_text: writeText.value,
        message_time: getTime()
    }
    let res = await request('/todos', 'POST', newTodo, true)
    if (res.status == 200) {
        res = await res.json()
        let todo = res.data
        // renderTodos([todo])
    }

    if (input.value == "") return false;
    let div = newElement('div');
    let divPimg = newElement('div');
    let p = newElement('p');
    let img = newElement('img')
    let time = newElement('time');
    divPimg.classList.add('pimg')
    div.classList.add('message')
    div.classList.add('message-right');
    // img.src = '/img/wats.png'
    // img.style.width = '50px'
    // img.style.height = '50px'
    divPimg.classList.add('pimg')
    p.classList.add('message-text');

    main.appendChild(div)
    div.appendChild(divPimg);
    divPimg.appendChild(img)
    divPimg.appendChild(p);
    div.appendChild(time);
    p.textContent = input.value
    time.innerText = getTime();
    p.style.maxWidth = "220px"
    input.value = "";

    main.scrollTop = main.scrollHeight;
}
function addImage(url) {
    url = inputUrl;
    if (url.value == "") return false;
    let div = newElement('div');
    let img = newElement('img');
    let time = newElement("time");
    time.innerText = getTime();
    img.setAttribute("src", url.value);
    img.setAttribute("alt", "Img message");
    div.classList.add('message');
    div.appendChild(time);
    div.appendChild(img);
    main.appendChild(div);

    btn1.classList.remove('btn1Act');
    url.classList.remove('urlActive');
    url.value = "";
    main.scrollTop = main.scrollHeight;
    chatForm.removeChild(btnClose);
}

btn.addEventListener('click', addMessage)
btn1.addEventListener('click', addImage);
function addElement(parent, child) {
    parent.appendChild(child);
}
input.addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
        addMessage();
    }
})

imgBtn.addEventListener('click', function () {
    inputUrl.classList.add('urlActive');
    btn1.classList.add('btn1Act');
    addElement(chatForm, btnClose)
    btnClose.classList.add('closeBtn');
})
btnClose.addEventListener('click', function () {
    inputUrl.classList.remove('urlActive');
    btn1.classList.remove('btnAct');
    chatForm.removeChild(btnClose);
})

inputUrl.addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
        addImage(inputUrl);
    }
})


logout.onclick = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    window.location = '/login'
}



getTodos()

