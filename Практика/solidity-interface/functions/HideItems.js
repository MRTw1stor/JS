const createPassword = document.getElementById("CreatePassword");
const profile = document.getElementById("Profile")
const forms = document.getElementById("Forms")


// Функция скрытия ненужных элементов
async function HideItems() {
    createPassword.style.display = "none"
    profile.style.display = "none"
    forms.style.display = "none"
}

export default HideItems