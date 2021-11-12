import React, {useEffect, useState, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Breadcrumb, Spin } from 'antd';
import { Row, Col } from 'react-bootstrap'
import EditableTable from '../../../components/EditableTable/EditableTable';
import { DataContext } from '../../../context/DataContext';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import db from '../../../config/firebase/firebase';

export default function PersonalExpensesDetail() {
    const {t, i18n} = useTranslation("global");

    const { Content } = Layout;
    const { setValues, values } = useContext(DataContext)

    // const [dataIngresosPesos, setDataIngresosPesos] = useState([])
    // const [dataIngresosDolares, setDataIngresosDolares] = useState([])
    // const [dataGastosMensuales, setDataGastosMensuales] = useState([])
    // const [dataAhorrosMensuales, setDataAhorrosMensuales] = useState([])
    // const [dataDeudas, setDataDeudas] = useState([])
    // const [dataPrestamos, setDataPrestamos] = useState([])
    const [loading, setLoading] = useState(false)
    const [tables, setTables] = useState([])
    const [totalData, setTotalData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            // TODAS LAS TABLAS Y SU VALOR INICIAL AGREGANDO A LA DB SU KEY CUANDO SE LLAMAN //
            const finances = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances"));
            const financesDataSearched = finances.docs.map((user) => {
                const docRef = user.id
                // AGREGANDO KEY A CADA TABLA //
                const changeData = async () => {
                    await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/${docRef}`), {
                        key: user.id
                    })
                }
                // LEYENDO DATA DE CADA TABLA //
                const readDataTable = async () => {
                    const table = await getDocs(collection(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/${docRef}/data`))
                    table.data();
                    setTotalData(...totalData, table)
                }


                ///// TENGO QUE MAPEAR EL READDATATABLE COMO EL FINANCES QUE ESTA ARRIBA //

                changeData()
                readDataTable()
                return user.data()
            })

            setTables(financesDataSearched)

            // // TODA LA DATA //
            // const financesData = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/"));
            // const financesDataSearched = finances.docs.map((user) => {
            //     return user.data()
            // })
            // console.log(financesDataSearched)
            
            setLoading(false)
        }

        fetchData()
    }, [])

    console.log(tables)
    console.log(totalData)
    
    // Data ingresada a las tablas //
    const dataIngresosPesos = [
        {
            id: 1,
            key: '1',
            title: 'Terrand',
            date: '01/09/21',
            payments: '-',
            amount: 80000,
            paid: 'No',
            edit: false,
        },
        {
            id: 2,
            key: '2',
            title: 'Agrowd',
            date: '10/09/21',
            payments: '-',
            amount: (400 * 182),
            paid: 'No',
            edit: false,
        },
        {
            id: 3,
            key: '3',
            title: 'Páginas web',
            date: '15/09/21',
            payments: '-',
            amount: 150000,
            paid: 'No',
            edit: false,
        }
    ];
    const dataIngresosDolares = [
        {
            id: 1,
            key: '1',
            title: 'Agrowd',
            date: '01/09/21',
            payments: '1 of 3',
            amount: 500,
            paid: 'No',
            edit: false,
        },
        {
            id: 2,
            key: '2',
            title: 'Ahorros mes pasado',
            date: '01/09/21',
            payments: '1 of 3',
            amount: 1300,
            paid: 'No',
            edit: false,
        },
    ];
    const dataGastosMensuales = [
        {
            id: 1,
            key: '1',
            title: 'Alquiler',
            date: '01/09/21',
            payments: '-',
            amount: 13500,
            paid: 'No',
            edit: false,
        },
        {
            id: 2,
            key: '2',
            title: 'Cuotas Zara',
            date: '10/08/21',
            payments: '2 of 3',
            amount: 7500,
            paid: 'No',
            edit: false,
        },
        {
            id: 3,
            key: '3',
            title: 'Silla Gamer',
            date: '15/09/21',
            payments: '3 of 3',
            amount: 4500,
            paid: 'No',
            edit: false,
        },
        {
            id: 3,
            key: '4',
            title: 'Monitor',
            date: '11/09/21',
            payments: '3 of 3',
            amount: 8500,
            paid: 'No',
            edit: false,
        },
        {
            id: 3,
            key: '5',
            title: 'Celular Samsung',
            date: '05/09/21',
            payments: '3 of 3',
            amount: 5000,
            paid: 'No',
            edit: false,
        }
    ];
    const dataAhorrosMensuales = [
        {
            id: 1,
            key: '1',
            title: 'Agrowd',
            date: '10/09/21',
            payments: '-',
            amount: 10000,
            paid: 'No',
            edit: false,
        },
        {
            id: 2,
            key: '2',
            title: 'Aina',
            date: '20/09/21',
            payments: '-',
            amount: 11600,
            paid: 'No',
            edit: false,
        },
    ];
    const dataDeudas = [];

    const dataPrestamos = [
        {
            id: 1,
            key: '1',
            title: 'Aina',
            date: '25/09/21',
            payments: '-',
            amount: 8400,
            paid: 'No',
            edit: false,
        }
    ];

    const datos = [];
    
    const response = (e) => {
        datos.push(...datos, e)
        suprimir();
    }

    const suprimir = () => {
        const numeros = datos;
        const unicos = numeros.filter((valor, indice) => {
            return numeros.indexOf(valor) === indice;
        });
        setValues([...values, unicos])
        console.log(unicos)
    }

    if (loading === loading) {
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Finances</Breadcrumb.Item>
                    <Breadcrumb.Item>Personal</Breadcrumb.Item>
                    <Breadcrumb.Item>Detail</Breadcrumb.Item>
                </Breadcrumb>
                <hr />
                <div>
                    <h5>Percentage of Income Spent</h5>
                    <hr style={{ marginBottom: 35 }} />
                    <Row>
                        <Col className="gutter-row" span={6} lg>
                            <EditableTable title="Ingresos Mensuales ($)" tableSize="small" marginBottom="20" data={dataIngresosPesos} response={(e) => response({name: 'Ingresos', value: e})} />
                        </Col>
                        <Col className="gutter-row" span={6} lg>
                            <EditableTable title="Ingresos Mensuales (u$d)" tableSize="small" marginBottom="20" data={dataIngresosDolares} response={(e) => response({name: 'Ahorro u$d', value: e})}  />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="gutter-row" span={6} lg>
                            <EditableTable title="Gastos Mensuales" tableSize="small" marginBottom="20" data={dataGastosMensuales} response={(e) => response({name: 'Gastos', value: e})} />
                        </Col>
                        <Col className="gutter-row" span={6} lg>
                            <EditableTable title="Ahorros Mensuales" tableSize="small" marginBottom="20" data={dataAhorrosMensuales} response={(e) => response({name: 'Ahorro $', value: e})} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="gutter-row" span={6} lg>
                            <EditableTable title="Deudas" tableSize="small" marginBottom="20" data={dataDeudas} response={(e) => response({name: 'Deudas', value: e})} />
                        </Col>
                        <Col className="gutter-row" span={6} lg>
                            <EditableTable title="Préstamos" tableSize="small" marginBottom="20" data={dataPrestamos} response={(e) => response({name: 'Préstamos', value: e})} />
                        </Col>
                    </Row>
                </div>
            </Content>
        )
    } else {
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" tip="Loading..." />
        </div>
    }
}