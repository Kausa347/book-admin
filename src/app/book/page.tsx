'use client';

import {Button, Col, Form, Image, Input, Row, Select, Table, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import dayjs from "dayjs";
import {getBookList} from "@/api/book";

const {Option} = Select;

type FieldType = {
    username?: string;
    author?: string;
};

interface DataType {
    name: string;
    age: number;
    address: string;
}


export default function page() {
    const COLUMNS: ColumnsType<DataType> = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            align: "center"
        },
        {
            title: '封面',
            dataIndex: 'cover',
            key: 'cover',
            render: (str: string) => (
                <Image src={str} width={120}/>
            ),
            align: "center",
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            align: "center",
            width: 70
        },
        {
            title: '分类',
            dataIndex: 'tag',
            key: 'tag',
            align: "center"

        }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            align: "center",
            ellipsis: true,
            render: (text: string) => (
                <Tooltip title={text} placement={"topLeft"}>
                    <span>{text}</span>
                </Tooltip>
            )
        }, {
            title: '库存',
            dataIndex: 'stock',
            key: 'stock',
            align: "center"

        }, {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: "center",
            render: (text: string) => dayjs(text).format('YYYY-MM-DD')
        }, {
            title: '操作',
            align: "center",
            render: () => (
                <>
                    <Button type='link'>编辑</Button>
                    <Button type='link' danger>删除</Button>
                </>
            ),

        }
    ];
    const [form] = Form.useForm();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        showSizeChange: true,
        total: 0
    });
    const [formData, setFormData] = useState([]);
    useEffect(() => {
        const funcGetData = async () => {
            const data = await getBookList()
            setFormData(data)
        }
        funcGetData();
    }, [])
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                name="basic"
                form={form}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row>
                    <Col span={4}>
                        <Form.Item<FieldType>
                            label="名称"
                            name="username"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>

                    <Col span={4}><Form.Item<FieldType>
                        label="作者"
                        name="author"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input/>
                    </Form.Item></Col>

                    <Col span={4}>
                        <Form.Item name="category" label="分类">
                            <Select placeholder="请选择">
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                                <Option value="other">other</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={2}>
                        <Form.Item wrapperCol={{offset: 8, span: 16}} name={'button'}>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button htmlType="button" onClick={() => {
                                form.resetFields()
                            }}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Table columns={COLUMNS} dataSource={formData} size="middle"/>
        </>
    );
}