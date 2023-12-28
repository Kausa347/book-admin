'use client'
import {Button, Col, Form, message, Modal, Row, Select, Table, TablePaginationConfig, Tag} from "antd";
import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {borrowsList,} from "@/type";
import {delBorrowsList,  getBookList, getBorrowsList, getUserList} from "@/api";

const {confirm} = Modal;
import dayjs from "dayjs";

export default function page() {
    const [tableData, setTableData] = useState(Array<borrowsList>);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        showSizeChange: true,
        total: 0
    });
    const [bookList, setBookList] = useState(Array<{ label: string, value: string }>);
    const [borrowUser, setBorrowUser] = useState(Array<{ label: string, value: string }>);
    const [form] = Form.useForm();
    const COLUMNS: ColumnsType<borrowsList> = [
        {
            title: '书籍名称',
            dataIndex: ['book', 'name'],
            key: 'bookName',
            align: "center"
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (value) =>
                value === 'magna ipsum' ? <Tag color="warning">借出</Tag> : <Tag color="success">归还</Tag>,
            align: "center",
        },
        {
            title: '书籍作家',
            dataIndex: ['book', 'author'],
            key: 'borrowUser',
            align: "center",
        },
        {
            title: '借阅人',
            dataIndex: ['user', 'name'],
            key: 'borrowUser',
            align: "center",
        },
        {
            title: '借阅时间',
            dataIndex: 'borrowAt',
            key: 'borrowUser',
            align: "center",
            render: (text: string) => dayjs(text).format('YYYY-MM-DD')
        }, {
            title: '归还时间',
            dataIndex: 'backAt',
            key: 'backAt',
            align: "center",
            render: (text: string) => text === null || text === undefined ? '-' : dayjs(text).format('YYYY-MM-DD')
        }, {
            title: '操作',
            align: "center",
            dataIndex: '_id',
            render: (id: string) => (
                <>
                    <Button type='link' onClick={() => {

                    }}>编辑</Button>
                    <Button type='link' danger onClick={() => {
                        delData(id)
                    }}>删除</Button>
                </>
            ),
        }

    ];
    const getData = () => {
        getBorrowsList().then(r => {
            setTableData(r)
            setPagination({...pagination, total: r.length})
        })
    }
    useEffect(() => {
        getData();

        getBookList().then(r => {
            setBookList(r.map(item => {
                return {label: item.name, value: item._id}
            }))
        })
        getUserList().then(r => {
            setBorrowUser(r.map(item => {
                return {label: item.name, value: item.name}
            }))
        })
    }, [])

    const paginationChange = (value: TablePaginationConfig) => {
        setPagination({...pagination, ...value})
    }

    function onFinish() {

    }

    function onFinishFailed() {

    }

    const delData = (id: string) => {
        confirm({
            title: '是否确认删除该分类',
            content: '删除操作无法撤销',
            onOk() {
                return delBorrowsList(id).then(r => {
                        message.success('数据删除成功')
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
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Row>
                <Col span={4}>
                    <Form.Item name="name" label="图书名称">
                        <Select placeholder="请选择"
                                showSearch
                                options={bookList}>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name="status" label="状态">
                        <Select placeholder="请选择"
                                options={[
                                    {label: '借出', value: 'magna ipsum'},
                                    {label: '归还', value: 'eiusmod'}
                                ]}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name="borrowUser" label="借阅人">
                        <Select placeholder="请选择"
                                showSearch
                                options={borrowUser}/>
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