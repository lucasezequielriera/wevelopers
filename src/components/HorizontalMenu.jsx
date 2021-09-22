import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import { Badge, Modal, Alert } from 'antd';
import { Nav, Navbar } from 'react-bootstrap';
import './styles.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function HorizontalMenu() {

    const [alert, setAlert] = useState(false)
    const [counterAlert, setCounterAlert] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        (counterAlert === 0) ? setAlert(false) : setAlert(true);
    }, [counterAlert])


    const showModal = () => {
        setCounterAlert(0)
        setIsModalVisible(true)
    };

    const handleOk = () => setIsModalVisible(false);

    const handleCancel = () => setIsModalVisible(false);

    return (
        <Router>
            <Switch>

                <Navbar variant="dark" style={{ backgroundColor: 'rgb(0, 21, 40)' }}>
                    <div style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' ,maxWidth: '100%'}}>
                        <Navbar.Brand style={{ width: 158 }}>
                            <div style={{ color: 'white', textDecoration: 'none', textAlign: 'center' }}><img src={logo} alt="logo" style={{ width: 50, height: 50 }}/></div>
                        </Navbar.Brand>
                        <Nav>
                            <Nav.Link onClick={showModal}>
                                <Badge dot={alert} status="danger">
                                    <BellOutlined style={{ fontSize: 20, color: '#1890ff' }}/>
                                </Badge>
                            </Nav.Link>
                            <Modal title="My Alerts" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={'100%'} style={{ display: 'flex', justifyContent: 'end', top: 80 }}>
                                <Alert message="Informational Notes about other issue" type="info" showIcon style={{ padding: '5px 15px', marginBottom: 5 }} />
                                <Alert message="Informational Notes but nothing to see" type="info" showIcon style={{ padding: '5px 15px', marginBottom: 5 }} />
                                <Alert message="Informational Notes conquerors in the worlds" type="info" showIcon style={{ padding: '5px 15px', marginBottom: 5 }} />
                            </Modal>
                            <Nav.Link>
                                <Link to="/User">
                                    <UserOutlined style={{ fontSize: 20 }}/>
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </div>
                </Navbar>


            </Switch>

            <Route exact path="/User"></Route>
            <Route exact path="/Alerts"></Route>
        </Router>
    )
}