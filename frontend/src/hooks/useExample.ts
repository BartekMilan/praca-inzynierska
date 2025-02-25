import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, createQuery, createMutation, createQueryKey } from '../lib/api';

interface ExampleData {
    id: number;
    name: string;
}

// Funkcje API
const getExampleData = () => api.get<ExampleData[]>('/example').then(res => res.data);
const createExampleData = (data: Omit<ExampleData, 'id'>) => 
    api.post<ExampleData>('/example', data).then(res => res.data);

// Hook
export const useExample = () => {
    const queryClient = useQueryClient();
    const queryKey = createQueryKey('example');

    const query = useQuery(createQuery<ExampleData[]>(queryKey, getExampleData));

    const mutation = useMutation({
        ...createMutation(createExampleData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });

    return {
        data: query.data,
        isLoading: query.isLoading,
        error: query.error,
        createExample: mutation.mutate,
        isCreating: mutation.isPending,
    };
};