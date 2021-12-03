import React, {useEffect, useState, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Breadcrumb, Spin } from 'antd';
import { Row, Col } from 'react-bootstrap'
import EditableTable from '../../../components/EditableTable/EditableTable';
import { DataContext } from '../../../context/DataContext';
import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { Redirect } from 'react-router-dom';
import db from '../../../config/firebase/firebase';

export default function PersonalExpensesDetail() {
    const {t, i18n} = useTranslation("global");

    const { Content } = Layout;
    const { setValues, values, userState } = useContext(DataContext)

    // const [dataIngresosPesos, setDataIngresosPesos] = useState([])
    // const [dataIngresosDolares, setDataIngresosDolares] = useState([])
    // const [dataGastosMensuales, setDataGastosMensuales] = useState([])
    // const [dataAhorrosMensuales, setDataAhorrosMensuales] = useState([])
    // const [dataDeudas, setDataDeudas] = useState([])
    // const [dataPrestamos, setDataPrestamos] = useState([])
    const [loading, setLoading] = useState(false)
    const [tables, setTables] = useState([])
    const [totalData, setTotalData] = useState([])
    const [ready, setReady] = useState(false)
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [data4, setData4] = useState([])
    const [data5, setData5] = useState([])
    const [data6, setData6] = useState([])

    const docRefs = [];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

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
            setTables(financesDataSearched)

            const querySnapshot1 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/9TBYGFRDRJFwjxA1USPU/data"));
            const querySnapshotMap1 = querySnapshot1.docs.map((doc) => doc.data());
            const querySnapshot2 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/BvyanCMS8MKu8D5WcXyP/data"));
            const querySnapshotMap2 = querySnapshot2.docs.map((doc) => doc.data());
            const querySnapshot3 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/LGpRronvr4zYOElPgJeF/data"));
            const querySnapshotMap3 = querySnapshot3.docs.map((doc) => doc.data());
            const querySnapshot4 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/RQX6AtMfFk7yIEq4hXpg/data"));
            const querySnapshotMap4 = querySnapshot4.docs.map((doc) => doc.data());
            const querySnapshot5 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/hNoiZsmoq5vRgapQAsve/data"));
            const querySnapshotMap5 = querySnapshot5.docs.map((doc) => doc.data());
            const querySnapshot6 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/nWega9E8ey7sZiCT23sE/data"));
            const querySnapshotMap6 = querySnapshot6.docs.map((doc) => doc.data());
            setData1(querySnapshotMap1)
            setData2(querySnapshotMap2)
            setData3(querySnapshotMap3)
            setData4(querySnapshotMap4)
            setData5(querySnapshotMap5)
            setData6(querySnapshotMap6)
            // // LEYENDO DATA DE CADA TABLA //
            // const readDataTable = () => {
            //     docRefs.map((uid) => {
            //         const read = async () => {
            //             const table = await getDocs(collection(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/${uid}/data`));
            //             const tableDataSearched = table.docs.map((user) => {
            //                 setEndpointFinal(...endpointFinal, user.data())
            //                 const docRef = user.id
            //                 // AGREGANDO KEY A CADA TABLA //
            //                 const changeData = async () => {
            //                     await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/${uid}/data/${docRef}`), {
            //                         uid: uid
            //                     })
            //                 }

            //                 changeData()
            //                 return user.data()
            //             })
            //             setTotalData(...totalData, tableDataSearched)

            //         }
            //         read()
            //     })
            // }
            // readDataTable()

            // docRefs.map(uid => {
            //     const table = getDocs(collection(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/${uid}/data`));
            //     console.log(table)
            //     const tableDataSearched = table.docs.map(user => {
            //         return user.data() })
            //     setTables(tableDataSearched)
            // })
            
            // const tableDataSearched = table.docs.map((user) => {
            //     return user.data()
            // })
            // setTotalData(tableDataSearched)

            // setTotalData(...totalData, table)

            // // TODA LA DATA //
            // const financesData = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/"));
            // const financesDataSearched = finances.docs.map((user) => {
            //     return user.data()
            // })
            // console.log(financesDataSearched)

            // const mapeo = endpointFinal.map(x => {return x})
            // console.log(mapeo)
            
            setLoading(false)
        }

        fetchData()
    }, [])

    // console.log(tables)
    // console.log(totalData)
    // console.log(endpointFinal)
    // const filtrado = [endpointFinal].find(x => x.uid === "9TBYGFRDRJFwjxA1USPU")
    // console.log(tables)
    // console.log(totalData)
    console.log(totalData)
    console.log(data6)
    
    // Data ingresada a las tablas //
    const dataIngresosPesos = data1.map(x => x)
    const dataIngresosDolares = data2.map(x => x)
    const dataGastosMensuales = data3.map(x => x)
    const dataAhorrosMensuales = data4.map(x => x)
    const dataDeudas = data5.map(x => x)
    const dataPrestamos = data6.map(x => x)

    // const dataIngresosPesos = [endpointFinal].filter(x => x.key === "9TBYGFRDRJFwjxA1USPU");
    // const dataIngresosDolares = totalData.filter(x => x.key === "BvyanCMS8MKu8D5WcXyP")
    // const dataGastosMensuales = totalData.filter(x => x.key === "LGpRronvr4zYOElPgJeF")
    // const dataAhorrosMensuales = totalData.filter(x => x.key === "RQX6AtMfFk7yIEq4hXpg")
    // const dataDeudas = totalData.filter(x => x.key === "hNoiZsmoq5vRgapQAsve")
    // const dataPrestamos = totalData.filter(x => x.key === "nWega9E8ey7sZiCT23sE")

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

    if (loading === false && data6.length >= 1) {
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