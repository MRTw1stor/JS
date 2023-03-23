alert("Привет")

let users = [
    { login: 'gmai456.gmail.com', pasword: '456383', nik: 'Роман' },
    { login: 'popiv45.gmail.com', pasword: 'idiuv', nik: 'Петр' },
    { login: 'poevai7.gmail.com', pasword: '2342iuji', nik: 'Николай' },
    { login: 'evainp9.gmail.com', pasword: '456!hfh', nik: 'Евгений' }
]
let inputLog = prompt("Введите логин")
let inputPasw = prompt("Введите пароль")

function avtorisaze(){
    for (i = 0; i < users.length; i ++){
        if (inputLog == users[i].login && inputPasw == users[i].pasword){
            alert(`Здравствуйте ${users[i].nik}`)
            return
        }
        else{alert("Вы не правильно ввели логин или пароль")}
        return 
    }
}
avtorisaze()