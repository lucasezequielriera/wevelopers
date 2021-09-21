import React from 'react';
import { Layout, Breadcrumb } from 'antd';

export default function Settings() {

    const { Content } = Layout;


    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Settings</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
            </div>
        </Content>
    )
}