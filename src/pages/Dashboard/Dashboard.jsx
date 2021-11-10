import React, { useEffect, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Breadcrumb, Table, Tag, Spin, Alert } from 'antd';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined, AppstoreAddOutlined, LoadingOutlined, RiseOutlined, MinusOutlined, FallOutlined, WarningOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/charts';
import { Row, Col } from 'react-bootstrap'
import { DataContext } from '../../context/DataContext';
import { Redirect } from 'react-router-dom';
import db from '../../config/firebase/firebase'
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
    const {t, i18n} = useTranslation("global");

    const { Content } = Layout;
    const { users, globalDataUser, myIssues, issues, userState } = useContext(DataContext)

    const [reload, setReload] = useState(false)

    const config = {
        appendPadding: 10,
        data: globalDataUser,
        angleField: 'value',
        colorField: 'name',
        radius: 1,
        innerRadius: 0.6,
        label: {
          name: 'inner',
          offset: '-50%',
          content: '',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [{ name: 'element-selected' }, { name: 'element-active' }],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            content: '64%',
          },
        },
    };

    const columns = [
    {
        title: 'Priority',
        dataIndex: 'priority',
        width: '7%',
        render: priorities => {
            if (priorities === 'High') {
                return <Tag icon={<RiseOutlined />} color="red" key={priorities}>
                    {priorities}
                </Tag>
            } else if (priorities === 'Medium') {
                return <Tag icon={<MinusOutlined />} color="yellow" key={priorities}>
                    {priorities}
                </Tag>
            } else if (priorities === 'Low') {
                return <Tag icon={<FallOutlined />} color="cyan" key={priorities}>
                    {priorities}
                </Tag>
            } else {
                return <Tag icon={<WarningOutlined />} color="purple" key={priorities}>
                {priorities}
            </Tag>
            }
        },
    },
    {
        title: 'State',
        dataIndex: 'tags',
        width: '7%',
        render: tag => {
            if (tag === 'Done') {
                return <Tag icon={<CheckCircleOutlined />} color="green" key={tag}>
                    {tag}
                        </Tag>
            } else if (tag === 'Doing') {
                return <Tag icon={<SyncOutlined spin />} color="blue" key={tag}>
                    {tag}
                        </Tag>
            } else if (tag === 'To do') {
                return <Tag icon={<ClockCircleOutlined />} color="default" key={tag}>
                    {tag}
                        </Tag>
            } else if (tag !== 'Done' && tag !== 'Doing' && tag !== 'To do') {
                return <Tag icon={<LoadingOutlined />} color="default" key={tag}>
                    {tag}
                        </Tag>
            }
        },
    },
    {
        title: 'Description',
        dataIndex: 'description',
        width: '75%',
    }
    ];

    console.log(globalDataUser)

    if (users.length >= 1) {
        return (
            userState === true ?
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <hr />
                <div style={{ display: 'flex', flexFlow: 'row' }}>
                    <div style={{ width: '50%', padding: 24, minHeight: 360 }}>
                    <h5>Percentage of Income Spent</h5>
                    <hr style={{ marginBottom: 35 }} />
                    <Pie {...config} />
                    </div>
                    <div style={{ width: '50%', padding: 24, minHeight: 360 }}>
                    <h5>Account Summary</h5>
                    <hr style={{ marginBottom: 35 }} />
                    <Row>
                        <Col sm>
                            <h6>${globalDataUser[1].name}</h6><hr />
                            <h2 style={{ color: 'rgb(94, 149, 244)' }}>${globalDataUser[1].value}</h2>
                        </Col>
                        <Col sm>
                            <h6>${globalDataUser[0].name}</h6><hr />
                            <h2 style={{ color: 'rgb(94, 149, 244)' }}>${globalDataUser[0].value}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <h6>${globalDataUser[3].name}</h6><hr />
                            <h2 style={{ color: 'rgb(94, 149, 244)' }}>${globalDataUser[3].value}</h2>
                        </Col>
                        <Col sm>
                            <h6>${globalDataUser[4].name}</h6><hr />
                            <h2 style={{ color: 'rgb(94, 149, 244)' }}>${globalDataUser[4].value}</h2>
                        </Col>
                    </Row>
                    </div>
                </div>
                <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'center' }}>
                <div style={{ width: '100%', padding: 24, minHeight: 360 }}>
                    <h5>Pending Tasks</h5>
                    <hr style={{ marginBottom: 35 }} />
                    <Table dataSource={issues} columns={columns} />
                </div>
                </div>
            </Content> :
            <Redirect to='./' />
        )
    } else {
        return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" tip="Loading..." />
        </div>
    }
}