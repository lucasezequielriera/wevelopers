import React, { useEffect, useContext } from 'react';
import { Layout, Breadcrumb, Table, Tag } from 'antd';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined, AppstoreAddOutlined, LoadingOutlined, RiseOutlined, MinusOutlined, FallOutlined, WarningOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/charts';
import { Row, Col } from 'react-bootstrap'
import { DataContext } from '../../context/DataContext';

export default function Dashboard() {

    const { Content } = Layout;
    const { issues } = useContext(DataContext)
    
    const data = [
        {
          type: 'Gastos',
          value: 100000,
        },
        {
          type: 'Ingresos',
          value: 250000,
        },
        {
          type: 'Deudas',
          value: 2500,
        },
        {
          type: 'Ahorros ($)',
          value: 20000,
        },
        {
          type: 'Ahorros (u$d)',
          value: (1700 * 181),
        },
        {
          type: 'Préstamos',
          value: 0,
        },
    ];

    const config = {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
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

    useEffect(() => {
      console.log(issues)
    })

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
              console.log(tag)
          },
      },
      {
          title: 'Description',
          dataIndex: 'description',
          width: '75%',
      }
  ];

    return (
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
                          <h6>Total Ingresos Mes Actual</h6><hr />
                          <h2 style={{ color: 'rgb(94, 149, 244)' }}>$172.155</h2>
                      </Col>
                      <Col sm>
                          <h6>Total Gastos Mes Actual</h6><hr />
                          <h2 style={{ color: 'rgb(94, 149, 244)' }}>$106.581</h2>
                      </Col>
                  </Row>
                  <Row>
                      <Col sm>
                          <h6>Total Ahorros en Pesos</h6><hr />
                          <h2 style={{ color: 'rgb(94, 149, 244)' }}>$10.000</h2>
                      </Col>
                      <Col sm>
                          <h6>Total Ahorros en Dólares</h6><hr />
                          <h2 style={{ color: 'rgb(94, 149, 244)' }}>$1.931</h2>
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
        </Content>
    )
}