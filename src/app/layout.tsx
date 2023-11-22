"use client";

import './globals.css';
import style from './page.module.css';
import {Inter} from 'next/font/google';
import React, {useState} from "react";
import type {MenuProps} from 'antd';
import { Layout, Menu, Space, theme,Dropdown} from 'antd';
import {useRouter} from "next/navigation";
import {DownOutlined} from "@ant-design/icons";

const inter = Inter({subsets: ['latin']})
const {Header, Content, Sider} = Layout;

const Item: MenuProps['items'] = [
    {
        label: '图书管理',
        key: 'book',
        children: [
            {label: '图书列表', key: '/book'},
            {label: '添加图书', key: '/book/add'},
        ]
    }, {
        label: '借阅管理',
        key: 'borrow',
        children: [
            {label: '借阅列表', key: '/borrow'},
            {label: '借阅添加', key: '/borrow/add'},
        ]
    }, {
        label: '分类管理',
        key: 'category',
        children: [
            {label: '分类列表', key: '/category'},
            {label: '添加分类', key: '/category/add'},
        ]
    }, {
        label: '用户管理',
        key: 'user',


        children: [
            {label: '用户列表', key: '/user'},
            {label: '用户添加', key: '/user/add'},
        ]
    }
]

const items: MenuProps['items'] = [
    {
        key: '1',
        label: '用户中心',
    },
    {
        key: '2',
        label: '退出登录',
    },
];

export default function RootLayout({children}: { children: React.ReactNode }) {
    const {token: {colorBgContainer},} = theme.useToken();
    const menuKey = useState(' ');
    const router = useRouter();

    const handleMenuClick = ({key}:{key:string}) => {
        router.push(key)
    }
    return (
        <html lang="en">
        <body className={inter.className} style={{margin:0}}>
        <Layout>
            <Header style={{display: 'flex', alignItems: 'center', padding: '0 25px'}}>
                <img src="/img/logo.jpg" alt="logo" className={style.logoImg}/>
                <div className={style.demoLogo}>Kazusa图书管理系统</div>
                <Dropdown menu={{ items }} className={style.dropDown}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space style={{color:'white'}}>
                            UserId
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </Header>
            <Layout >
                <Sider width={200} className={style.aside} >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['/book']}
                        defaultOpenKeys={['book']}
                        style={{height: '100%', borderRight: 0}}
                        items={Item}
                        onClick={handleMenuClick}
                    />
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Content
                        style={{
                            padding: 24,
                            margin: '10px 0',
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius:'8px'
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        </body>
        </html>
    )
}
