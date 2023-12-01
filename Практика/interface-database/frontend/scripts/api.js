const API_URL = "http://localhost:3000";

export async function getItems(tableName) {
    const resp = await fetch(`${API_URL}/get/${tableName}`);
    return await resp.json();
}

export async function createItem(
    tableName, value1, value2, value3, value4, value5, value6, value7, value8, value9) {
    if (tableName == "author") {
        const resp = await fetch(`${API_URL}/post/${tableName}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                param1: `${value1}`,
                param2: `${value2}`,
                param3: `${value3}`,
                param4: `${value4}`
            }),
        });
        return await resp.json();
    }
    else if (tableName == "genre") {
        const resp = await fetch(`${API_URL}/post/${tableName}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                param1: `${value1}`,
                param2: `${value2}`
            }),
        });
        return await resp.json();
    }
    else if (tableName == "books") {
        const resp = await fetch(`${API_URL}/post/${tableName}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                param1: `${value1}`,
                param2: `${value2}`,
                param3: `${value3}`
            }),
        });
        return await resp.json();
    }
    else if (tableName == "quantitybooks") {
        const resp = await fetch(`${API_URL}/post/${tableName}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                param1: `${value1}`,
                param2: `${value2}`
            }),
        });
        return await resp.json();
    }
    else if (tableName == "readers") {
        const resp = await fetch(`${API_URL}/post/${tableName}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                param1: `${value1}`,
                param2: `${value2}`,
                param3: `${value3}`,
                param4: `${value4}`,
                param5: `${value5}`,
                param6: `${value6}`,
                param7: `${value7}`,
                param8: `${value8}`,
                param9: `${value9}`
            }),
        });
        return await resp.json();
    }
    else if (tableName == "moving") {
        const resp = await fetch(`${API_URL}/post/${tableName}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                param1: `${value1}`,
                param2: `${value2}`,
                param3: `${value3}`
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