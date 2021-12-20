import React, { useState, useContext, useEffect } from 'react'
import { Input, Button, Popconfirm, Form, Table, Tag, Space, Tooltip, InputNumber, Typography, notification, Spin } from 'antd';
import { CheckCircleOutlined, AppstoreAddOutlined, DollarOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import moment from 'moment';
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from '../../config/firebase/firebase';

const EditableTable = ({ tableSize, data, marginBottom, title, response, tables, id }) => {

    // Guardar datos en un nuevo array //
    const [originData, setOriginData] = useState(data.length <= 0 ? [] : data);
    const [numTotal, setNumTotal] = useState(0);
    const [loading, setLoading] = useState(originData.length <= 0 ? true : false)

    useEffect(() => {
        setLoading(true)

        const map1 = originData.map((dato) => dato.amount)
        const cadaNumero1 = map1.map((data) => Number(data))
        // ESTO ES EL RESULTADO DE LA TABLA //
        const total = cadaNumero1.reduce((a, b) => a + b, 0)
        setNumTotal(total)
        // Actualiza el valor total de cada tabla con useState en variable de afuera de UseEffect //
        // console.log('Total:', total)

        setLoading(false)
    }, [originData])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true)

    //         // const docRefs = [];

    //         // // TODAS LAS TABLAS Y SU VALOR INICIAL AGREGANDO A LA DB SU KEY CUANDO SE LLAMAN //
    //         // const finances = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances"));
    //         // finances.docs.map((user) => {
    //         //     const docRef = user.id
    //         //     docRefs.push(docRef)
    //         //     // AGREGANDO KEY A CADA TABLA //
    //         //     const changeData = async () => {
    //         //         await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/${docRef}`), {
    //         //             key: user.id
    //         //         })
    //         //     }

    //         //     changeData()
    //         //     return user.data()
    //         // })
            
    //         // const querySnapshot1 = await getDocs(collection(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/9TBYGFRDRJFwjxA1USPU/data`));
    //         // querySnapshot1.docs.map((user) => {
    //         //     const docRef = user.id
    //         //     // AGREGANDO DOCUMENT_UID A CADA TABLA //
    //         //     const changeData = async () => {
    //         //         await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/9TBYGFRDRJFwjxA1USPU/data/${docRef}`), {
    //         //             document_uid: docRefs[0]
    //         //         })
    //         //     }
                
    //         //     changeData()
    //         //     return user.data()
    //         // });

    //         // const querySnapshot2 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/BvyanCMS8MKu8D5WcXyP/data"));
    //         // querySnapshot2.docs.map((user) => {
    //         //     const docRef = user.id
    //         //     // AGREGANDO DOCUMENT_UID A CADA TABLA //
    //         //     const changeData = async () => {
    //         //         await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/BvyanCMS8MKu8D5WcXyP/data/${docRef}`), {
    //         //             document_uid: docRefs[1]
    //         //         })
    //         //     }
                
    //         //     changeData()
    //         //     return user.data()
    //         // });

    //         // const querySnapshot3 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/LGpRronvr4zYOElPgJeF/data"));
    //         // querySnapshot3.docs.map((user) => {
    //         //     const docRef = user.id
    //         //     // AGREGANDO DOCUMENT_UID A CADA TABLA //
    //         //     const changeData = async () => {
    //         //         await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/LGpRronvr4zYOElPgJeF/data/${docRef}`), {
    //         //             document_uid: docRefs[2]
    //         //         })
    //         //     }
                
    //         //     changeData()
    //         //     return user.data()
    //         // });

    //         // const querySnapshot4 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/RQX6AtMfFk7yIEq4hXpg/data"));
    //         // querySnapshot4.docs.map((user) => {
    //         //     const docRef = user.id
    //         //     // AGREGANDO DOCUMENT_UID A CADA TABLA //
    //         //     const changeData = async () => {
    //         //         await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/RQX6AtMfFk7yIEq4hXpg/data/${docRef}`), {
    //         //             document_uid: docRefs[3]
    //         //         })
    //         //     }
                
    //         //     changeData()
    //         //     return user.data()
    //         // });

    //         // const querySnapshot5 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/hNoiZsmoq5vRgapQAsve/data"));
    //         // querySnapshot5.docs.map((user) => {
    //         //     const docRef = user.id
    //         //     // AGREGANDO DOCUMENT_UID A CADA TABLA //
    //         //     const changeData = async () => {
    //         //         await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/hNoiZsmoq5vRgapQAsve/data/${docRef}`), {
    //         //             document_uid: docRefs[4]
    //         //         })
    //         //     }
                
    //         //     changeData()
    //         //     return user.data()
    //         // });

    //         // const querySnapshot6 = await getDocs(collection(db, "users/4Wl0ABf75BtglqcPOtJT/personal_finances/nWega9E8ey7sZiCT23sE/data"));
    //         // querySnapshot6.docs.map((user) => {
    //         //     const docRef = user.id
    //         //     // AGREGANDO KEY A CADA TABLA //
    //         //     const changeData = async () => {
    //         //         await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/nWega9E8ey7sZiCT23sE/data/${docRef}`), {
    //         //             document_uid: docRefs[5]
    //         //         })
    //         //     }
                
    //         //     changeData()
    //         //     return user.data()
    //         // });

    //         setLoading(false)
    //     }

    //     fetchData()
    // }, [])

    const findUid = () => {
        switch(id) {
            case 0: {
                return '9TBYGFRDRJFwjxA1USPU'
            }
            case 1: {
                return 'BvyanCMS8MKu8D5WcXyP'
            }
            case 2: {
                return 'LGpRronvr4zYOElPgJeF'
            }
            case 3: {
                return 'RQX6AtMfFk7yIEq4hXpg'
            }
            case 4: {
                return 'hNoiZsmoq5vRgapQAsve'
            }
            case 5: {
                return 'nWega9E8ey7sZiCT23sE'
            }
        }
    }

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
    const openNotification = (reason) => {
        notification.open({
            message: reason === 'success' ? 'Successful change' : 'Successful deleted',
            description:
                reason === 'success' ? 'Your change has been made.' : 'Your issue has been deleted',
            icon: reason === 'success' ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> : <DeleteOutlined style={{ color: 'red' }} />,
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

                // Edit task in Firebase //
                const editedTask = newData.find((task) => task.key === key)

                // Searching document UID //
                await getDocs(collection(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/${findUid()}/data`));
                await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/${findUid()}/data/${editedTask.uid}`), editedTask)

                setOriginData(newData);
                setEditingKey('');
                openNotification('success');
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
                            save(record.key);
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

    const findNumber = () => {
        const numbersInArray = []
        originData.map(num => numbersInArray.push(num.id))
        const numeroMaximo = Math.max(...numbersInArray);

        return numeroMaximo <= 0 ? 1 : numeroMaximo + 1
    }
    
    // Borrar tarea //
    const handleDelete = async (key) => {
        setLoading(true)

        const searched = originData.filter(x => x.id === Number(key))

        await deleteDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/${findUid()}/data/${searched[0].uid}`));

        setOriginData((originData.filter((item) => item.key !== key)))

        setLoading(false)
        openNotification('deleted');
    }

    // Crear tarea //
    const createIssue = () => {

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
                try {
                    // Create task in Firebase //
                    const createTask = async () => {
                        setLoading(true)

                        const docRef = await addDoc(collection(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/${findUid()}/data`), {
                            id: findNumber(),
                            key: String(findNumber()),
                            title: value,
                            date: moment().format('DD/MM/YYYY'),
                            payments: '-',
                            amount: 0,
                            paid: 'No',
                            edit: false
                        });

                        // Create in App //
                        const objetoNuevo = {
                            id: findNumber(),
                            key: String(findNumber()),
                            title: value ? value : 'Write something, please',
                            date: moment().format('DD/MM/YYYY'),
                            payments: '-',
                            amount: 0,
                            paid: 'No',
                            document_uid: findUid(),
                            uid: docRef.id,
                            edit: false,
                        }

                        await updateDoc(doc(db, `users/4Wl0ABf75BtglqcPOtJT/personal_finances/${findUid()}/data/${docRef.id}`), {
                            uid: docRef.id,
                            document_uid: tables[id].key
                        })

                        setOriginData([...originData, objetoNuevo])
                        
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

    // -------------------------------- //

    if (loading === false && originData) {
    return (
        <div style={{ marginBottom: marginBottom + 'px' }}>
            <h6>{title} <Button type="primary" ghost onClick={() => response(numTotal)}>Total: ${numTotal}</Button></h6>
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
    } else {
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin size="large" tip="Loading..." />
            </div>
        )
    }
};

export default EditableTable;