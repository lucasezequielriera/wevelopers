import React, { useState, useEffect, useContext, useRef } from 'react';
import { Table, Layout, Breadcrumb, Tag, Space, Button, Tooltip, Modal, Form, Input, Popconfirm, InputNumber, Typography, notification } from 'antd';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined, AppstoreAddOutlined, LoadingOutlined, SmileOutlined, RiseOutlined, MinusOutlined, FallOutlined, WarningOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import './index.css';

    export default function MyIssues() {

        // const originData = [];
    // // Table
    const { Content } = Layout;
    // const { Column } = Table;

    const [originData, setOriginData] = useState([
        {
            id: 1,
            key: '1',
            priority: 'High',
            description: 'Corrección de formularios vacios en Escuelas IADE Paraguay',
            tags: 'To do',
            edit: false,
        },
        {
            id: 2,
            key: '2',
            priority: 'Medium',
            description: 'Hablar con diseñador para marca y logo',
            tags: 'To do',
            edit: false,
        },
        {
            id: 3,
            key: '3',
            priority: 'Low',
            description: 'Consultar con Community Manager para gestión de redes We-velopers',
            tags: 'To do',
            edit: false,
        }
    ]);

    // const handleDelete = (e) => {
    //     console.log(e)
    //   };

    // // Const Data
    // const [data, setData] = useState(datos);

    // for (let i = 0; i < 10; i++) {
    //     originData.push({
    //       key: i.toString(),
    //       name: `Edrward ${i}`,
    //       age: 32,
    //       address: `London Park no. ${i}`,
    //     });
    // }
      
    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                    margin: 0,
                    }}
                    rules={[
                    {
                        required: true,
                        message: `Please Input ${title}!`,
                    },
                    ]}
                >
                    {inputNode}
                </Form.Item>
                ) : (
                children
                )}
            </td>
        );
    };

    const openNotification = () => {
        notification.open({
            message: 'Successful change',
            description:
                'Your change has been made.',
            icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        });
    };

    const EditableTable = () => {
        const [form] = Form.useForm();
        const [data, setData] = useState(originData);
        const [editingKey, setEditingKey] = useState('');
      
        const isEditing = (record) => record.key === editingKey;
      
        const edit = (record) => {
            form.setFieldsValue({
                priority: '',
                description: '',
                tags: '',
                ...record,
            });
            setEditingKey(record.key);
        };
      
        const cancel = () => {
            setEditingKey('');
        };
      
        const save = async (key) => {
            try {
                const row = await form.validateFields();
                const newData = [...data];
                const index = newData.findIndex((item) => key === item.key);
        
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, { ...item, ...row });
                    setData(newData);
                    setEditingKey('');
                    openNotification();
                    } else {
                        newData.push(row);
                        setData(newData);
                        setEditingKey('');
                    }
            } catch (errInfo) {
                console.log('Validate Failed:', errInfo);
            }
        };
      
        const columns = [
            {
                title: 'Priority',
                dataIndex: 'priority',
                width: '7%',
                editable: true,
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
                editable: true,
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
                editable: true,
            },
            {
                title: 'Operations',
                dataIndex: 'operation',
                render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-evenly' }}>
                        <Tag
                            size="middle"
                            color="green"
                            href="javascript:;"
                            onClick={() => save(record.key)}
                            style={{ marginRight: 8, cursor: 'pointer' }}>
                            Save
                        </Tag>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Tag color="red" style={{ cursor: 'pointer' }}>
                                Cancel
                            </Tag>
                        </Popconfirm>
                    </span>
                ) : (
                    <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-evenly' }}>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <Space>
                                <Button type="primary" ghost>
                                    Edit
                                </Button>
                            </Space>
                        </Typography.Link>
                        <Typography.Link onClick={() => handleDelete(record.key)}>
                            <Space>
                                <Button type="primary" danger ghost>
                                    Delete
                                </Button>
                            </Space>
                        </Typography.Link>
                    </div>
                );
                },
            },
        ];
        const mergedColumns = columns.map((col) => {
          if (!col.editable) {
            return col;
          }
      
          return {
            ...col,
            onCell: (record) => ({
              record,
              inputType: col.dataIndex === 'age' ? 'number' : 'text',
              dataIndex: col.dataIndex,
              title: col.title,
              editing: isEditing(record),
            }),
          };
        });
        return (
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        );
    };

    const handleDelete = (key) => {
        const origindata = originData
        setOriginData((origindata.filter((item) => item.key !== key)))
        console.log(key)
        console.log(origindata)
    }

    // Create Issue
    const createIssue = () => {
        let valor1 = "";
        let valor2 = "";

        const inputOptions = {
                'Low': 'Low',
                'Medium': 'Medium',
                'High': 'High'
              }
        Swal.fire({
            title: 'Select state',
            input: 'radio',
            inputOptions: inputOptions,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Next',
            backdrop: 'rgba(0,0,0,0.8)',
            inputValidator: (value) => {
                if (!value) {
                return 'You need to choose something state'
                } else {
                    valor1 = value;
                    Swal.fire({
                        title: 'Enter your description',
                        input: 'text',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Add Issue',
                        backdrop: 'rgba(0,0,0,0.8)',
                        inputValidator: (value) => {
                          if (!value) {
                            return 'You need to write something!'
                          } else {
                            valor2 = value;
                            const objetoNuevo = {
                                id: originData.length + 1,
                                key: String((originData.length + 1)),
                                priority: valor1 ? valor1 : 'Low',
                                description: valor2 ? valor2 : 'Write something, please',
                                tags: 'To do',
                                edit: false,
                                }
                                setOriginData([...originData, objetoNuevo])
                            }
                        }
                    })
                }
            }
        })
    }

    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>My Issues</Breadcrumb.Item>
            </Breadcrumb>
            <hr />
            <div style={{ padding: 24, minHeight: 360 }}>
                <Tooltip title="Add Issue">
                    <Button type="primary" shape="circle" icon={<AppstoreAddOutlined />} size="large" onClick={createIssue} style={{ marginBottom: 10 }}/>
                </Tooltip>
                <EditableTable />
            </div>
        </Content>
    )
}