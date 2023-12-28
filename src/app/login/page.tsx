'use client'

import './login.css'
import {Button, Checkbox, Form, Input, message} from "antd";
import {userLogin} from "@/api";
import {useRouter} from "next/navigation";

type FieldType = {
    name?: string;
    password?: string;
    remember?: string;
};
export default  function page() {
const router  = useRouter();
    const onFinish = ({name,password}:{name:string,password:string})=> {
        userLogin({name:name,password:password}).then(r => {
            if (r !== null) {
                message.success('登录成功');
                router.push(`/book?userName=${r.name}`)
            }
        })
    }

    function onFinishFailed() {

    }

    return (
        <div className={'loginBox'}>
            <h2>Kazusa图书管理系统</h2>
            <Form
                name="basic"
                // labelCol={{span: 4}}
                // wrapperCol={{span: 14}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="账号"
                    name="name"
                    rules={[{required: true, message: '账号为空'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="密码"
                    name="password"
                    rules={[{required: true, message: '密码为空'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox>记住我</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}