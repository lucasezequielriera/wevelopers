import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const initialData = [
    { description: 'Ingresos', value: 150000 },
    { description: 'Gastos', value: 70000 },
    { description: 'Deudas', value: 5000 },
    { description: 'Préstamos', value: 0 },
    { description: 'Ahorro $', value: 20000 },
    { description: 'Ahorro u$d', value: (1200 * 181) },
    { description: 'Efectivo', value: 5000 },
];

export const DataProvider = ({ children }) => {

    const [data, setData] = useState(initialData);

    return(
        <DataContext.Provider value={{
            data, setData
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider