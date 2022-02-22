import React, {useEffect, useState, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Breadcrumb, Spin } from 'antd';
import { Row, Col } from 'react-bootstrap'
import EditableTable from '../../../components/EditableTable/EditableTable';
import { DataContext } from '../../../context/DataContext';
import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { Redirect } from 'react-router-dom';
import { db } from '../../../config/firebase/firebase';

export default function PersonalExpensesDetail() {
    const {t, i18n} = useTranslation("global");

    const { Content } = Layout;
    const { setValues, values } = useContext(DataContext)

    const [loading, setLoading] = useState(false)
    const [tables, setTables] = useState([])
    const [totalData, setTotalData] = useState([])
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [data4, setData4] = useState([])
    const [data5, setData5] = useState([])
    const [data6, setData6] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            const docRefs = [];

            // TODAS LAS TABLAS Y SU VALOR INICIAL AGREGANDO A LA DB SU KEY CUANDO SE LLAMAN //
            const finances = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances"));
            const financesDataSearched = finances.docs.map((user) => {
                const docRef = user.id
                docRefs.push(docRef)
                // AGREGANDO KEY A CADA TABLA //
                const changeData = async () => {
                    await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/${docRef}`), {
                        key: user.id
                    })
                }

                changeData()
                return user.data()
            })
                        
            const querySnapshot1 = await getDocs(collection(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/9TBYGFRDRJFwjxA1USPU/data`));
            const querySnapshot2 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/BvyanCMS8MKu8D5WcXyP/data"));
            const querySnapshot3 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/LGpRronvr4zYOElPgJeF/data"));
            const querySnapshot4 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/RQX6AtMfFk7yIEq4hXpg/data"));
            const querySnapshot5 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/hNoiZsmoq5vRgapQAsve/data"));
            const querySnapshot6 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/nWega9E8ey7sZiCT23sE/data"));

            const querySnapshotMap1 = querySnapshot1.docs.map((user) => user.data())
            const querySnapshotMap2 = querySnapshot2.docs.map((user) => user.data())
            const querySnapshotMap3 = querySnapshot3.docs.map((user) => user.data())
            const querySnapshotMap4 = querySnapshot4.docs.map((user) => user.data())
            const querySnapshotMap5 = querySnapshot5.docs.map((user) => user.data())
            const querySnapshotMap6 = querySnapshot6.docs.map((user) => user.data())
            
            setTables(financesDataSearched)
            setData1(querySnapshotMap1)
            setData2(querySnapshotMap2)
            setData3(querySnapshotMap3)
            setData4(querySnapshotMap4)
            setData5(querySnapshotMap5)
            setData6(querySnapshotMap6)

            console.log(tables)

            setLoading(false)
        }

        fetchData()
    }, [])

    // Data ingresada a las tablas //
    const dataIngresosPesos = data1.map(x => x)
    const dataIngresosDolares = data2.map(x => x)
    const dataGastosMensuales = data3.map(x => x)
    const dataAhorrosMensuales = data4.map(x => x)
    const dataDeudas = data5.map(x => x)
    const dataPrestamos = data6.map(x => x)

    const datos = [];
    const tablesInfo = [{
        name: "Ingresos Mensuales ($)",
        data: dataIngresosPesos
    },
    {
        name: "Ingresos Mensuales (u$d)",
        data: dataIngresosDolares
    },
    {
        name: "Gastos Mensuales",
        data: dataGastosMensuales
    },
    {
        name: "Ahorros Mensuales",
        data: dataAhorrosMensuales
    },
    {
        name: "Deudas",
        data: dataDeudas
    },
    {
        name: "Préstamos",
        data: dataPrestamos
    }]

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
    }

    if (loading === false ) {
        return (
            // userState === true ?
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Finances</Breadcrumb.Item>
                        <Breadcrumb.Item>Personal</Breadcrumb.Item>
                        <Breadcrumb.Item>Detail</Breadcrumb.Item>
                    </Breadcrumb>
                    <hr />
                    <div>
                        <h5>Tablas de Ingresos y Gastos</h5>
                        <hr style={{ marginBottom: 35 }} />
                        <Row>
                            {tablesInfo.map((table, key) => {
                                return <Col key={key} style={{ minWidth: 700 }}>
                                    <EditableTable title={table.name}
                                        tableSize="small"
                                        marginBottom="20"
                                        data={table.data}
                                        tables={tables}
                                        id={key}
                                    />
                                </Col>

                            })}
                        </Row>
                    </div>
                </Content>
                // : <Redirect to='./' />
        )
    } else {
        return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" tip="Loading..." />
        </div>
        )
    }
}