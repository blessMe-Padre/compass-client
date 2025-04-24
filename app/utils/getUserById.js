const getUserById = async (documentId) => {
    try {
        const res = await fetch(`http://90.156.134.142:1337/api/users/?filters[documentId][$eq]=${documentId}`);
        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`);
        }
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Ошибка при загрузке:", error);
        return [];
    }
};

export default getUserById;