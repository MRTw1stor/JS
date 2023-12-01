import { getItems, createItem, deleteItem, update } from "./api.js";

const home = document.getElementById("Home")
const alltables = document.getElementById("CheckAllTables")
alltables.style.display = "none"

const tableauthor = document.getElementById("tableauthors")
tableauthor.style.display = "none"
const tablegenres = document.getElementById("tablegenres")
tablegenres.style.display = "none"
const tablebooks = document.getElementById("tablebooks")
tablebooks.style.display = "none"
const tablequantybooks = document.getElementById("tablequantybooks")
tablequantybooks.style.display = "none"
const tablereaders = document.getElementById("tablereaders")
tablereaders.style.display = "none"
const tablemoving = document.getElementById("tablemoving")
tablemoving.style.display = "none"

const createauthor = document.getElementById("createauthor")
createauthor.style.display = "none"
const creategenre = document.getElementById("creategenre")
creategenre.style.display = "none"
const createbooks = document.getElementById("createbooks")
createbooks.style.display = "none"
const createquantybook = document.getElementById("createquantybook")
createquantybook.style.display = "none"
const createreaders = document.getElementById("createreaders")
createreaders.style.display = "none"
const createmoving = document.getElementById("createmoving")
createmoving.style.display = "none"

const tablebodyauthor = document.getElementById("author")
const tablebodygenre = document.getElementById("genres")
const tablebodybooks = document.getElementById("book")
const tablebodyquantybooks = document.getElementById("quantybook")
const tablebodyreaders = document.getElementById("reader")
const tablebodymoving = document.getElementById("movings")

async function test(tableName) {
    const items = await getItems(tableName);
    const item = items.rows
    return item
}

function formatDate(isodate) {
    const datePart = isodate.substring(0, 10);
    return datePart;
}

document.getElementById("buttonchecktable").addEventListener("click", () => {
    home.style.display = "none"
    alltables.style.display = "flex"
})

document.getElementById("gotohomebutton").addEventListener("click", () => {
    home.style.display = "block"
    alltables.style.display = "none"
})

document.getElementById("checkauthorsbuttons").addEventListener("click", async () => {
    tablebodyauthor.innerHTML = ""
    tableauthor.style.display = "block"
    alltables.style.display = "none"

    const item = await test("author")
    item.forEach(item => {
        const tr = document.createElement(`tr`)
        const values = Object.values(item)
        for (let i = 0; i < values.length + 1; i++) {
            const th = document.createElement(`th`)
            if (typeof values[i] === 'string' && /\d/.test(values[i])) {
                th.textContent = formatDate(values[i])
            }
            else if (i == values.length){
                const button = document.createElement("button")
                button.textContent = "Удалить"
                button.addEventListener("click", async () =>{
                    deleteItem("author",values[0])
                })
                th.append(button)
            }
            else {
                th.textContent = values[i]
            }
            tr.append(th)
        }
        tablebodyauthor.append(tr)
    });

})

document.getElementById("buttonautors").addEventListener("click", () => {
    tableauthor.style.display = "none"
    alltables.style.display = "flex"
})

document.getElementById("checkgenresbuttons").addEventListener("click", async () => {
    tablebodygenre.innerHTML = ""
    tablegenres.style.display = "block"
    alltables.style.display = "none"

    const item = await test("genre")
    item.forEach(item => {
        const tr = document.createElement(`tr`)
        const values = Object.values(item)
        for (let i = 0; i < values.length + 1; i++) {
            const th = document.createElement(`th`)
            if (i == values.length){
                const button = document.createElement("button")
                button.textContent = "Удалить"
                button.addEventListener("click", async () =>{
                    deleteItem("genre",values[0])
                })
                th.append(button)
            }
            else{
                th.textContent = values[i]
            }
            tr.append(th)
        }
        tablebodygenre.append(tr)
    });
})

document.getElementById("buttongenre").addEventListener("click", () => {
    tablegenres.style.display = "none"
    alltables.style.display = "flex"
})

document.getElementById("checkbooksbuttons").addEventListener("click", async () => {
    tablebodybooks.innerHTML = ""
    tablebooks.style.display = "block"
    alltables.style.display = "none"

    const item = await test("books")
    item.forEach(item => {
        const tr = document.createElement(`tr`)
        const values = Object.values(item)
        for (let i = 0; i < values.length + 1; i++) {
            const th = document.createElement(`th`)
            if (i == values.length){
                const button = document.createElement("button")
                button.textContent = "Удалить"
                button.addEventListener("click", async () =>{
                    deleteItem("books",values[0])
                })
                th.append(button)
            }
            else{
                th.textContent = values[i]
            }
            tr.append(th)
        }
        tablebodybooks.append(tr)
    });
})

document.getElementById("buttonbooks").addEventListener("click", () => {
    tablebooks.style.display = "none"
    alltables.style.display = "flex"
})

document.getElementById("checkquantybooksbuttons").addEventListener("click", async () => {
    tablebodyquantybooks.innerHTML = ""
    tablequantybooks.style.display = "block"
    alltables.style.display = "none"

    const item = await test("quantitybooks")
    item.forEach(item => {
        const tr = document.createElement(`tr`)
        const values = Object.values(item)
        for (let i = 0; i < values.length + 1; i++) {
            const th = document.createElement(`th`)
            if (i == values.length){
                const button = document.createElement("button")
                button.textContent = "Удалить"
                button.addEventListener("click", async () =>{
                    deleteItem("quantitybooks",values[0])
                })
                th.append(button)
            }
            else{
                th.textContent = values[i]
            }
            tr.append(th)
        }
        tablebodyquantybooks.append(tr)
    });
})

document.getElementById("buttonquantybooks").addEventListener("click", () => {
    tablequantybooks.style.display = "none"
    alltables.style.display = "flex"
})

document.getElementById("checkridersbuttons").addEventListener("click", async () => {
    tablebodyreaders.innerHTML = ""
    tablereaders.style.display = "block"
    alltables.style.display = "none"
    test("readers")

    const item = await test("readers")
    item.forEach(item => {
        const tr = document.createElement(`tr`)
        const values = Object.values(item)
        for (let i = 0; i < values.length + 1; i++) {
            const th = document.createElement(`th`)
            if (i == values.length){
                const button = document.createElement("button")
                button.textContent = "Удалить"
                button.addEventListener("click", async () =>{
                    deleteItem("readers",values[0])
                })
                th.append(button)
            }
            else{
                th.textContent = values[i]
            }
            tr.append(th)
        }
        tablebodyreaders.append(tr)
    });
})

document.getElementById("buttonreders").addEventListener("click", () => {
    tablereaders.style.display = "none"
    alltables.style.display = "flex"
})

document.getElementById("checkmovingsbuttons").addEventListener("click", async () => {
    tablebodymoving.innerHTML = ""
    tablemoving.style.display = "block"
    alltables.style.display = "none"

    const item = await test("moving")
    item.forEach(item => {
        const tr = document.createElement(`tr`)
        const values = Object.values(item)
        for (let i = 0; i < values.length + 1; i++) {
            const th = document.createElement(`th`)
            if (values[i] === true) {
                th.textContent = "да"
            }
            else if (values[i] === false) {
                th.textContent = "нет"
            }
            else if (typeof values[i] === 'string' && /\d/.test(values[i])) {
                th.textContent = formatDate(values[i])
            }
            else if (i == values.length){
                const button = document.createElement("button")
                button.textContent = "Удалить"
                button.addEventListener("click", async () =>{
                    deleteItem("moving",values[0])
                })
                th.append(button)
            }
            else {
                th.textContent = values[i]
            }
            tr.append(th)
        }
        tablebodymoving.append(tr)
    });
})

document.getElementById("buttonmoving").addEventListener("click", () => {
    tablemoving.style.display = "none"
    alltables.style.display = "flex"
})

document.getElementById("gotoaddauthor").addEventListener("click", () => {
    createauthor.style.display = "block"
    home.style.display = "none"
})

document.getElementById("closeauthor").addEventListener("click", () => {
    createauthor.style.display = "none"
    home.style.display = "block"
})

document.getElementById("gotoaddgenre").addEventListener("click", () => {
    creategenre.style.display = "block"
    home.style.display = "none"
})

document.getElementById("closegenre").addEventListener("click", () => {
    creategenre.style.display = "none"
    home.style.display = "block"
})

document.getElementById("gotoaddbook").addEventListener("click", () => {
    createbooks.style.display = "block"
    home.style.display = "none"
})

document.getElementById("closebook").addEventListener("click", () => {
    createbooks.style.display = "none"
    home.style.display = "block"
})

document.getElementById("gotoaddquantybook").addEventListener("click", () => {
    createquantybook.style.display = "block"
    home.style.display = "none"
})

document.getElementById("closequantybook").addEventListener("click", () => {
    createquantybook.style.display = "none"
    home.style.display = "block"
})

document.getElementById("gotoaddreader").addEventListener("click", () => {
    createreaders.style.display = "block"
    home.style.display = "none"
})

document.getElementById("closereader").addEventListener("click", () => {
    createreaders.style.display = "none"
    home.style.display = "block"
})

document.getElementById("gotoaddmoving").addEventListener("click", () => {
    createmoving.style.display = "block"
    home.style.display = "none"
})

document.getElementById("closemoving").addEventListener("click", () => {
    createmoving.style.display = "none"
    home.style.display = "block"
})

document.getElementById("newauthor").addEventListener("click", async () => {
    const inputSurname = document.getElementById('inputauthorsurname');
    const inputName = document.getElementById('inputauthorname');
    const inputLastname = document.getElementById('inputauthorlastname');
    const inputDate = document.getElementById('inputauthordate');

    const surname = inputSurname.value.trim();
    const name = inputName.value.trim();
    const lastname = inputLastname.value.trim();
    const date = inputDate.value.trim();

    if (surname === '' || name === '' || lastname === '' || date === '') {
        alert('Пожалуйста, заполните все поля');
    } else {
        createItem("author", surname, name, lastname, date)
        inputSurname.value = ""
        inputName.value = ""
        inputLastname.value = ""
        inputDate.value = ""
    }
})

document.getElementById("newgenre").addEventListener("click", async () => {
    const inputGenreName = document.getElementById('inputgenrename');
    const inputGenreOpisanie = document.getElementById('inputgenreopisanie');

    const genreName = inputGenreName.value.trim();
    const genreOpisanie = inputGenreOpisanie.value.trim();

    if (genreName === '') {
        alert('Пожалуйста, заполните все поля');
    } else {
        createItem("genre", genreName, genreOpisanie)
        inputGenreName.value = ""
        inputGenreOpisanie.value = ""
    }
})

document.getElementById("newbook").addEventListener("click", async () => {
    const inputBookName = document.getElementById('inputbookname');
    const inputGenreId = document.getElementById('inputgenreid');
    const inputAuthorId = document.getElementById('inputauthorid');

    const bookName = inputBookName.value.trim();
    const genreId = inputGenreId.value.trim();
    const authorId = inputAuthorId.value.trim();

    if (bookName === '' || genreId === '' || authorId === '') {
        alert('Пожалуйста, заполните все поля');
    } else {
        createItem("books", bookName, genreId, authorId)
        inputBookName.value = ""
        inputGenreId.value = ""
        inputAuthorId.value = ""
    }
})

document.getElementById("newquantybook").addEventListener("click", async () => {
    const inputBookId = document.getElementById('inputbookid');
    const inputQuantyBook = document.getElementById('inputquantybook');

    const bookId = inputBookId.value.trim();
    const quantyBook = inputQuantyBook.value.trim();

    if (bookId === '' || quantyBook === '') {
        alert('Пожалуйста, заполните все поля');
    } else {
        createItem("quantitybooks", bookId, quantyBook)
        inputBookId.value = ""
        inputQuantyBook.value = ""
    }
})

document.getElementById("newreader").addEventListener("click", async () => {
    const inputReaderSurname = document.getElementById('inputreadersurname');
    const inputReaderName = document.getElementById('inputreadername');
    const inputReaderLastname = document.getElementById('inputreaderlastname');
    const inputReaderAdress = document.getElementById('inputreaderadress');
    const inputReaderSeria = document.getElementById('inputreaderseria');
    const inputReaderNomer = document.getElementById('inputreadernomer');
    const inputReaderCountry = document.getElementById('inputreadercountry');
    const inputReaderCity = document.getElementById('inputreadercity');
    const inputReaderPhone = document.getElementById('inputreaderphone');

    const readerSurname = inputReaderSurname.value.trim();
    const readerName = inputReaderName.value.trim();
    const readerLastname = inputReaderLastname.value.trim();
    const readerAdress = inputReaderAdress.value.trim();
    const readerSeria = inputReaderSeria.value.trim();
    const readerNomer = inputReaderNomer.value.trim();
    const readerCountry = inputReaderCountry.value.trim();
    const readerCity = inputReaderCity.value.trim();
    const readerPhone = inputReaderPhone.value.trim();

    if (readerSurname === '' || readerName === '' || readerLastname === '' || readerAdress === '' || 
    readerSeria === '' || readerNomer === '' || readerCountry === '' || readerCity === '' || readerPhone === '') {
        alert('Пожалуйста, заполните все поля');
    } else {
        createItem("readers", readerSurname, readerName, readerLastname, readerAdress, readerSeria, readerNomer, readerCountry, readerCity, readerPhone)
        inputReaderSurname.value = ""
        inputReaderName.value = ""
        inputReaderLastname.value = ""
        inputReaderAdress.value = ""
        inputReaderSeria.value = ""
        inputReaderNomer.value = ""
        inputReaderCountry.value = ""
        inputReaderCity.value = ""
        inputReaderPhone.value = ""
    }
})

document.getElementById("newmoving").addEventListener("click", async () => {
    const inputMovingBookId = document.getElementById('inputmovingbookid');
    const inputMovingReaderId = document.getElementById('inputmovingreaderid');
    const inputBookInData = document.getElementById('inputbookindata');

    const movingBookId = inputMovingBookId.value.trim();
    const movingReaderId = inputMovingReaderId.value.trim();
    const bookInData = inputBookInData.value.trim();

    if (movingBookId === '' || movingReaderId === '' || bookInData === '') {
        alert('Пожалуйста, заполните все поля');
    } else {
        createItem("moving", movingBookId, movingReaderId, bookInData)
        inputMovingBookId.value = ""
        inputMovingReaderId.value = ""
        inputBookInData.value = ""
    }
})

document.getElementById("updatemovingbutton").addEventListener("click", async () => {
    const updateMovingInput = document.getElementById('updatemovinginput');
    const cardNumber = updateMovingInput.value.trim();

    if (cardNumber === '') {
        alert('Пожалуйста, введите номер карточки');
    } else {
        update(cardNumber)
        updateMovingInput.value = ""
    }
})