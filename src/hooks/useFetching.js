import { useState } from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async () => { // Обработка индикатора загрузки, самый часто встречающийся кейс
        try {
            setIsLoading(true) // по умолчанию индикатор загрузки включен
            await callback()
        } catch(e) {
            setError(e.message) // ловим ошибку и выводим сообщение
        } finally {
            setIsLoading(false) // под конец всегда отключаем индикатор
        }
    }

    return [fetching, isLoading, error]
}