import React from 'react';
import { Table, Layout, Breadcrumb, Tag, Space } from 'antd';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './index.css';

export default function MyIssues() {

    const { Content } = Layout;
    const { Column } = Table;

    const data = [
        {
            key: '1',
            priority: 'High',
            description: 'Corrección de formularios vacios en Escuelas IADE Paraguay',
            tags: ['Doing'],
        },
        {
            key: '2',
            priority: 'Medium',
            description: 'Hablar con diseñador para marca y logo',
            tags: ['Done'],
        },
        {
            key: '3',
            priority: 'Low',
            description: 'Consultar con Community Manager para gestión de redes We-velopers',
            tags: ['To do'],
        },
    ];
    

    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>My Issues</Breadcrumb.Item>
            </Breadcrumb>
            <hr />
            <div style={{ padding: 24, minHeight: 360 }}>
                <Table dataSource={data}>
                    <Column
                    title="State"
                    dataIndex="tags"
                    key="tags"
                    width={100}
                    render={tags => (
                        <div>
                            {console.log(tags)}
                        {tags.map(tag => {
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
                            }
                        })}
                        </div>
                    )} />
                    <Column
                    title="Priority"
                    dataIndex="priority"
                    key="priority"
                    width={100}
                    render={priorities => {
                        if (priorities === 'High') {
                            return <Tag color="red" key={priorities}>
                                {priorities}
                            </Tag>
                        } else if (priorities === 'Medium') {
                            return <Tag color="yellow" key={priorities}>
                                {priorities}
                            </Tag>
                        } else if (priorities === 'Low') {
                            return <Tag color="cyan" key={priorities}>
                                {priorities}
                            </Tag>
                        }
                    }} />
                    <Column title="Description" dataIndex="description" key="description" />
                    <Column
                    title="Action"
                    key="action"
                    width={150}
                    render={(record) => (
                        <Space size="middle">
                        <a href="#">Edit</a>
                        <a href="#">Delete</a>
                        </Space>
                    )} />
                </Table>
            </div>
        </Content>
    )
}