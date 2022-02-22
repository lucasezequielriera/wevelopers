import React, { useContext, useState, useEffect } from 'react';
import { Layout, Breadcrumb, Avatar, Input, Button, Tooltip, Spin, notification, Space, Upload, Image, message } from 'antd';
import { UserOutlined, InfoCircleOutlined, EyeInvisibleOutlined, EyeTwoTone, KeyOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DataContext } from '../../context/DataContext';
import { Redirect } from 'react-router-dom';
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firebase/firebase';
import { Formik, Form } from 'formik';
import { getStorage, ref, uploadBytes } from "firebase/storage";


export default function Settings() {

    const { Content } = Layout;

    const { userState, user, setUser } = useContext(DataContext)
    const storage = getStorage();

    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [imagen, setImagen] = useState()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            // TODOS LOS USUARIOS //
            const userData = await getDocs(collection(db, "users"));
            const userSelect = await userData.docs.map((user) => {
                return user.data()
            })

            // USUARIO LOGUEADO
            const currentUser = userSelect.filter( usr => usr.username === JSON.parse(localStorage.getItem('currentUser'))[0].username && usr.password === JSON.parse(localStorage.getItem('currentUser'))[0].password )

            setUser(currentUser)

            setLoading(false)
            setReload(0)
        }

        fetchData()
    }, [reload])

    const openNotificationWithIcon = type => {
        notification[type]({
        message: 'Successful change',
        description: 'Podrás visualizar automáticamente los cambios.',
        });
    };

    const updateStatus = async (values) => {
        setLoading(true)

        // ACTUALIZAR STATUS DE USUARIO
        const updateStatusUser = await doc(db, "users", user[0].uid);
        await updateDoc(updateStatusUser, values)

        // TODA LA DATA GLOBAL DEL USUARIO //
        const globalData = await getDocs(collection(db, "users"));
        const globalDataSearched = globalData.docs.map((user) => {
            return user.data()
        })

        setUser(globalDataSearched.filter(x => x.uid === user[0].uid))

        setLoading(false)
        openNotificationWithIcon('success')
    }

    //OBTENIENDO LA IMAGEN
    const changeImagen = e => {
        setLoading(true)
        setReload(true)

        const imagen = e.target.files[0]

        uploadImage(imagen)
    }

    //FUNCION PARA GUARDAR LA IMAGEN EN FIREBASE
    const uploadImage = async (imagen) => {
        const fileRef = ref(storage, `photosProfile/${imagen.name}`); // nombre del archivo

        // 'file' comes from the Blob or File API
        uploadBytes(fileRef, imagen)
        .then( async snapshot => {
            console.log('Uploaded a blob or file!');
            // ACTUALIZAR FOTO DE USUARIO EN FIREBASE
            const updateStatusUser = await doc(db, "users", user[0].uid);
            await updateDoc(updateStatusUser, { photo: `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGEBUCKET}/o/photosProfile%2F${snapshot.metadata.name}?alt=media&token=d3e7dfcb-5249-49f5-b58c-fd0d797a6e4a` })

            user[0].photo = `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGEBUCKET}/o/photosProfile%2F${snapshot.metadata.name}?alt=media&token=d3e7dfcb-5249-49f5-b58c-fd0d797a6e4a`

            setImagen(snapshot.metadata.name)
            setReload(reload+1)
        })
        setLoading(false)
        setReload(false)
    };

    const initialValues = {
        full_name: user[0].full_name,
        age: user[0].age,
        country: user[0].country,
        username: user[0].username,
        password: user[0].password
    }

    if (loading === false && user.length >= 1 && !reload) {
    return (
        userState === true ?
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Settings</Breadcrumb.Item>
                </Breadcrumb>

                <Formik initialValues={initialValues}
                onSubmit={values => updateStatus(values)}
                >
                    {({ values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting }) => (

                        <div style={{ padding: 24, minHeight: 200, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center' }}>
                            <Form onFinish={handleSubmit} style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                {/* User Image */}
                                <input type="file" name="imagen" onChange={changeImagen} style={{ width: 130, height: 130, position: 'absolute', top: 180, zIndex: 1, backgroundColor: 'transparent', contentVisibility: 'hidden' }} />
                                <Avatar size={130} src={user[0].photo} icon={!imagen ? <UserOutlined /> : ""} />
                                {/* Fully Name */}
                                <Input type="text" id="full_name" name="full_name" style={{ width: 350, marginTop: 20 }} onChange={(e) => handleChange(e)} placeholder="Enter your full name" defaultValue={values.full_name} />
                                {/* Age */}
                                <Input type="number" id="age" name="age" style={{ width: 350, marginTop: 10 }} onChange={(e) => handleChange(e)} placeholder="Enter your age" defaultValue={values.age} />
                                {/* City */}
                                <Input type="text" id="country" name="country" style={{ width: 350, marginTop: 10 }} onChange={(e) => handleChange(e)} placeholder="Enter your city" defaultValue={values.country} />
                                {/* User */}
                                <Input type="text" id="username" name="username" style={{ width: 350, marginTop: 10 }} onChange={(e) => handleChange(e)} placeholder="Enter your username" prefix={ <UserOutlined className="site-form-item-icon" style={{ color: 'rgb(0,142,250)' }} /> }
                                suffix={
                                    <Tooltip title="name@email.com or username">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>}
                                defaultValue={values.username} />
                                {/* Password */}
                                <Input.Password  type="text" id="password" name="password" style={{ width: 350, marginTop: 10, color: 'rgb(0,142,250)' }} onChange={(e) => handleChange(e)} placeholder="Enter your password" prefix={<KeyOutlined className="site-form-item-icon" />} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} suffix={
                                    <Tooltip title="Your password">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                    }
                                defaultValue={values.password} />
                                {/* Submit Button */}
                                <Button type="primary" htmlType="submit" style={{ marginTop: 10, width: 150 }}
                                >
                                    Confirm details
                                </Button>
                            </Form>
                        </div>

                    )}
                </Formik>

            </Content> :
            <Redirect to='./' />
    )
    } else {
        return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" tip="Loading..." />
        </div>
    }
}