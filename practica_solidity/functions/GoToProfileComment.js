const profile = document.getElementById("Profile")

// Функция выхода в профиль человека из окна оценок к отзыву
async function GoToProfileComment() {
    const createcomment = document.getElementById("CreateComment")
    createcomment.style.display = "none"
    const commentreviewinput = document.getElementById("commentreviewinput")
    commentreviewinput.value = ""
    const commentmarksinput = document.getElementById("commentmarksinput")
    commentmarksinput.value = ""
    profile.style.display = "block"
}

export default GoToProfileComment