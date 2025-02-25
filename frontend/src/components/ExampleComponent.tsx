import { useExample } from '../hooks/useExample';

export const ExampleComponent = () => {
    const { data, isLoading, error, createExample, isCreating } = useExample();

    if (isLoading) return <div>Ładowanie...</div>;
    if (error) return <div>Błąd: {error.message}</div>;

    return (
        <div>
            <h2>Przykładowe dane:</h2>
            <ul>
                {data?.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <button 
                onClick={() => createExample({ name: 'Nowy przykład' })}
                disabled={isCreating}
            >
                {isCreating ? 'Dodawanie...' : 'Dodaj nowy'}
            </button>
        </div>
    );
};