import React, { useState, useEffect, useContext } from 'react';
import { Table, Layout, Breadcrumb, Tag, Space, Button, Tooltip, Form, Input, Popconfirm, InputNumber, Typography, notification, Spin } from 'antd';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined, AppstoreAddOutlined, LoadingOutlined, RiseOutlined, MinusOutlined, FallOutlined, WarningOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import './index.css';
import { DataContext } from '../../context/DataContext';
import { Redirect } from 'react-router-dom';
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from '../../config/firebase/firebase';


    export default function MyIssues() {

    const { Content } = Layout;
    const { setIssues, userState } = useContext(DataContext)

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [idDoc, setIdDoc] = useState("")

    // TODAS LAS TAREAS DEL USUARIO //
    useEffect(() => {
        let isMounted = true; // Fixed error with this //
        const fetchMyTasksUser = async () => {
            if (isMounted) {
                setLoading(true)
                const datos = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/tasks"));
                const buscarData = datos.docs.map((user) => {
                    return user.data()
                })
                setTasks(buscarData)
                setLoading(false)
            }
        }
        fetchMyTasksUser()
        return () => { isMounted = false }
    }, [idDoc])

    console.log(tasks)
      
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

    const openNotification = (reason) => {
        notification.open({
            message: reason === 'success' ? 'Successful change' : 'Successful deleted',
            description:
                reason === 'success' ? 'Your change has been made.' : 'Your issue has been deleted',
            icon: reason === 'success' ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> : <DeleteOutlined style={{ color: 'red' }} />,
        });
    };

    const EditableTable = () => {
        const [form] = Form.useForm();
        const [data, setData] = useState(tasks);
        const [editingKey, setEditingKey] = useState('');
      
        const isEditing = (record) => record.key === editingKey;
      
        const edit = (record) => {
            form.setFieldsValue({
                priority: '',
                description: '',
                state: '',
                ...record,
            });
            setEditingKey(record.key);
        };
      
        const cancel = () => {
            setEditingKey('');
        };
      
        const save = async (key) => {
            try {
                setLoading(true)
                const row = await form.validateFields();
                const newData = [...data];
                const index = newData.findIndex((item) => key === item.key);
        
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, { ...item, ...row });

                    // Edit task in Firebase //
                    const editedTask = newData.find((task) => task.key === key)
                    await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/tasks/${key}`), editedTask)

                    setData(newData);
                    setEditingKey('');
                    setTasks(newData)

                    console.log(newData)
                    setLoading(false)
                    openNotification('success');
                    // setChange(!change)
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
                dataIndex: 'state',
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
                            onClick={(e) => {
                                e.preventDefault()
                                save(record.key)
                            }}
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

    const handleDelete = async (key) => {
        setLoading(true)
        const origindata = tasks;

        // Delete Firebase task //
        await deleteDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/tasks/${key}`));

        setTasks((origindata.filter((item) => item.key !== key)))
        setLoading(false)
        openNotification('deleted');
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
                                let objetoNuevo = [{
                                    priority: valor1 ? valor1 : 'Low',
                                    description: valor2 ? valor2 : 'Write something, please',
                                    state: 'To do',
                                    edit: false,
                                }]
                                try {
                                    const createTask = async () => {
                                        setLoading(true)

                                        const docRef = await addDoc(collection(db, "users/4Wl0ABf75BtglqcPOtJT/tasks"), {
                                            priority: objetoNuevo[0].priority,
                                            description: objetoNuevo[0].description,
                                            state: objetoNuevo[0].state,
                                            edit: objetoNuevo[0].edit
                                        });
                                        await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/tasks/${docRef.id}`), {
                                            key: docRef.id,
                                        })
                                        objetoNuevo.push({ key: docRef.id })
                                        setTasks([...tasks, objetoNuevo])
                                        setIdDoc(docRef.id)
                                        
                                        setLoading(false)
                                    }
                                    createTask()
                                } catch (e) {
                                console.error("Error adding document: ", e);
                                }
                            }
                        }
                    })
                }
            }
        })
    }

    if (loading === false) {
        return (
            userState === true ?
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>My Tasks</Breadcrumb.Item>
                    </Breadcrumb>
                    <hr />
                    <div style={{ padding: 24, minHeight: 360 }}>
                        <h5>All Tasks</h5>
                            <hr style={{ marginBottom: 35 }} />
                        <Tooltip title="Add Issue">
                            <Button type="primary" shape="circle" icon={<AppstoreAddOutlined />} size="large" onClick={createIssue} style={{ marginBottom: 10 }}/>
                        </Tooltip>
                        <EditableTable />
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