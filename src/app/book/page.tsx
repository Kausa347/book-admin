'use client';

import {Button, Image, message, Table,TablePaginationConfig, Tooltip} from "antd";
import React, {useEffect,useState} from "react";
import {ColumnsType} from "antd/es/table";
import dayjs from "dayjs";
import {delCategoryList,  getBookList, getCategoryList} from "@/api/book";
import {BookTopForm} from "@/components/BookTopForm";
import {Book, SearchType} from "@/type";
import {useRouter} from "next/navigation";
import axios from "@/utils/axios";

export default function page() {
    const router = useRouter()
    const COLUMNS: ColumnsType<Book> = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            align: "center"
        },
        {
            title: '封面',
            dataIndex: 'cover',
            key: 'cover',
            render: (str: string) => (
                <Image src={str} width={120}/>
            ),
            align: "center",
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            align: "center",
            width: 70
        },
        {
            title: '分类',
            dataIndex: 'type',
            key: 'type',
            align: "center"

        }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            align: "center",
            ellipsis: true,
            render: (text: string) => (
                <Tooltip title={text} placement={"topLeft"}>
                    <span>{text}</span>
                </Tooltip>
            )
        }, {
            title: '库存',
            dataIndex: 'stock',
            key: 'stock',
            align: "center"

        }, {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: "center",
            render: (text: string) => dayjs(text).format('YYYY-MM-DD')
        }, {
            title: '操作',
            align: "center",
            dataIndex: '_id',
            render: (id: string) => (
                <>
                    <Button type='link' onClick={() => {
                        router.push(`/edit/book/${id}`)
                    }}>编辑</Button>
                    <Button type='link' danger onClick={() => {
                        delData(id)
                    }}>删除</Button>
                </>
            ),
        }
    ];
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        showSizeChange: true,
        total: 0
    });
    const [tableData, setTableData] = useState(Array<Book>);
    const [categoryList,setCategoryList] = useState(Array<{label:string,value:string| number}>)
    useEffect(() => {
        const funcGetData = async () => {
            const data = await getBookList({current: 1, pageSize: pagination.pageSize})
            setTableData(data)
        }
        getCategoryList().then(r => {
            setCategoryList(r.map(item => {
                return {value:item.parent.parentId,label:item.parent.name}
            }))
        });
        funcGetData();

        axios.get('/books').then(r => {
            console.log(r)
        })
    }, [])
    const onFinish = async (values: SearchType) => {
        const bookList = await getBookList({...values, current: 1, pageSize: pagination.pageSize});
        setTableData(bookList);
        setPagination({...pagination, current: 1, total: bookList.length})
    };

    const onFinishFailed = async () => {
        const bookList = await getBookList({current: 1, pageSize: pagination.pageSize});
        setTableData(bookList);
        setPagination({...pagination, current: 1, total: bookList.length})
    };

    const paginationChange = (value: TablePaginationConfig) => {
        setPagination({...pagination, ...value})
    }
    const delData = (id: string) => {
        delCategoryList(id).then(r =>
            r === 'true' ? message.success('数据删除成功') :
                message.error('数据删除失败')
        )
        getBookList(pagination)
    }
    return (
        <>
            <BookTopForm onFinish={onFinish} onFinishFailed={onFinishFailed}
                         selectOption={categoryList}></BookTopForm>
            <Table columns={COLUMNS} dataSource={tableData} size="middle"
                   pagination={pagination} onChange={paginationChange}
                   scroll={{y: 460, scrollToFirstRowOnChange: true}}/>
        </>
    );
}