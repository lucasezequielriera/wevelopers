import React, { useEffect, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Breadcrumb, Table, Tag, Spin, Alert } from 'antd';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined, AppstoreAddOutlined, LoadingOutlined, RiseOutlined, MinusOutlined, FallOutlined, WarningOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/charts';
import { Row, Col } from 'react-bootstrap'
import { DataContext } from '../../context/DataContext';
import { Redirect } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import db from '../../config/firebase/firebase';

export default function Dashboard() {
    const {t, i18n} = useTranslation("global");

    const { Content } = Layout;
    const { userState } = useContext(DataContext)

    const [users, setUsers] = useState([])
    const [globalDataUser, setGlobalDataUser] = useState([])
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)

    // // TODOS LOS USUARIOS //
    // useEffect(() => {
    //     const fetchDataUsers = async () => {
    //         const datos = await getDocs(collection(db, "users"));
    //         const buscarData = datos.docs.map((user) => {
    //             return user.data()
    //         })
    //         setUsers(buscarData)
    //     }
    //     fetchDataUsers()
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            // TODA LA DATA GLOBAL DEL USUARIO //
            const globalData = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/globalData"));
            const globalDataSearched = globalData.docs.map((user) => {
                return user.data()
            })
            setGlobalDataUser(globalDataSearched)

            // TODAS LAS TAREAS DEL USUARIO //
            const tasksData = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/tasks"));
            const tasksDataSearched = tasksData.docs.map((user) => {
                return user.data()
            })
            setTasks(tasksDataSearched)
            
            setLoading(false)
        }

        fetchData()
    }, [])

    // useEffect(() => {
    //     const fetchMyTasksUser = async () => {
    //         const datos = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/tasks"));
    //         const buscarData = datos.docs.map((user) => {
    //             return user.data()
    //         })
            
    //     }
    //     fetchMyTasksUser()
    // }, [])

    const config = {
        appendPadding: 10,
        data: globalDataUser,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
          name: 'inner',
          offset: '-50%',
          content: '',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            content: '64%',
          },
        },
    };

    const columns = [
    {
        title: 'Priority',
        dataIndex: 'priority',
        width: '7%',
        render: priorities => {
            if (priorities === 'High') {
                return <Tag icon={<RiseOutlined />} color="red" key={priorities}>
                    {priorities}
                </Tag>
            } else if (priorities === 'Medium') {
                return <Tag icon={<MinusOutlined />} color="yellow" key={priorities}>
                    {priorities}
                </Tag>
            } else if (priorities === 'Low') {
                return <Tag icon={<FallOutlined />} color="cyan" key={priorities}>
                    {priorities}
                </Tag>
            } else {
                return <Tag icon={<WarningOutlined />} color="purple" key={priorities}>
                {priorities}
            </Tag>
            }
        },
    },
    {
        title: 'State',
        dataIndex: 'state',
        width: '7%',
        render: tag => {
            if (tag === 'Done') {
                return <Tag icon={<CheckCircleOutlined />} color="green" key={tag}>
                    {tag}
                        </Tag>
            } else if (tag === 'Doing') {
                return <Tag icon={<SyncOutlined spin />} color="blue" key={tag}>
                    {tag}
                        </Tag>
            } else if (tag === 'To do') {
                return <Tag icon={<ClockCircleOutlined />} color="default" key={tag}>
                    {tag}
                        </Tag>
            } else if (tag !== 'Done' && tag !== 'Doing' && tag !== 'To do') {
                return <Tag icon={<LoadingOutlined />} color="default" key={tag}>
                    {tag}
                        </Tag>
            }
        },
    },
    {
        title: 'Description',
        dataIndex: 'description',
        width: '75%',
    }
    ];

    if (loading === false && globalDataUser.length >= 1) {
        return (
            userState === true ?
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <hr />
                <div style={{ display: 'flex', flexFlow: 'row' }}>
                    <div style={{ width: '50%', padding: 24, minHeight: 360 }}>
                        <h5>Percentage of Income Spent (November)</h5>
                        <hr style={{ marginBottom: 35 }} />
                        <Pie {...config} />
                    </div>
                    <div style={{ width: '50%', padding: 24, minHeight: 360 }}>
                        <h5>Account Summary (November)</h5>
                        <hr style={{ marginBottom: 35 }} />
                        <Row>
                            <Col span={6} style={{ minWidth: 200 }}>
                                <h6>Ingresos totales</h6><hr />
                                <h2 style={{ color: 'rgb(94, 149, 244)' }}>${globalDataUser[1].value}</h2>
                            </Col>
                            <Col span={6} style={{ minWidth: 200 }}>
                                <h6>Gastos totales</h6><hr />
                                <h2 style={{ color: 'rgb(94, 149, 244)' }}>${globalDataUser[0].value}</h2>
                            </Col>
                            <Col span={6} style={{ minWidth: 200 }}>
                                <h6>Ahorros totales ($)</h6><hr />
                                <h2 style={{ color: 'rgb(94, 149, 244)' }}>${globalDataUser[3].value}</h2>
                            </Col>
                            <Col span={6} style={{ minWidth: 200 }}>
                                <h6>Ahorros totales (u$d)</h6><hr />
                                <h2 style={{ color: 'rgb(94, 149, 244)' }}>${globalDataUser[4].value}</h2>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'center' }}>
                    <div style={{ width: '100%', padding: 24, minHeight: 360 }}>
                        <h5>Pending Tasks</h5>
                        <hr style={{ marginBottom: 35 }} />
                        <Table dataSource={tasks} columns={columns} />
                    </div>
                </div>
            </Content> :
            <Redirect to='./' />
        )
    } else {
        return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" tip="Loading..." />
        </div>
        )
    }
}