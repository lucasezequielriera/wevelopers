import React, { useContext, useState, useEffect } from 'react';
import { Layout, Breadcrumb, Avatar, Input, Button, Tooltip, Spin, notification, Space, Upload, Image } from 'antd';
import { UserOutlined, InfoCircleOutlined, EyeInvisibleOutlined, EyeTwoTone, KeyOutlined } from '@ant-design/icons';
import { DataContext } from '../../context/DataContext';
import { Redirect } from 'react-router-dom';
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from '../../config/firebase/firebase';
import { Formik, Form } from 'formik';
import ImgCrop from 'antd-img-crop';


export default function Settings() {

    const { Content } = Layout;

    const { userState, user, setUser } = useContext(DataContext)

    const [buttonState, setButtonState] = useState(true)
    const [loading, setLoading] = useState(false)
    const [fileList, setFileList] = useState([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    
    const onPreview = async file => {
    let src = file.url;
    if (!src) {
        src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
        });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
    };

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
        setButtonState(true)

        // TODA LA DATA GLOBAL DEL USUARIO //
        const globalData = await getDocs(collection(db, "users"));
        const globalDataSearched = globalData.docs.map((user) => {
            return user.data()
        })

        setUser(globalDataSearched.filter(x => x.uid === user[0].uid))

        setLoading(false)
        openNotificationWithIcon('success')
    }

    const initialValues = {
        full_name: user[0].full_name,
        age: user[0].age,
        country: user[0].country,
        username: user[0].username,
        password: user[0].password
    }

    if (loading === false && user.length >= 1) {
    return (
        userState === true ?
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Settings</Breadcrumb.Item>
                </Breadcrumb>

                <Formik initialValues={initialValues}
                onChange={e => console.log(e)}
                onSubmit={values => updateStatus(values) }
                >
                    {({ values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting }) => (

                        <div style={{ padding: 24, minHeight: 200, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center' }}>
                            <Form onFinish={handleSubmit} style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                {/* User Image */}
                                <ImgCrop rotate>
                                    <Upload
                                    action="https://instagram.faep14-2.fna.fbcdn.net/v/t51.2885-19/s320x320/271108729_819065048945141_8191994098723336004_n.jpg?_nc_ht=instagram.faep14-2.fna.fbcdn.net&_nc_cat=105&_nc_ohc=oFYCYqZXcfUAX8cAuIO&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_x-5hKElbpmq8ncq7_kou40B5sATogp7cRqHNuBExudw&oe=6217ABF9&_nc_sid=7bff83"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                    >
                                    {fileList.length < 1 && '+ Upload'}
                                    </Upload>
                                </ImgCrop>
                                <Avatar size={130} icon={<UserOutlined />} src="https://instagram.faep14-2.fna.fbcdn.net/v/t51.2885-19/s320x320/271108729_819065048945141_8191994098723336004_n.jpg?_nc_ht=instagram.faep14-2.fna.fbcdn.net&_nc_cat=105&_nc_ohc=oFYCYqZXcfUAX8cAuIO&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_x-5hKElbpmq8ncq7_kou40B5sATogp7cRqHNuBExudw&oe=6217ABF9&_nc_sid=7bff83" style={{ backgroundColor: '#cdcdcd' }} />
                                <Avatar
                                    src={
                                        <Image
                                        src="https://drive.google.com/file/d/1I4tPuDAnYMzNrgdeMQJJ7UJ3dJZxhKvp/view?usp=sharing"
                                        style={{
                                            width: 32,
                                        }}
                                        />
                                    }
                                />
                                {/* Fully Name */}
                                <Input type="text" id="full_name" name="full_name" style={{ width: 350, marginTop: 20 }} onChange={(e) => handleChange(e)} placeholder="Enter your full name" defaultValue={values.full_name} />
                                {/* Age */}
                                <Input type="number" id="age" name="age" style={{ width: 350, marginTop: 10 }} onChange={(e) => handleChange(e)} placeholder="Enter your age" defaultValue={values.age} />
                                {/* City */}
                                <Input  type="text" id="country" name="country" style={{ width: 350, marginTop: 10 }} onChange={(e) => handleChange(e)} placeholder="Enter your city" defaultValue={values.country} />
                                {/* User */}
                                <Input  type="text" id="username" name="username" style={{ width: 350, marginTop: 10 }} onChange={(e) => handleChange(e)} placeholder="Enter your username" prefix={ <UserOutlined className="site-form-item-icon" style={{ color: 'rgb(0,142,250)' }} /> }
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