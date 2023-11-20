const profile = document.getElementById("Profile")

// Функция выхода в профиль человека из окна отзывов
async function GoToProfileReview() {
    const createreviews = document.getElementById("CreateReviews")
    createreviews.style.display = "none"
    const reviewinput = document.getElementById("reviewinput")
    reviewinput.value = ""
    const reviewshopinput = document.getElementById("reviewshopinput")
    reviewshopinput.value = ""
    const reviewstarsinput = document.getElementById("reviewstarsinput")
    reviewstarsinput.value = ""
    profile.style.display = "block"
}

export default GoToProfileReview