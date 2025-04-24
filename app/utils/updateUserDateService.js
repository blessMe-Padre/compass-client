const updateUserDateService = async (recordId, formData, url) => {
    try {
        const response = await fetch(`${url}/${recordId}`, {
            method: 'PUT',
            body: formData, // передаём как есть
            // НЕ указываем headers, Content-Type сам проставится
        });

        return await response.json();
    } catch (error) {
        throw new Error(`Update failed: ${error.message}`);
    }
};

