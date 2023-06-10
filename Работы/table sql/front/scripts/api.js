const API_URL = "http://localhost:3000";

export async function getItems() {
    const resp = await fetch(API_URL);
    return await resp.json();
}

export async function createItem(name, surname, secondname, birthday, faculty) {
    const resp = await fetch(API_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, secondname, birthday, faculty }),
    });

    return await resp.json();
}

export async function deleteItem(id) {
    const resp = await fetch(`${API_URL}/?id=${id}`, { method: "DELETE" });
    return await resp.json();
}