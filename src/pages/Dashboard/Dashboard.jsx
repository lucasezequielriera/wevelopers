import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Pie } from '@ant-design/charts';
import { Row, Col } from 'react-bootstrap'

export default function Dashboard() {

    const { Content } = Layout;
    
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

    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <hr />
            <div style={{ display: 'flex', flexFlow: 'row' }}>
                <div style={{ width: '50%', padding: 24, minHeight: 360 }}>
                  <h5>Porcentaje de Ingresos Gastados</h5>
                  <hr />
                  <Pie {...config} />
                </div>
                <div style={{ width: '50%', padding: 24, minHeight: 360 }}>
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
        </Content>
    )
}