const baseUrl = 'https://open.er-api.com/v6/latest';

export const getCurrency = async (currency: string) => {
    const response = await fetch(`${baseUrl}/${currency}`);
    return response.json();
}
