"use client"
import {BookForm} from "@/components/BookForm";
import {useParams, usePathname, useRouter} from "next/navigation";

export default function page({params}:any) {
    const router= useRouter();
    const a = useParams();
    const n = usePathname();
    return (
        <BookForm/>
    );
}