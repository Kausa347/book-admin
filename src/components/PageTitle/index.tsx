import {Button} from "antd";
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

type pathName = '/book' | '/book/add'

export const PageTitle = () => {
    const pathname = usePathname() as pathName;
    const titleMap = {
        '/book': '图书列表',
        '/book/add': '添加图书',
        '/category': '分类列表',
        '/category/add': '分类添加',
        '/borrow': '借阅列表',
        '/borrow/add': '借阅添加',
    }

    const [title, setTile] = useState('图书列表')
    useEffect(() => {
        setTitle()
    }, [pathname])
    const setTitle = () => {
        if (pathname.includes('/edit/book') || pathname.includes('/edit/category')) {
            setTile('修改内容')
        } else {
            setTile(titleMap[pathname])
        }
    }
    return (
        <div style={{display: "flex", height: 65, justifyContent: "space-between", alignItems: "center"}}>
            <h2 style={{fontWeight: 500}}>{title}</h2>
            {title === '图书列表' ? <Button type={"primary"}>添加图书</Button> : null}
        </div>
    )
}

