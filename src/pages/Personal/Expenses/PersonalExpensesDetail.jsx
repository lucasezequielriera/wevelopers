import React, {useEffect, useState} from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Row, Col } from 'react-bootstrap'
import EditableTable from '../../../components/EditableTable/EditableTable';

export default function PersonalExpensesDetail() {

    const { Content } = Layout;

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
            key: '3',
            title: 'Monitor',
            date: '11/09/21',
            payments: '3 of 3',
            amount: 8500,
            paid: 'No',
            edit: false,
        },
        {
            id: 3,
            key: '3',
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

    const suma = dataIngresosPesos.reduce((a, b) => a + b);
    console.log(suma)

    // useEffect(() => {
    //     // dataIngresosPesos.map((dato) => {
    //     //     const totalIngresosPesos = dato.amount
    //     //     setIngresosPesos(totalIngresosPesos) })
    //     // dataIngresosDolares.map((dato) => {
    //     //     const totalIngresosDolares = dato.amount
    //     //     setIngresosDolares(totalIngresosDolares) })
    //     // dataGastosMensuales.map((dato) => {
    //     //     const totalGastosMensuales = dato.amount
    //     //     setGastosMensuales(totalGastosMensuales) })
    //     // dataAhorrosMensuales.map((dato) => {
    //     //     const totalAhorrosMensuales = dato.amount
    //     //     setAhorrosMensuales(totalAhorrosMensuales) })
    //     // dataDeudas.map((dato) => {
    //     //     const totalDeudas = dato.amount
    //     //     setDeudas(totalDeudas) })
    //     // dataPrestamos.map((dato) => {
    //     //     const totalPrestamos = dato.amount
    //     //     setPrestamos(totalPrestamos) })
    // })

    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Personal</Breadcrumb.Item>
                <Breadcrumb.Item>My Expenses</Breadcrumb.Item>
                <Breadcrumb.Item>Detail</Breadcrumb.Item>
            </Breadcrumb>
            <hr />
            <div>
                <h5>Percentage of Income Spent</h5>
                <hr style={{ marginBottom: 35 }} />
                <Row>
                    <Col className="gutter-row" span={6} lg>
                        <EditableTable title="Ingresos Mensuales ($)" tableSize="small" marginBottom="20" data={dataIngresosPesos} />
                    </Col>
                    <Col className="gutter-row" span={6} lg>
                        <EditableTable title="Ingresos Mensuales (u$d)" tableSize="small" marginBottom="20" data={dataIngresosDolares} />
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={6} lg>
                        <EditableTable title="Gastos Mensuales" tableSize="small" marginBottom="20" data={dataGastosMensuales} />
                    </Col>
                    <Col className="gutter-row" span={6} lg>
                        <EditableTable title="Ahorros Mensuales" tableSize="small" marginBottom="20" data={dataAhorrosMensuales} />
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={6} lg>
                        <EditableTable title="Deudas" tableSize="small" marginBottom="20" data={dataDeudas} />
                    </Col>
                    <Col className="gutter-row" span={6} lg>
                        <EditableTable title="Préstamos" tableSize="small" marginBottom="20" data={dataPrestamos} />
                    </Col>
                </Row>
            </div>
        </Content>
    )
}