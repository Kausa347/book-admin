"use client"

import {BookForm} from "@/components/BookForm";
import {useEffect, useState} from "react";
import {addBook, getCategoryList} from "@/api";
import {Book} from "@/type";

const config = {
    rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
};

export default function page() {
    const [selectOption,setSelectOption] = useState(Array<{label:string,value:string| number}>)
    useEffect(() => {
        getCategoryList().then(r => {
            setSelectOption(r.map(item => {
                return {value:item.parent.parentId,label:item.parent.name}
            }))
        });
    }, [])

    function onFinish(value:Book) {
        console.log(value);
    addBook(value).then(r => {
        console.log(r)
    })
    }

    return (
        <BookForm selectOption={selectOption} onFinish={onFinish}/>
    );
}