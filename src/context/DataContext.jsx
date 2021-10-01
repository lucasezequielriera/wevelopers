import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const initialData = [
    { description: 'Ingresos',   value: 0 },
    { description: 'Gastos',     value: 0 },
    { description: 'Deudas',     value: 0 },
    { description: 'Préstamos',  value: 0 },
    { description: 'Ahorro $',   value: 0 },
    { description: 'Ahorro u$d', value: 0 },
    { description: 'Efectivo',   value: 0 },
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