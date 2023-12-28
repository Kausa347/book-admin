'use client'

import {Button, Form, Select,} from "antd";
import React, {useEffect, useState} from "react";
import {getBookDetail, getBookList, getUserList} from "@/api/book";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;


const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 12},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface T {
    value: number | string,
    label: string | number
}

export default function page() {
    const [form] = Form.useForm();
    const [bookList, setBookList] = useState(Array<T>);
    const [userList, setUserList] = useState(Array<T>);
    const [inventory, setInventory] = useState(-1);
    const onFinish = (values: any) => {
        console.log({...values,});
    };
    const getBookNum = (id: string) => {
        getBookDetail(id).then(r => {
            setInventory(r.stock);
        })
    }

    useEffect(() => {
        getBookList().then(r => {
            setBookList(r.map(item => {
                return {label: item.name, value: item._id}
            }))
        })
        getUserList().then(r => {
            setUserList(r.map(item => {
                return {label: item.name, value: item.name}
            }))
        })
    }, [])

    return (
        <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            {...layout}
        >
            <Form.Item name='bookName' label={'书籍名称'} rules={[{required: true,}]}>
                <Select
                    allowClear
                    showSearch
                    options={bookList}
                    onChange={(value) => {
                        getBookNum(value);
                        console.log(value)
                    }}
                />
            </Form.Item>
            <Form.Item name={'borrowUser'} label={'借阅用户'} rules={[{required: true}]}>
                <Select
                    allowClear
                    options={userList}
                >
                </Select>
            </Form.Item>
            {
                inventory !== -1 ? <Form.Item label={'书籍库存'}>{inventory}</Form.Item> : null
            }
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{marginRight: '20px'}}>
                    创建
                </Button>
                <Button htmlType="button" onClick={() => {
                    form.resetFields();
                }}>
                    清空
                </Button>
            </Form.Item>
        </Form>
    )
}