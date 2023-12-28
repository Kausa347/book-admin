
export interface DataType {
    name: string;
    age: number;
    address: string;
}
export interface SearchType {
    name: string,
    author: string,
    tag: number
}

export interface bookListType {
    author?: string;
    current?: number;
    name?: string;
    pageSize?: number;
    tag?: string;
    [property: string]: any;
}

export interface levelType {
    name:string,
    level:number,
    parent: levelType,
    parentId:number,
}

export interface BookTopFormType {
    onFinish:Function,
    onFinishFailed:Function,
    selectOption:{value:string | number,label:string | number}[]
}


export interface borrowsList {
    _id: string;
    book: Book;
    borrowAt: string;
    status: string;
    user: User;
    [property: string]: any;
}

export interface Book {
    _id: string;
    author: string;
    cover: string;
    createdAt: number;
    description: string;
    name: string;
    publishAt: number;
    stock: number;
    type: number;
    [property: string]: any;
}

export interface User {
    _id: string;
    name: string;
    nickName: string;
    role: string;
    status: string;
    [property: string]: any;
}




