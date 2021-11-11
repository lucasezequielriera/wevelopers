Funcionamiento:

----- i18n:
Está encapsulando a todos los componentes, colocado en index.js, indicando los lenguajes que se van a utilizar.
Luego está definida cada palabra y texto en "config/i18n".

* ¿CÓMO UTILIZAR?
Importar en cada archivo a utilizar:
 - import { useTranslation } from 'react-i18next';
 - const {t, i18n} = useTranslation("global");

* CAMBIAR IDIOMA DE TEXTO: onClick={() => i18n.changeLanguage("it")}
* LEER PALABRAS Y TEXTO: t("home.welcome_title")

----- Database y useContext:
Todo el contenido de Firebase como database se llama mediante useEffect en "context/DataContext.jsx".
Luego se distribuye toda la información con useContext.

* ¿CÓMO UTILIZAR?
Declarar variables y hacer función de fetch en DataContext.jsx:
 - const [users, setUsers] = useState([])

 - useEffect(() => {
        const fetchDataUsers = async () => {
            const datos = await getDocs(collection(db, "users"));
            const buscarData = datos.docs.map((user) => {
                return user.data()
            })
            setUsers(buscarData)
        }
        fetchDataUsers()
    }, [])
 - En <DataContext.Provider> indicar como prop "value" las variables declaradas:
    <DataContext.Provider value={{ users, setUsers }}> {children} <DataContext.Provider />

----- DB:

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
        const datos = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/tasks"));
        const buscarData = datos.docs.map((user) => {
            return user.data()
        })
        setTasks(buscarData)
    }
    fetchMyIssuesUser()
}, [])