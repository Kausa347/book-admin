'use client'

import {Button, Form, Input, message, Select,} from "antd";
import React, {useEffect, useState} from "react";
import {getCategoryList, newCategoryList} from "@/api/book";
import {useRouter} from "next/navigation";

const {Option} = Select;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 12},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface optionType {
    value: number,
    label: string
}

export default function page() {
    const [form] = Form.useForm();
    const [showSelect, setShowSelect] = useState('1');
    const [parentList, setParentList] = useState(Array<optionType>);
    const router= useRouter();
    const onFinish = (values: any) => {
        newCategoryList(values).then(r => {
            router.push('/category')
            message.success('创建成功')
        })
    };
    const getParentData = async () => {
        const data = await getCategoryList();
        setParentList(data.map(item => {
            return {
                value: item.parentId,
                label: item.parent.name
            }
        }))
    }
    useEffect(() => {
        getParentData();
        getCategoryList().then(r => {
        });
    }, [showSelect])


    return (
        <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            {...layout}
        >
            <Form.Item name="name" label="名称"
                       rules={[{required: true, message: '请输入名称'}]}>
                <Input placeholder={'请输入'}/>
            </Form.Item>
            <Form.Item name={'level'} label={'类别'} rules={[{required: true, message: '请输入类别'}]}>
                <Select
                    allowClear
                    onChange={(value) => {
                        setShowSelect(value)
                    }}
                    options={[{label:'级别一',value:'1'},{label:'级别二',value:'2'}]}
                >
                </Select>
            </Form.Item>
            {
                showSelect === '2' ?
                    <Form.Item name={'parent'} label={'所属类别'} rules={[{required: true, message: '请输入类别'}]}>
                        <Select
                            allowClear
                            options={parentList}
                        >
                        </Select>
                    </Form.Item> : null
            }
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{marginRight: '20px'}}>
                    创建
                </Button>
                <Button htmlType="button" onClick={() => {
                    form.resetFields();
                }}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    )
}