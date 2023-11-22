import axios from "@/utils/axios";

const getBookList = async () => {
    const {data} = await axios('/books')
    return data
}

export {getBookList}