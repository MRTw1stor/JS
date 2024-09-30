const API_URL = "http://127.0.0.1:3000";

export async function getItems(tableName) {
    const resp = await fetch(`${API_URL}/get/${tableName}`);
    return await resp.json();
}

export async function createItem(
    tableName, value1 , value2, value3, value4, value5, value6, value7, value8, value9, value10, value11, value12, value13, value14, value15) {
    if (tableName == "workstation"){
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
                param9: `${value9}`,
                param10: `${value10}`,
                param11: `${value11}`,
                param12: `${value12}`,
                param13: `${value13}`,
                param14: `${value14}`,
                param15: `${value15}`
            }),
        });
        return await resp.json();
    }
    else if (tableName == "accountingequipment"){
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
    else if (tableName == "monitorbrands") {
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
    else if (tableName == "monitormodels") {
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
    else if (tableName == "diskscapasity") {
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
    else if (tableName == "disksbrands") {
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
    else if (tableName == "disksmodels") {
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
    else if (tableName == "stantionsmodels") {
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
    else if (tableName == "operatingsystems") {
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
    else if (tableName == "processors") {
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
    else if (tableName == "ram") {
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
    else if (tableName == "departments") {
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
    else if (tableName == "conturs") {
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
    else if (tableName == "writeoffworkstations") {
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
    else if (tableName == "deletedworkstations") {
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

export async function updateEasyTables(tableName, value1 , value2, value3, value4) {
    if (tableName == "departments"){
        const resp = await fetch(`${API_URL}/updateEasyTables/${tableName}`, {
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
    else if (tableName == "monitorbrands"){
        const resp = await fetch(`${API_URL}/updateEasyTables/${tableName}`, {
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
    else if (tableName == "disksbrands") {
        const resp = await fetch(`${API_URL}/updateEasyTables/${tableName}`, {
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
    else if (tableName == "stantionsmodels") {
        const resp = await fetch(`${API_URL}/updateEasyTables/${tableName}`, {
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
    else if (tableName == "operatingsystems") {
        const resp = await fetch(`${API_URL}/updateEasyTables/${tableName}`, {
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
    else if (tableName == "processors") {
        const resp = await fetch(`${API_URL}/updateEasyTables/${tableName}`, {
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
    else if (tableName == "diskscapasity"){
        const resp = await fetch(`${API_URL}/updateEasyTables/${tableName}`, {
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
    else if (tableName == "ram"){
        const resp = await fetch(`${API_URL}/updateEasyTables/${tableName}`, {
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
    else if (tableName == "conturs"){
        const resp = await fetch(`${API_URL}/updateEasyTables/${tableName}`, {
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
}

export async function updateDifficultTables(tableName, value1 , value2, value3, value4, value5) {
    if (tableName == "monitormodels"){
        const resp = await fetch(`${API_URL}/updateDifficultTables/${tableName}`, {
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
                param5: `${value5}`
            }),
        });
        return await resp.json();
    }
    else if (tableName == "disksmodels"){
        const resp = await fetch(`${API_URL}/updateDifficultTables/${tableName}`, {
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
                param5: `${value5}`
            }),
        });
        return await resp.json();
    }
}