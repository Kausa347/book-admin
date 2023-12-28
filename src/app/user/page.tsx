"use client"
import {Button, Col, Form, Input, message, Modal, Row, Select, Table, TablePaginationConfig, Tag} from "antd";
import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {User} from "@/type";
import dayjs from "dayjs";
import {delUserList, getUserList} from "@/api";

const {confirm} = Modal;
export default function page() {
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState(Array<User>);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        showSizeChange: true,
        total: 0
    });

    const COLUMNS: ColumnsType<User> = [
        {
            title: '账号',
            dataIndex: 'name',
            key: 'userName',
            align: "center"
        }, {
            title: '用户名',
            dataIndex: 'nickName',
            key: 'nickName',
            align: "center"
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (value) =>
                value !== 'on' ? <Tag color="warning">异常</Tag> : <Tag color="success">正常</Tag>,
            align: "center",
        },
        {
            title: '创建时间',
            dataIndex: 'borrowAt',
            key: 'borrowUser',
            align: "center",
            render: (text: string) => dayjs(text).format('YYYY-MM-DD')
        }, {
            title: '操作',
            align: "center",
            dataIndex: '_id',
            render: (id: string) => (
                <>
                    <Button type='link' onClick={() => {

                    }}>编辑</Button>
                    <Button type='link' danger onClick={() => {

                    }}>禁用</Button>
                    <Button type='link' danger onClick={() => {
                        delData(id)
                    }}>删除</Button>
                </>
            ),
        }

    ];

    const getData = () => {
        getUserList().then(r => {
            setTableData(r)
            setPagination({...pagination, total: r.length})
        })
    }
    useEffect(() => {
        getData();
    }, [])
    const onFinish = () => {

    }
    const paginationChange = (value: TablePaginationConfig) => {
        setPagination({...pagination, ...value})
    }
    const delData = (id: string) => {
        confirm({
            title: '是否确认删除该分类',
            content: '删除操作无法撤销',
            onOk() {
                return delUserList(id).then(r => {
                        r === 'true' ? message.success('数据删除成功')
                            : message.error('数据删除失败');
                        getData()
                    }
                )

            },
        });

    }
    return (
        <>
            <Form
                name="basic"
                form={form}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Row>
                    <Col span={4}>
                        <Form.Item name="name" label="名称"
                                   rules={[{required: true, message: '请输入名称'}]}>
                            <Input placeholder={'请输入'}/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="status" label="状态">
                            <Select placeholder="请选择"
                                    options={[
                                        {label: '正常', value: 'on'},
                                        {label: '异常', value: 'off'}
                                    ]}/>
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
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
                                清空
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Table columns={COLUMNS} dataSource={tableData} size="middle"
                   pagination={pagination} onChange={paginationChange}
                   scroll={{y: 460, scrollToFirstRowOnChange: true}}/>
        </>

    )
}