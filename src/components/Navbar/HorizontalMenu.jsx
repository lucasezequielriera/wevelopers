import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/images/wevelopers_fondo_negro.png';
import { UserOutlined, BellOutlined, LockOutlined } from '@ant-design/icons';
import { Badge, Modal, Alert, Button, Form, Input, Checkbox } from 'antd';
import { Nav, Navbar } from 'react-bootstrap';
import './styles.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import Login from '../Login/Login';

export default function HorizontalMenu() {

    const { user, userState, setUserState } = useContext(DataContext);

    const [alert, setAlert] = useState(false);
    const [counterAlert, setCounterAlert] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    useEffect(() => {
        (counterAlert === 0) ? setAlert(false) : setAlert(true);
    }, [counterAlert])

    const changeSession = () => {
        setUserState(!userState)
        console.log(userState)
    }

    const showModal = (buttonSelected) => {
        if (buttonSelected === 'alert') {
            setCounterAlert(0)
            setIsModalVisible(true)
        } else if (buttonSelected === 'login'){
            setVisible(true);
        }
    };

    const handleOk = (buttonSelected) => {
        if (buttonSelected === 'alert') {
            setIsModalVisible(false)
        } else if (buttonSelected === 'login') {
            setModalText('The modal will be closed after two seconds');
            setConfirmLoading(true);
            setTimeout(() => {
                setVisible(false);
                setConfirmLoading(false);
            }, 2000);
        }
    };

    const handleCancel = () => {setIsModalVisible(false); setVisible(false)}

    return (
        <Router>
            <Switch>
                <Navbar variant="dark" style={{ backgroundColor: 'rgb(0, 21, 40)' }}>
                    <div style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' ,maxWidth: '100%'}}>
                        <Navbar.Brand style={{ width: 180 }}>
                            <div style={{ color: 'white', textDecoration: 'none', textAlign: 'center' }}><img src={logo} alt="logo" style={{ width: 150, height: 50 }} onClick={changeSession} /></div>
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
                            <Nav.Link>
                                <Link to="/User" style={{ display: 'flex', flexFlow: 'row nowrap' }} onClick={() => showModal('login')}>
                                    <UserOutlined style={{ fontSize: 20 }}/>
                                    <p style={{ margin: 0, marginLeft: 5, color: 'rgb(255,100,73)' }}>{`Hi ${user[0].fullName}`}</p>
                                </Link>
                            </Nav.Link>
                            <Modal
                                title='Nuevo modal'
                                visible={visible}
                                onOk={() => handleOk('login')}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                            >
                                {modalText}
                            </Modal>
                        </Nav> : <Login /> }
                    </div>
                </Navbar>
            </Switch>

            <Route exact path="/User"></Route>
            <Route exact path="/Alerts"></Route>
        </Router>
    )

}