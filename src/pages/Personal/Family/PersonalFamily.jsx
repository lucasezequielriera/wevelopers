import React, { useContext, useRef } from 'react';
import { Layout, Breadcrumb, Button, Tooltip } from 'antd';
import { Column } from '@ant-design/charts';
import { DownloadOutlined, EditOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import { DataContext } from '../../../context/DataContext';

export default function PersonalFamily() {

    const { Content } = Layout;

    const { userState } = useContext(DataContext)

    const data = [
      { description: 'Ingresos', value: 150000 },
      { description: 'Gastos', value: 70000 },
      { description: 'Deudas', value: 5000 },
      { description: 'Préstamos', value: 0 },
      { description: 'Ahorro $', value: 20000 },
      { description: 'Ahorro u$d', value: (1200 * 181) },
      { description: 'Efectivo', value: 5000 },
    ];
    const config = {
      data,
      height: 400,
      xField: 'description',
      yField: 'value',
      point: {
        size: 5,
        shape: 'diamond',
      },
    };

    // const columnStyle = {
    //   strokeOpacity: 0.7,
    //   shadowColor: 'rgba(0,0,0,0.2)',
    //   shadowBlur: 10,
    //   shadowOffsetX: 5,
    //   shadowOffsetY: 5,
    // }

    const ref = useRef();

    // export image
    const downloadImage = () => {
        ref.current.downloadImage();
    };


    return (
      userState === true ?
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Personal</Breadcrumb.Item>
                <Breadcrumb.Item>My Family Expenses</Breadcrumb.Item>
            </Breadcrumb>
            <hr />
            <div style={{ display: 'flex', flexFlow: 'row' }}>
                <div style={{ width: '50%', padding: 24, minHeight: 360 }}>
                  <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
                    <h5 style={{ alignSelf: 'center', marginBottom: 0 }}>My Personal Expenses</h5>
                    <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                      <Tooltip title="Edit data">
                        <Button type="primary" shape="circle" icon={<EditOutlined /> } size='large' onClick={downloadImage} />
                      </Tooltip>
                      <Tooltip title="Download graph">
                        <Button type="primary" shape="circle" icon={<DownloadOutlined /> } size='large' onClick={downloadImage} style={{ marginLeft: 5 }} />
                      </Tooltip>
                    </div>
                  </div>
                  <hr />
                  <Column {...config} onReady={(plot) => { ref.current = plot }}/>
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
                  <Row>
                      <Col sm>
                          <h6>Total Ahorros en Pesos</h6><hr />
                          <h2 style={{ color: 'rgb(94, 149, 244)' }}>$10.000</h2>
                      </Col>
                      <Col sm>
                          
                      </Col>
                  </Row>
                </div>
            </div>
        </Content> :
        <Redirect to='./' />
    )
}