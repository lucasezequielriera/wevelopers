import React, { useState, useContext, useEffect } from 'react'
import { Input, Button, Popconfirm, Form, Table, Tag, Space, Tooltip, InputNumber, Typography, notification } from 'antd';
import { CheckCircleOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import moment from 'moment';
import { DataContext } from '../../context/DataContext';

const EditableTable = ({ tableSize, data, marginBottom, title }) => {

    // Guardar datos en un nuevo array //
    const [originData, setOriginData] = useState(data);
    const [datosNuevos, setDatosNuevos] = useState();

    const { setData } = useContext(DataContext)

    // Función para que editar en la tabla //
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

    // Popup luego de guardar dato editado //
    const openNotification = () => {
        notification.open({
            message: 'Successful change',
            description:
                'Your change has been made.',
            icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        });
    };

    // Editar dato //
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;
    
    const edit = (record) => {
        form.setFieldsValue({
            title: '',
            date: '',
            payments: '',
            amount: '',
            paid: '',
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
            const newData = [...originData];
            const index = newData.findIndex((item) => key === item.key);
    
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setOriginData(newData);
                setEditingKey('');
                openNotification();
                setOriginData(newData);
                } else {
                    newData.push(row);
                    setOriginData(newData);
                    setEditingKey();
                }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    
    // Estructura de columnas //
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            width: '44%',
            editable: true,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            width: '10%',
            editable: true,
            render: priorities => {
                if (priorities === 'High') {
                    return <Tag color="red" key={priorities} style={{ margin: 0 }}>
                        {priorities}
                    </Tag>
                } else if (priorities === 'Medium') {
                    return <Tag color="yellow" key={priorities} style={{ margin: 0 }}>
                        {priorities}
                    </Tag>
                } else if (priorities === 'Low') {
                    return <Tag color="cyan" key={priorities} style={{ margin: 0 }}>
                        {priorities}
                    </Tag>
                } else {
                    return <Tag color="default" key={priorities} style={{ margin: 0 }}>
                    {priorities}
                </Tag>
                }
            },
        },
        {
            title: 'Payments',
            dataIndex: 'payments',
            width: '10%',
            editable: true,
            render: tag => {
                if (tag === '3 of 3' || tag === '6 of 6' || tag === '12 of 12') {
                    return <Tag color="green" key={tag} style={{ margin: 0 }}>
                        {tag}
                            </Tag>
                } else if (tag === '1 of 3' || tag === '1 of 6' || tag === '1 of 12') {
                    return <Tag color="red" key={tag} style={{ margin: 0 }}>
                        {tag}
                            </Tag>
                } else {
                    return <Tag color="orange" key={tag} style={{ margin: 0 }}>
                        {tag}
                            </Tag>
                }
            },
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            inputType: 'number',
            width: '10%',
            editable: true,
            render: tag => {
                return <Tag color="blue" key={tag} style={{ margin: 0 }}>
                        {tag}
                            </Tag>
            },
        },
        {
            title: 'Paid',
            dataIndex: 'paid',
            width: '10%',
            editable: true,
            render: tag => {
                if (tag === 'Yes' || tag === 'yes') {
                    return <Tag color="green" key={tag} style={{ margin: 0 }}>
                        {tag}
                            </Tag>
                } else if (tag === 'No' || tag === 'no') {
                    return <Tag color="red" key={tag} style={{ margin: 0 }}>
                        {tag}
                            </Tag>
                } else {
                    return <Tag color="orange" key={tag} style={{ margin: 0 }}>
                        {tag}
                            </Tag>
                }
            },
        },
        {
            title: 'Operations',
            dataIndex: 'operation',
            width: '16%',
            render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
                <span style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-evenly' }}>
                    <Tag
                        size="middle"
                        color="green"
                        onClick={(e) => {
                            e.preventDefault();
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
                            <Button type="primary" size="small" ghost>
                                edit
                            </Button>
                        </Space>
                    </Typography.Link>
                    <Typography.Link onClick={() => handleDelete(record.key)}>
                        <Space>
                            <Button type="primary" size="small" danger ghost>
                                delete
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

    // Borrar tarea //
    const handleDelete = (key) => {
        const origindata = originData
        setOriginData((origindata.filter((item) => item.key !== key)))
    }

    // Crear tarea //
    const createIssue = () => {
        let valor2 = "";
        Swal.fire({
            title: 'Enter the title',
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
                    title: valor2 ? valor2 : 'Write something, please',
                    date: moment().format('DD/MM/YYYY'),
                    payments: '-',
                    amount: 0,
                    paid: 'No',
                    edit: false,
                    }
                    setOriginData([...originData, objetoNuevo])
                }
            }
        })
    }

    const ingresosPesos = originData.map((dato) => dato.amount)
    const cadaNumero = ingresosPesos.map((data) => Number(data))

    // ESTO ES EL RESULTADO DE LA TABLA //
    useEffect(() => {
        const sumaTotal = cadaNumero.reduce((a, b) => a + b, 0)
        const completedData = [
            {description: originData.title, value: sumaTotal}
        ]
        setData(completedData)
        console.log(completedData)
    })
    // -------------------------------- //

    return (
        <div style={{ marginBottom: marginBottom + 'px' }}>
            <h6>{title}</h6>
            <hr />
            <Tooltip title="Add Issue">
                <Button type="primary" shape="circle" icon={<AppstoreAddOutlined />} size="large" onClick={createIssue} style={{ marginBottom: 10 }}/>
            </Tooltip>
            <Form form={form} component={false}>
                <Table
                    size={tableSize}
                    components={{
                    body: {
                        cell: EditableCell,
                    },
                    }}
                    bordered
                    dataSource={originData}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                    onChange: cancel,
                    }}
                />
            </Form>
        </div>
    );
};

export default EditableTable;