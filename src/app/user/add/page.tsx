'use client'
import {Button,  Form, Input, Radio} from "antd";
import React from "react";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 12},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};
export default function page() {
    const [form] = Form.useForm();

    const onFinish = (value: object) => {
        console.log(value)
    }
    return (
        <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            {...layout}
        >
            <Form.Item name='account' label={'账号'} rules={[{required: true, message: '账号为空'}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={'name'} label={'名称'} rules={[{required: true, message: '名称为空'}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={'gender'} label={'性别'}>
                <Radio.Group>
                    <Radio value={'man'}>男</Radio>
                    <Radio value={'woman'}>女</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item name={'password'} label={'密码'} rules={[{required: true, message: '密码为空'}]}>
                <Input.Password/>
            </Form.Item>
            <Form.Item name={'status'} label={'状态'}>
                <Radio.Group>
                    <Radio value={'able'}>启用</Radio>
                    <Radio value={'disable'}>禁用</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item name={'type'} label={'角色'}>
                <Radio.Group>
                    <Radio value={'user'}>用户</Radio>
                    <Radio value={'adminer'}>管理员</Radio>
                </Radio.Group>
            </Form.Item>
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