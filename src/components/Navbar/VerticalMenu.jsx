import React, { useState, Fragment, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import './styles.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from '../../pages/Dashboard/Dashboard';
import MyIssues from '../../pages/MyIssues/MyIssues';
import PersonalExpenses from '../../pages/Personal/Expenses/PersonalExpenses';
import PersonalFamily from '../../pages/Personal/Family/PersonalFamily';
import PersonalHome from '../../pages/Personal/Home/PersonalHome';
import PersonalFiles from '../../pages/Personal/Files/PersonalFiles';
import ProfessionalWork1 from '../../pages/Professional/Work1/ProfessionalWork1';
import ProfessionalWork2 from '../../pages/Professional/Work2/ProfessionalWork2';
import Settings from '../../pages/Settings/Settings';
import PersonalExpensesDetail from '../../pages/Personal/Expenses/PersonalExpensesDetail';
import Home from '../../pages/Home/Home';
import { DataContext } from '../../context/DataContext';

export default function VerticalMenu() {
    const [t, i18n] = useTranslation("global");

    const { user, userState } = useContext(DataContext);

    // States //
    const [collapsed, setCollapsed] = useState(false);

    // Consts //
    const { Footer, Sider } = Layout;
    const { SubMenu } = Menu;

    // Toggle//
    const toggle = () => setCollapsed(!collapsed);

    // Language //
    const [chooseLanguage, setChooseLanguage] = useState('spanish')

    useEffect(() => {
        console.log(userState)
    }, [userState])

    const selectLanguage = (language) => {
        i18n.changeLanguage(language)
    }

    const languages = [
        {
            name: "Español",
            abbreviation: "es",
            id: 1
        },
        {
            name: "English",
            abbreviation: "en",
            id: 2
        },
        {
            name: "Italiano",
            abbreviation: "it",
            id: 3
        },
        {
            name: "日本語",
            abbreviation: "cn",
            id: 4
        }
    ]

    return (
        <Router>
            <Switch>

                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            { userState === true ?
                            <Fragment>
                            <Menu.Item key="1" icon={<PieChartOutlined />}>
                                <Link to="/Dashboard">Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined />}>
                                <Link to="/MyIssues">My Issues</Link>
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined />} title="Personal">
                                <Menu.Item key="3">
                                    <Link to="/Personal/Expenses">Expenses</Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to="/Personal/Home">Home</Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <Link to="/Personal/Family">Family</Link>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <Link to="/Personal/Files">Files</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<TeamOutlined />} title="Professional">
                                <Menu.Item key="7">
                                    <Link to="/Professional/Work1">Work 1</Link>
                                </Menu.Item>
                                <Menu.Item key="8">
                                    <Link to="/Professional/Work2">Work 2</Link>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9" icon={<SettingOutlined />}>
                                <Link to="/Settings">Settings</Link>
                            </Menu.Item>
                            </Fragment> :
                            <Fragment>
                                {languages.map((language) => {
                                    return (
                                        <Menu.Item key={language.id} icon={<PieChartOutlined />}>
                                            <Link to="/" onClick={() => selectLanguage(language.abbreviation)}>{language.name}</Link>
                                        </Menu.Item>
                                    )
                                })}
                            </Fragment>
                            }
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">

                        <Route exact path="/Dashboard"><Dashboard /></Route>
                        <Route exact path="/MyIssues"><MyIssues /></Route>
                        <Route exact path="/Personal/Expenses/Detail"><PersonalExpensesDetail /></Route>
                        <Route exact path="/Personal/Expenses"><PersonalExpenses /></Route>
                        <Route exact path="/Personal/Home"><PersonalHome /></Route>
                        <Route exact path="/Personal/Family"><PersonalFamily /></Route>
                        <Route exact path="/Personal/Files"><PersonalFiles /></Route>
                        <Route exact path="/Professional/Work1"><ProfessionalWork1 /></Route>
                        <Route exact path="/Professional/Work2"><ProfessionalWork2 /></Route>
                        <Route exact path="/Settings"><Settings /></Route>
                        <Route exact path="/"><Home /></Route>

                        <Footer style={{ textAlign: 'center' }}>All Rights Reserved ©2021 Created & Designed by Wevelopers</Footer>
                    </Layout>
                </Layout>

            </Switch>
        </Router>
    )
}