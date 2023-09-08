
async function getIdPage(id) {
    let responce = await fetch(`https://gorest.co.in/public/v2/posts?page=${id}`)
    let data = await responce.json()
    return data
}

async function FirstPage(index) {
    let numPage = document.querySelector('#span')
    numPage.textContent = index
    let section = document.getElementById('section')
    let ul = document.createElement('ul')
    let li = document.createElement('li')
    li.classList.add('list')

    for (let elem of await getIdPage(index)) {
        let button = document.createElement('button')
        button.textContent = 'Перейти'
        button.classList.add('gotolist')
        let link = document.createElement('a')
        link.textContent = elem.title
        button.addEventListener("click", () => {
            document.location = `page.html?id=${elem.id}`
        })
        let div = document.createElement('div')
        div.classList.add('div')
        div.append(link)
        div.append(button)
        // div.append(document.createElement('br'))
        li.append(div)
    }
    ul.append(li)
    section.append(ul)
}

function RenderingPages(index) {
    let butons = document.querySelectorAll(".button")   
    for (let i = 0; i < butons.length; i++){
        butons[i].addEventListener('click', async (soft) => {
            let page = event.target.textContent
            location.reload()
            localStorage.setItem("page",page)
            soft.preventDefault()
            ClearPage()

            let section = document.getElementById('section')
            let ul = document.createElement('ul')
            let li = document.createElement('li')
            li.classList.add('list')

            for (let elem of await getIdPage(soft.target.textContent)) {
                let button = document.createElement('button')
                button.textContent = 'Перейти'
                button.classList.add('gotolist')
                let link = document.createElement('a')
                link.textContent = elem.title
                button.addEventListener("click", () => {
                    document.location=`page.html?id=${elem.id}`
                })
                let div = document.createElement('div')
                div.classList.add('div')
                div.append(link)
                div.append(button)
                // div.append(document.createElement('br'))
                li.append(div)
            }
            ul.append(li)
            section.append(ul)
        })
    }
}

function ClearPage() {
    document.querySelectorAll('.list').forEach((item) => {
        item.remove()
    })
}

document.addEventListener("DOMContentLoaded", () => {
    RenderingPages()
    FirstPage(localStorage.getItem("page"))
})