async function showPageContent(pageId) {
  let response = await fetch(`https://gorest.co.in/public/v2/posts/${pageId}`);
  let data = await response.json();
  let pageTitle = document.getElementById("page-title");
  pageTitle.textContent = data.title;
  let pageContent = document.getElementById("page-content");
  pageContent.textContent = data.body;
}

let ul = document.getElementById("links");
ul.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.tagName !== "") {
    let pageId = event.target.getAttribute("data-id");
    window.location.href = `page.html?id=${pageId}`;
  }
});

let searchParams = new URLSearchParams(window.location.search);
let pageId = searchParams.get("id");

showPageContent(pageId);

let button = document.getElementById("close");
button.addEventListener(`click`, () => {
    history.back();
});

