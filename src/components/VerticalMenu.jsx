import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import './styles.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function VerticalMenu() {

    // States //
    const [collapsed, setCollapsed] = useState(false);

    // Consts //
    const { Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;

    // Toggle//
    const toggle = () => setCollapsed(!collapsed);

    return (
        <Router>
            <Switch>

                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" icon={<PieChartOutlined />}>
                                <Link to="/Dashboard">Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined />}>
                                <Link to="/MyIssues">My Issues</Link>
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined />} title="Personal">
                                <Menu.Item key="3">Personal Expenses</Menu.Item>
                                <Menu.Item key="4">Home</Menu.Item>
                                <Menu.Item key="5">Family</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<TeamOutlined />} title="Professional">
                                <Menu.Item key="6">Work "1"</Menu.Item>
                                <Menu.Item key="8">Work "2"</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9" icon={<FileOutlined />}>
                                <Link to="/PersonalFiles">Personal Files</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Content style={{ margin: '0 16px' }}>

                            <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            Bill is a cat.
                            </div>

                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>

            </Switch>

            <Route path="/Dashboard"></Route>
            <Route path="/MyIssues"></Route>
            <Route path="/Personal"></Route>
            <Route path="/Professional"></Route>
            <Route path="/PersonalFiles"></Route>
            <Route path="/"></Route>

        </Router>
    )
}