async function getIdPage(id) {
    let responce = await fetch(`https://gorest.co.in/public/v2/posts?page=${id}`)
    let data = await responce.json()
    return data
}

async function FirstPage(index) {
    let section = document.getElementById('section')
    let ul = document.createElement('ul')
    let li = document.createElement('li')
    li.classList.add('list')

    for (let elem of await getIdPage(index)) {
        let link = document.createElement('a')
        link.textContent = elem.title
        link.href = `page.html?id=${elem.id}`
        li.append(link)
        li.append(document.createElement('br'))
    }
    ul.append(li)
    section.append(ul)
}

function RenderingPages() {
    let butons = document.querySelectorAll(".button")
    for (let i = 0; i < butons.length; i++){
        butons[i].addEventListener('click', async (soft) => {
            soft.preventDefault()
            ClearPage()

            let section = document.getElementById('section')
            let ul = document.createElement('ul')
            let li = document.createElement('li')
            li.classList.add('list')

            for (let elem of await getIdPage(soft.target.textContent)) {
                let link = document.createElement('a')
                link.textContent = elem.title
                link.href = `page.html?id=${elem.id}`
                li.append(link)
                li.append(document.createElement('br'))
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
    FirstPage(1)
})