import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const userData = [
    { fullName: 'Lucas Riera', age: 25, city: 'Retiro, Buenos Aires, Argentina', username: 'lucasezequielriera@hotmail.com', password: 123}
]

const estadoInicial = false;


const initialData = [
    { description: 'Ingresos',   value: 302800 },
    { description: 'Gastos',     value: 39000 },
    { description: 'Deudas',     value: 0 },
    { description: 'Préstamos',  value: 10000 },
    { description: 'Ahorro $',   value: 21600 },
    { description: 'Ahorro u$d', value: (1800 * 180) },
    // { description: 'Efectivo',   value: 4000 },
];

const totalValues = [];

const totalIssues = 0;

export const DataProvider = ({ children }) => {

    const [user, setUser] = useState(userData);
    const [userState, setUserState] = useState(estadoInicial)
    const [data, setData] = useState(initialData);
    const [issues, setIssues] = useState(totalIssues)
    const [values, setValues] = useState(totalValues)

    return(
        <DataContext.Provider value={{
            user, setUser, userState, setUserState, data, setData, issues, setIssues, values, setValues
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider