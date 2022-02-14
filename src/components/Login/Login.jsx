import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { DataContext } from '../../context/DataContext';
import { collection, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import db from '../../config/firebase/firebase';

export default function Login() {

    const { user, setUser, userState, setUserState } = useContext(DataContext);

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [userSelected, setUserSelected] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            // TODOS LOS USUARIOS //
            const userData = await getDocs(collection(db, "users"));
            const userSelect = await userData.docs.map((user) => {
                return user.data()
            })
            console.log(userSelect)
            setUserSelected(userSelect)
            
            setLoading(false)
        }

        fetchData()
    }, [])

    const onFinish = async (values) => {
        // USUARIO LOGUEADO
        const user = await userSelected.filter( usr => usr.username === values.username && usr.password === values.password )
        if (user.length >= 1) {
            console.log(user)
            setUser(user)
            setUserState(true)
        }

        // ACTUALIZAR STATUS DE USUARIO
        const updateStatusUser = await doc(db, "users", user[0].uid);
        await updateDoc(updateStatusUser, { status: true })
    };

    return (
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
            <Form.Item
                name="username"
                rules={[
                {
                    required: false,
                },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                {
                    required: false,
                },
                ]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>
            <Form.Item shouldUpdate>
                {() => (
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={false}
                    style={{ backgroundColor: 'rgb(255,100,73)', borderColor: 'rgb(255,100,73)' }}
                >
                    Log in
                </Button>
                )}
            </Form.Item>
        </Form>
    );

}