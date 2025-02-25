import axios, { AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Typy pomocnicze
type QueryKeyT = readonly unknown[]
type ApiFunction<T> = (...args: any[]) => Promise<T>

// Funkcja opakowująca do obsługi błędów
export const handleApiError = (error: unknown) => {
    if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || error.message)
    }
    throw error
}

// Funkcja pomocnicza do tworzenia query key
export const createQueryKey = (key: string, params?: object): QueryKeyT => {
    return params ? [key, params] : [key]
}

// Funkcja pomocnicza do zapytań GET
export const createQuery = <T>(
    queryKey: QueryKeyT,
    apiFn: ApiFunction<T>
) => ({
    queryKey,
    queryFn: async () => {
        try {
            const response = await apiFn()
            return response
        } catch (error) {
            handleApiError(error)
        }
    },
})

// Funkcja pomocnicza do mutacji (POST, PUT, DELETE)
export const createMutation = <T>(
    mutationFn: ApiFunction<T>
) => ({
    mutationFn: async (...args: Parameters<typeof mutationFn>) => {
        try {
            const response = await mutationFn(...args)
            return response
        } catch (error) {
            handleApiError(error)
        }
    },
})