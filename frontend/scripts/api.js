const API_URL = "http://127.0.0.1:3000";

export async function getItems(tableName) {
    const resp = await fetch(`${API_URL}/get/${tableName}`);
    return await resp.json();
}

export async function createItem(
    tableName, value1) {
    if (tableName == "monitorbrands") {
        const resp = await fetch(`${API_URL}/post/${tableName}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                param1: `${value1}`
            }),
        });
        return await resp.json();
    }
}

export async function deleteItem(tableName, id) {
    const params = [`${tableName}`, `${id}`]
    const resp = await fetch(`${API_URL}/del/${params}`, { method: "DELETE" });
    return await resp.json();
}

export async function update(value) {
    const resp = await fetch(`${API_URL}/update`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            param: `${value}`
        }),
    });
    return await resp.json();
}