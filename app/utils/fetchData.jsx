export default async function fetchData(url) {
    try {
        const response = await fetch(url, {
            next: { revalidate: 10},
        })

        if (!response.ok) {
            throw new Error(`Ошибка http:, ${response.status}`)
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Произошла ошибка', error)
        return [];
    }
}