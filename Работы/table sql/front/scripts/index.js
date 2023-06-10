import { getItems, createItem, deleteItem } from "./api.js";

const name = document.querySelector("#name")
const secondname = document.querySelector("#secondname")
const surname = document.querySelector("#surname")
const birthday = document.querySelector("#birdh")
const faculty = document.querySelector("#faculty")
const button = document.querySelector("#add")

  
async function updateItems() {
    const item = await getItems()
    let table = document.getElementById("students");
    
    for (const itemm of item) {
        
    let tr = document.createElement("tr");
    table.append(tr);
    let birthdate = itemm.birthday;
    if(!(birthdate instanceof Date)) birthdate = new Date(birthdate)
      let student = {
        fullName: `${itemm.surname} ${itemm.name} ${itemm.secondname}`,
        faculty: itemm.faculty,
        birthdate: `${birthdate.getDate()}.${birthdate.getMonth() + 1}.${birthdate.getFullYear()} (${Age(birthdate)} лет)`
      };
  
      for (let key in student) {
        let td = document.createElement("td");
        td.textContent = student[key];
        tr.append(td);
      }
    
       
        const itemDeleteBtn = document.createElement("button");
        itemDeleteBtn.innerText = "Удалить"
        itemDeleteBtn.addEventListener("click", () => {
            deleteItem(itemm.id).then(() => updateItems());
            location.reload()
        });
        tr.append(itemDeleteBtn)


    }
}

function Age(age) {
    return Math.floor((Date.now() - age) / (1000 * 60 * 60 * 24 * 30 * 12));
}

button.addEventListener("click", async () => {

    const text = name.value;
    const text2 = secondname.value
    const text1 = surname.value;
    const text3 = birthday.value;
    const text4 = faculty.value;
    if (!text) return;

    await createItem(text, text1, text2, text3, text4);
    await updateItems();

    name.value = "";
    secondname.value = "";
    surname.value = "";
    birthday.value = "";
    faculty.value = "";
});

updateItems();