import React, { useContext, useState, useEffect } from 'react';
import { Layout, Breadcrumb, Avatar, Input, Button, Tooltip, Form } from 'antd';
import { UserOutlined, InfoCircleOutlined, EyeInvisibleOutlined, EyeTwoTone, KeyOutlined } from '@ant-design/icons';
import { DataContext } from '../../context/DataContext';
import { Redirect } from 'react-router-dom';


export default function Settings() {

    const { Content } = Layout;

    const { userState, setUserState, user, setUser } = useContext(DataContext)

    const [buttonState, setButtonState] = useState(true)

    useEffect(() => {
        const currentUser = user;
    })

    const [fullNameEdited, setFullNameEdited] = useState('')
    const [ageEdited, setAgeEdited] = useState('')
    const [cityEdited, setCityEdited] = useState('')
    const [usernameEdited, setUsernameEdited] = useState('')
    const [passwordEdited, setPasswordEdited] = useState('')
    const [nuevaData, setNuevaData] = useState([])

    const handleChange = (e) => {
        e.target.value.length >= 1 ? setButtonState(false) : setButtonState(true)
        const a = e.target.name === 'fullname' && e.target.value
        setFullNameEdited(a)
        const b = e.target.name === 'age' && e.target.value
        setAgeEdited(b)
        const c = e.target.name === 'city' && e.target.value
        setCityEdited(c)
        const d = e.target.name === 'username' && e.target.value
        setUsernameEdited(d)
        const f = e.target.name === 'password' && e.target.value
        setPasswordEdited(f)
        console.log(e.target.name)
    }

    const submitInputs = () => {
        const newData = {
            fullName: fullNameEdited,
            age: ageEdited,
            city: cityEdited,
            username: usernameEdited,
            password: passwordEdited
        }
        setNuevaData(newData)
    }

    console.log(nuevaData)

    return (
        userState === true ?
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Settings</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, minHeight: 200, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center' }}>
                        {/* User Image */}
                        <Avatar size={130} icon={<UserOutlined />} src={null} style={{ backgroundColor: '#cdcdcd' }} />
                        {/* Fully Name */}
                        <Input name="fullname" style={{ width: 350, marginTop: 20 }} onChange={(e) => handleChange(e)} placeholder="Enter your full name" defaultValue={user[0].fullName} />
                        {/* Age */}
                        <Input name="age" style={{ width: 350, marginTop: 10 }} onChange={(e) => handleChange(e)} placeholder="Enter your age" defaultValue={user[0].age} />
                        {/* City */}
                        <Input name="city" style={{ width: 350, marginTop: 10 }} onChange={(e) => handleChange(e)} placeholder="Enter your city" defaultValue={user[0].city} />
                        {/* User */}
                        <Input name="username" style={{ width: 350, marginTop: 10 }} onChange={(e) => handleChange(e)} placeholder="Enter your username" prefix={ <UserOutlined className="site-form-item-icon" style={{ color: 'rgb(0,142,250)' }} /> }
                        suffix={
                            <Tooltip title="name@email.com or username">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>}
                        defaultValue={user[0].username} />
                        {/* Password */}
                        <Input.Password name="password" style={{ width: 350, marginTop: 10, color: 'rgb(0,142,250)' }} onChange={(e) => handleChange(e)} placeholder="Enter your password" prefix={<KeyOutlined className="site-form-item-icon" />} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} suffix={
                            <Tooltip title="Your password">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                            }
                            defaultValue={user[0].password} />
                        {/* Submit Button */}
                        <Button type="primary" htmlType="submit" style={{ marginTop: 10, width: 150 }} disabled={buttonState} onClick={submitInputs}>
                            Confirm details
                        </Button>
                </div>
            </Content> :
            <Redirect to='./' />
    )
}