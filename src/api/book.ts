import axios from "@/utils/axios";
import qs from 'qs'
import {Book, borrowsList, levelType, User} from "@/type";

export const getBookList = async (params?: object) => {
    const {data}: { data: Book[] } = await axios('/books?' + qs.stringify(params));
    return data
}

export const addBook = async (Book: Book) => {
    const {data} :{data:Book} = await axios.post('/books', Book);
    return data
}

export const getBookDetail = async (id: string) => {
    const {data}: { data: Book } = await axios(`/books/${id}`);
    return data
}

export const delBookList = async (id: string) => {
    const {success} = await axios.delete(`/books/${id}`);
    return success
}

export const getCategoryList = async (params?: object) => {
    const {data}: { data: levelType[] } = await axios('/categories?' + qs.stringify(params));
    return data
}

export const newCategoryList = async (params?: object) => {
    const {data} = await axios.post(`/categories`);
    return data
}

export const delCategoryList = async (id: string) => {
    const {success} = await axios.delete(`/categories/${id}`);
    return success
}

export const getBorrowsList = async () => {
    const {data} : { data: borrowsList[] } = await axios('/borrows?');
    return data
}

export const delBorrowsList = async (id: string) => {
    const {success} = await axios.delete(`/borrows/${id}`);
    return success
}

export const getUserList = async () => {
    const {data}: { data: User[] } = await axios('/users');
    return data
}

export const delUserList = async (id: string) => {
    const {success}: { success: string } = await axios.delete(`/users/${id}`);
    return success
}

export const userLogin = async ({name,password}:{name:string,password:string}) => {
    const {data} :{data:User} = await axios.post('/login',{name:name,password:password});
    return data
}

export const logOff = async () => {
    const {success} = await  axios.get('/logout');
    return success
}

