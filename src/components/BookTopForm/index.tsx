import {Button, Col, Form, Input, Row, Select} from "antd";
import React from "react";
import {BookTopFormType, SearchType} from "@/type";
import {usePathname} from "next/navigation";

export const BookTopForm = ({onFinish, onFinishFailed, selectOption}: BookTopFormType) => {
    const pathname = usePathname();
    const [form] = Form.useForm();
    return (
        <Form
            name="basic"
            form={form}
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{remember: true}}
            // @ts-ignore
            onFinish={onFinish}
            // @ts-ignore
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Row>
                <Col span={4}>
                    <Form.Item<SearchType>
                        label="名称"
                        name="name"
                        // rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                {pathname === '/book' ?
                    <Col span={4}>
                        <Form.Item<SearchType>
                            label="作者"
                            name="author"
                        >
                            <Input/>
                        </Form.Item></Col> : null}

                <Col span={4}>
                    <Form.Item<SearchType> name="tag" label="分类">
                        <Select placeholder="请选择" options={selectOption}>
                        </Select>
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
    )
}