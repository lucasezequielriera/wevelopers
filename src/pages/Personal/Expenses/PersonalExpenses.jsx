import React, { useRef, useState, useContext } from 'react';
import { Layout, Breadcrumb, Button, Tooltip } from 'antd';
import { Column } from '@ant-design/charts';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { DataContext } from '../../../context/DataContext';

export default function PersonalExpenses() {

    const { Content } = Layout;

    const { data } = useContext(DataContext);

    console.log(data)

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
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Personal</Breadcrumb.Item>
                <Breadcrumb.Item>My Expenses</Breadcrumb.Item>
            </Breadcrumb>
            <hr />
            <div style={{ display: 'flex', flexFlow: 'row' }}>
                <div style={{ width: '50%', padding: 24, minHeight: 360 }}>
                  <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
                    <h5 style={{ alignSelf: 'center', marginBottom: 0 }}>My Personal Expenses</h5>
                    <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                      <Tooltip title="Download graph">
                        <Button type="primary" shape="circle" icon={<DownloadOutlined /> } size='large' onClick={downloadImage} style={{ marginLeft: 5 }} />
                      </Tooltip>
                    </div>
                  </div>
                  <hr style={{ marginBottom: 35 }} />
                  <Column {...config} onReady={(plot) => { ref.current = plot }}/>
                </div>
                <div style={{ width: '50%', padding: 24, minHeight: 360 }}>
                  <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
                    <h5 style={{ alignSelf: 'center', marginBottom: 0 }}>Total Expenses</h5>
                    <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                      <Tooltip title="View Detail">
                        <Link to="/Personal/Expenses/Detail"><Button type="primary" shape="circle" icon={<EyeOutlined /> } size='large' /></Link>
                      </Tooltip>
                    </div>
                  </div>
                  <hr style={{ marginBottom: 35 }} />
                  <Row>
                  {data.map((data) => {
                    return (
                      <Col style={{ minWidth: 200, maxWidth: 250 }}>
                          <h6>{data.description}</h6><hr />
                          <h2 style={{ color: 'rgb(94, 149, 244)' }}>${data.value}</h2>
                      </Col>
                    )
                  })}
                  </Row>
                </div>
            </div>
        </Content>
    )
}