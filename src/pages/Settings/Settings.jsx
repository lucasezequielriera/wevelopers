import React, {useState, useEffect} from 'react';
import { Layout, Breadcrumb, Avatar, Form, Input, Button, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch, Tooltip, Upload } from 'antd';
import { UserOutlined, InfoCircleOutlined, EyeInvisibleOutlined, EyeTwoTone, CheckOutlined, KeyOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png'


export default function Settings() {

    const { Content } = Layout;

    const [buttonState, setButtonState] = useState(true)

    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Settings</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 200, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center' }}>
            {/* User Image */}
            <Avatar size={130} icon={<UserOutlined />} src={null} style={{ backgroundColor: '#cdcdcd' }} />
            {/* Fully Name */}
            <Input style={{ width: 350, marginTop: 20 }} onChange={(change) => {change.target.value.length >= 1 ? setButtonState(false) : setButtonState(true)}} placeholder="Enter your full name" defaultValue="Lucas Riera" />
            {/* Age */}
            <Input style={{ width: 350, marginTop: 10 }} onChange={(change) => {change.target.value.length >= 1 ? setButtonState(false) : setButtonState(true)}} placeholder="Enter your age" defaultValue="25"/>
            {/* City */}
            <Input style={{ width: 350, marginTop: 10 }} onChange={(change) => {change.target.value.length >= 1 ? setButtonState(false) : setButtonState(true)}} placeholder="Enter your city" defaultValue="Retiro, Buenos Aires, Argentina"/>
            {/* User */}
            <Input style={{ width: 350, marginTop: 10 }} onChange={(change) => {change.target.value.length >= 1 ? setButtonState(false) : setButtonState(true)}} placeholder="Enter your username" prefix={ <UserOutlined className="site-form-item-icon" style={{ color: 'rgb(0,142,250)' }} /> }
            suffix={
                <Tooltip title="name@email.com or username">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>}
            defaultValue="lucasezequielriera@hotmail.com"/>
            {/* Password */}
            <Input.Password style={{ width: 350, marginTop: 10 }} onChange={(change) => {change.target.value.length >= 1 ? setButtonState(false) : setButtonState(true)}} placeholder="Enter your password" prefix={<KeyOutlined className="site-form-item-icon"className="site-form-item-icon" style={{ color: 'rgb(0,142,250)' }} />} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} suffix={
                <Tooltip title="Your password">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
                }
                defaultValue="lucasriera2021" />
            {/* Submit Button */}
            <Button type="primary" htmlType="submit" style={{ marginTop: 10, width: 150 }} disabled={buttonState}>
                Confirm details
            </Button>
            </div>
        </Content>
    )
}