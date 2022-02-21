import React, { useContext, useEffect, useState, Fragment } from 'react';
import logo from '../../assets/images/wevelopers_fondo_negro.png';
import { UserOutlined, BellOutlined, LockOutlined, DownOutlined } from '@ant-design/icons';
import { Badge, Modal, Alert, Button, Form, Input, Checkbox, Menu, Dropdown } from 'antd';
import { Nav, Navbar } from 'react-bootstrap';
import './styles.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import Login from '../Login/Login';
import { collection, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import db from '../../config/firebase/firebase';

export default function HorizontalMenu() {

    const { user, userState, setUserState } = useContext(DataContext);

    const [alert, setAlert] = useState(false);
    const [counterAlert, setCounterAlert] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('¿ Realmente quieres cerrar la sesión ?');

    useEffect(() => {
        (counterAlert === 0) ? setAlert(false) : setAlert(true);
    }, [counterAlert])

    const showModal = (buttonSelected) => {
        if (buttonSelected === 'alert') {
            setCounterAlert(0)
            setIsModalVisible(true)
        } else if (buttonSelected === 'login'){
            setVisible(true);
        }
    };

    const menu = (
        <Menu>
            <Menu.Item key="0" danger onClick={() => handleOk('login')}>Cerrar sesión</Menu.Item>
        </Menu>
    );

    const handleOk = (buttonSelected) => {
        console.log(user[0])

        if (buttonSelected === 'alert') {
            setIsModalVisible(false)
        } else if (buttonSelected === 'login') {
            setModalText('The modal will be closed after two seconds');
            setConfirmLoading(true);

            const updateStatus = async () => {
                // ACTUALIZAR STATUS DE USUARIO
                const updateStatusUser = await doc(db, "users", user[0].uid);
                await updateDoc(updateStatusUser, { status: false })
                localStorage.removeItem('currentUser')
            }

            updateStatus()

            // setTimeout(() => {
            //     setVisible(false);
            //     setConfirmLoading(false);
            // }, 2000);

            setUserState(false)
        }
    };

    const handleCancel = () => {setIsModalVisible(false); setVisible(false)}

    return (
        <Router>
            <Switch>
                <Navbar variant="dark" style={{ backgroundColor: 'rgb(0, 21, 40)' }}>
                    <div style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' ,maxWidth: '100%'}}>
                        <Navbar.Brand style={{ width: 180 }}>
                            <div style={{ color: 'white', textDecoration: 'none', textAlign: 'center' }}><img src={logo} alt="logo" style={{ width: 150, height: 50 }} /></div>
                        </Navbar.Brand>
                        { userState === true ?
                        <Nav>
                            <Nav.Link onClick={() => showModal('alert')}>
                                <Badge dot={alert} status="danger">
                                    <BellOutlined style={{ fontSize: 20, color: '#1890ff' }}/>
                                </Badge>
                            </Nav.Link>
                            <Modal title="My Alerts" visible={isModalVisible} onOk={() => handleOk('alert')} onCancel={handleCancel} width={'100%'} style={{ display: 'flex', justifyContent: 'end', top: 80 }}>
                                <Alert message="Informational Notes about other issue" type="info" showIcon style={{ padding: '5px 15px', marginBottom: 5 }} />
                                <Alert message="Informational Notes but nothing to see" type="info" showIcon style={{ padding: '5px 15px', marginBottom: 5 }} />
                                <Alert message="Informational Notes conquerors in the worlds" type="info" showIcon style={{ padding: '5px 15px', marginBottom: 5 }} />
                            </Modal>
                            <Nav.Link to="/User" style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                                <Link to="/User" style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                                    <UserOutlined style={{ fontSize: 20 }} />
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <p style={{ margin: 0, marginLeft: 5, color: 'rgb(255,100,73)' }}>{`Hi ${user[0].full_name}`}</p>
                                    </Dropdown>
                                </Link>
                            </Nav.Link>
                        </Nav> : <Login /> }
                    </div>
                </Navbar>
            </Switch>

            <Route exact path="/User"></Route>
            <Route exact path="/Alerts"></Route>
        </Router>
    )
}