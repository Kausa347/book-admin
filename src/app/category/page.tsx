'use client'
import {BookTopForm} from "@/components/BookTopForm";
import React, {useEffect, useState} from "react";
import {Button, message, Modal, Table, TablePaginationConfig, Tag} from "antd";
import {ColumnsType} from "antd/es/table";
import {DataType,} from "@/type";
import dayjs from "dayjs";
import {delCategoryList, getCategoryList} from "@/api/book";
import {useRouter} from "next/navigation";

const {confirm} = Modal;

const selectOption = [{value: 1, label: '类别一'}, {value: 2, label: '类别二'}]
export default function page() {

    const router = useRouter();
    const COLUMNS: ColumnsType<DataType> = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            align: "center"
        },
        {
            title: '级别',
            dataIndex: 'level',
            key: 'level',
            align: "center",
            width: 70,
            render: (value) =>
                value === 1 ? <Tag color="success">级别一</Tag> : <Tag color="warning">级别二</Tag>
        },
        {
            title: '所属分类',
            dataIndex: 'parent',
            key: 'parent',
            align: "center",
            render: (value: { name: string }) => value.name ? value.name : '-'

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
                        router.push(`/edit/category/${id}`)
                    }}>编辑</Button>
                    <Button type='link' danger onClick={() => {
                        delData(id)
                    }}>删除</Button>
                </>
            ),

        }
    ];
    const [tableData, setTableData] = useState(Array<any>);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        showSizeChange: true,
        total: 0
    });
    const funcGetData = async (params?: object) => {
        const data = await getCategoryList(params)
        setTableData(data)
        setPagination({...pagination, total: data.length})
    }

    useEffect(() => {
        funcGetData({current: 1, pageSize: pagination.pageSize}).then(() => {
            message.success('数据获取成功')
        })
    }, [])

    const paginationChange = (value: TablePaginationConfig) => {
        setPagination({...pagination, ...value})
    }
    const onFinish = (value: { tag: number }) => {
        funcGetData({...value, level: value.tag})
    }
    const onFinishFailed = () => {
        funcGetData({current: 1, pageSize: pagination.pageSize});
        setPagination({...pagination, current: 1})
    }
    const delData = (id: string) => {
        confirm({
            title: '是否确认删除该分类',
            content: '删除操作无法撤销',
            onOk() {
                return delCategoryList(id).then(r => {
                        r === 'true' ? message.success('数据删除成功') :
                            message.warning('数据删除失败')
                        funcGetData(pagination)
                    }
                )
            },
        });
    }
    return (
        <>
            <BookTopForm onFinish={onFinish} onFinishFailed={onFinishFailed}
                         selectOption={selectOption}/>
            <Table columns={COLUMNS} dataSource={tableData} size="middle"
                   pagination={pagination} onChange={paginationChange}
                   scroll={{y: 460, scrollToFirstRowOnChange: true}}/>
        </>
    )
}