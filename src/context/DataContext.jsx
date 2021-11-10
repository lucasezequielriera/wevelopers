import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import db from '../config/firebase/firebase'

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
    const [users, setUsers] = useState([])
    const [globalDataUser, setGlobalDataUser] = useState([])
    const [myIssues, setMyIssues] = useState([])

    // TODOS LOS USUARIOS //
    useEffect(() => {
        const fetchDataUsers = async () => {
            const datos = await getDocs(collection(db, "users"));
            const buscarData = datos.docs.map((user) => {
                return user.data()
            })
            setUsers(buscarData)
        }
        fetchDataUsers()
    }, [])

    // TODA LA DATA GLOBAL DEL USUARIO //
    useEffect(() => {
        const fetchGlobalDataUser = async () => {
            const datos = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/globalData"));
            const buscarData = datos.docs.map((user) => {
                return user.data()
            })
            setGlobalDataUser(buscarData)
        }
        fetchGlobalDataUser()
    }, [])

    // TODAS LAS TAREAS DEL USUARIO //
    useEffect(() => {
        const fetchMyIssuesUser = async () => {
            const datos = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/myIssues"));
            const buscarData = datos.docs.map((user) => {
                return user.data()
            })
            setMyIssues(buscarData)
        }
        fetchMyIssuesUser()
    }, [])

    return(
        <DataContext.Provider value={{
            users, setUsers, globalDataUser, setGlobalDataUser, myIssues, setMyIssues, user, setUser, userState, setUserState, data, setData, issues, setIssues, values, setValues
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider