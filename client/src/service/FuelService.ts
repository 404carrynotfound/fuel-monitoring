const baseUrl = 'http://localhost:5000/fuel';

export const addFuel = async (form: FormData) => {
    return fetch(baseUrl, {
        method: 'POST',
        body: form,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    });
}

export const getFuel = async () => {
    const response = await fetch(baseUrl);
    return response.json();
}

export const getDaily = async () => {
    const response = await fetch(`${ baseUrl }/daily`);
    return response.json();
}

export const getYearly = async () => {
    const response = await fetch(`${ baseUrl }/yearly`);
    return response.json();
}

export const getMonthly = async () => {
    const response = await fetch(`${ baseUrl }/monthly`);
    return response.json();
}
