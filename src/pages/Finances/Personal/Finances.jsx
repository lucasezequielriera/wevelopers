import React, { useRef, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Breadcrumb, Button, Tooltip, Spin } from 'antd';
import { Column } from '@ant-design/charts';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { DataContext } from '../../../context/DataContext';
import { Redirect } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import db from '../../../config/firebase/firebase';

export default function PersonalExpenses() {
  const {t, i18n} = useTranslation("global");

  const { Content } = Layout;
  const { data, setData, values, userState } = useContext(DataContext);

  const [loading, setLoading] = useState(false)

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

  const ref = useRef();

  // export image
  const downloadImage = () => {
      ref.current.downloadImage();
  };

  const actualizarEstado = () => {
    const mapeado = values.map((valor) => valor[0])

    const ingresosMap = mapeado.find((element) => element.name === 'Ingresos');
    const gastosMap = mapeado.find((element) => element.name === 'Gastos');
    const deudasMap = mapeado.find((element) => element.name === 'Deudas');
    const prestamosMap = mapeado.find((element) => element.name === 'Préstamos');
    const ahorro$Map = mapeado.find((element) => element.name === 'Ahorro $');
    const ahorroU$dMap = mapeado.find((element) => element.name === 'Ahorro u$d');
    // const efectivoMap = mapeado.find((element) => element.name === 'Efectivo');

    console.log(mapeado)

    setData([
      { description: 'Ingresos',   value: ingresosMap.value === undefined ? 0 : ingresosMap.value },
      { description: 'Gastos',     value: gastosMap.value === undefined ? 0 : gastosMap.value },
      { description: 'Deudas',     value: deudasMap.value === undefined ? 0 : deudasMap.value },
      { description: 'Préstamos',  value: prestamosMap.value === undefined ? 0 : prestamosMap.value },
      { description: 'Ahorro $',   value: ahorro$Map.value === undefined ? 0 : ahorro$Map.value },
      { description: 'Ahorro u$d', value: ahorroU$dMap.value === undefined ? 0 : ahorroU$dMap.value },
      // { description: 'Efectivo',   value: efectivoMap.value === undefined ? 0 : efectivoMap.value },
    ])
  }

  if (loading === false) {
    return (
      userState === true ?
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Finances</Breadcrumb.Item>
                <Breadcrumb.Item>Personal</Breadcrumb.Item>
            </Breadcrumb>
            <hr />
            <Button type="primary" onClick={actualizarEstado}>Actualizar Valores</Button>
            <div style={{ display: 'flex', flexFlow: 'row' }}>
                <div style={{ width: '50%', padding: 24, minHeight: 360 }}>
                  <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
                    <h5 style={{ alignSelf: 'center', marginBottom: 0 }}>Graphic Finances in November</h5>
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
                    <h5 style={{ alignSelf: 'center', marginBottom: 0 }}>My Personal Finances in November</h5>
                    <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                      <Tooltip title="View Detail">
                        <Link to="/Finances/Personal/FinancesDetail"><Button type="primary" shape="circle" icon={<EyeOutlined /> } size='large' /></Link>
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
            <div className='text-center mt-5'>
              Resumenes mensuales como table y que se pueda abrir y descargar
            </div>
        </Content> :
        <Redirect to='./' />
    )
  } else {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" tip="Loading..." />
      </div>
    )
  }
}