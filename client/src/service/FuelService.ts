const baseUrl = 'http://localhost:5000/fuel';

export const getDaily = async () => {
    const response = await fetch(`${baseUrl}/daily`);
    return response.json();
}

export const getYearly = async () => {
    const response = await fetch(`${baseUrl}/yearly`);
    return response.json();
}

export const getMonthly = async () => {
    const response = await fetch(`${baseUrl}/monthly`);
    return response.json();
}
