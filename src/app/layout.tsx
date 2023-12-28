"use client";

import './globals.css';
import style from './page.module.css';
import {Inter} from 'next/font/google';
import React from "react";
import type {MenuProps} from 'antd';
import {Layout, Menu, Space, theme, Dropdown, message} from 'antd';
import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import {DownOutlined} from "@ant-design/icons";
import {PageTitle} from  '@/components/PageTitle'
import {logOff} from "@/api";

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
            {label: '书籍借阅', key: '/borrow/add'},
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
export default  function RootLayout({children}: { children: React.ReactNode }) {
    const {token: {colorBgContainer},} = theme.useToken();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const userName = searchParams.get('userName')
    const handleMenuClick = ({key}: { key: string }) => {
        router.push(key)
    }
    const onClick:MenuProps['onClick'] = ({key}) => {
        switch (key) {
            case '2':
                logOff().then(r => {
                        message.success('成功退出');
                        router.push('/login');
                })
        }
    }
    return (
        <html lang="en">
        <body className={inter.className} style={{margin: 0}}>
        {
            pathname === '/login' ? children : <Layout>
                <Header style={{display: 'flex', alignItems: 'center', padding: '0 25px'}}>
                    <img src="/img/logo.jpg" alt="logo" className={style.logoImg}/>
                    <div className={style.demoLogo}>Kazusa图书管理系统</div>
                    <Dropdown menu={{items,onClick}} className={style.dropDown}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space style={{color: 'white'}}>
                                {userName}
                                <DownOutlined/>
                            </Space>
                        </a>
                    </Dropdown>
                </Header>
                <Layout>
                    <Sider width={200} className={style.aside}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[pathname]}
                            defaultOpenKeys={[pathname.slice(1,pathname.length)]}
                            style={{height: '100%', borderRight: 0}}
                            items={Item}
                            onClick={handleMenuClick}
                        />
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <PageTitle/>
                        <Content
                            style={{
                                padding: 24,
                                minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: '8px'
                            }}
                        >
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        }
        </body>
        </html>
    )
}
