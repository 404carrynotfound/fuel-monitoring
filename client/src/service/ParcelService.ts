const baseUrl = 'http://localhost:8180/parcel';

export const SearchParcel = async (id: string) => {
    const res = await fetch(`${ baseUrl }/tracking/${ id }`);
    return res.json();
}
