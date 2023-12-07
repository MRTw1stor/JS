const whoTransact = document.getElementById("who");
const profile = document.getElementById("Profile")
const review = document.getElementById("CheckReview")
const reviewsinfo1 = document.getElementById("reviewsinfo1")
const reviewsinfo2 = document.getElementById("reviewsinfo2")
const tablereviews1 = document.getElementById("tablereviews1")
const tablereviews2 = document.getElementById("tablereviews2")

// Функция открытия окна всех отзывов
async function CheckReviews(users, shops, reviews) {
    profile.style.display = "none";
    review.style.display = "block";


    for (let i = 0; i < users.length; i++) {
        if (whoTransact.value == users[i].user) {
            reviewsinfo1.style.display = "block"
            reviewsinfo2.style.display = "none"

            for (let j = 0; j < reviews.length; j++) {
                let body = document.createElement("tbody");
                let numbershop = document.createElement("td");
                let whoreview = document.createElement("td");
                let review = document.createElement("td");
                let rating = document.createElement("td");
                let likes = document.createElement("td");
                let dislikes = document.createElement("td");

                numbershop.textContent = reviews[j].id_shop
                whoreview.textContent = reviews[j].who
                review.textContent = reviews[j].review
                rating.textContent = reviews[j].stars
                likes.textContent = reviews[j].likes
                dislikes.textContent = reviews[j].dislikes
                body.append(numbershop, whoreview, review, rating, likes, dislikes)
                tablereviews1.append(body)
            }
        }
    }

    for (let i = 0; i < shops.length; i++) {
        if (whoTransact.value == shops[i].shop) {
            reviewsinfo1.style.display = "none"
            reviewsinfo2.style.display = "block"

            for (let j = 0; j < reviews.length; j++) {
                if (shops[i].id_shop == reviews[j].id_shop) {
                    let body = document.createElement("tbody");
                    let whoreview = document.createElement("td");
                    let review = document.createElement("td");
                    let rating = document.createElement("td");
                    let likes = document.createElement("td");
                    let dislikes = document.createElement("td");

                    whoreview.textContent = reviews[j].who
                    review.textContent = reviews[j].review
                    rating.textContent = reviews[j].stars
                    likes.textContent = reviews[j].likes
                    dislikes.textContent = reviews[j].dislikes
                    body.append(whoreview, review, rating, likes, dislikes)
                    tablereviews2.append(body)
                }
            }
        }
    }
}

export default CheckReviews