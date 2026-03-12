/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import api from "@/app/utils/api"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditBlog() {
    const [blog, setBlog] = useState({})
    const [imagePreview, setImagePreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target
        setBlog((prev) => ({ ...prev, [name]: value }))
    }
    const fetchBlogById = async () => {
        try {
            const res = await api.get(`blogs/${id}`)
            setBlog({
                ...res.data.blog,
                isActive: res.data.blog.is_active,
                image: null
            })
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchBlogById()
    }, [])

    const removeImage = () => {
        setBlog((prev) => ({ ...prev, image: null }));
        setImagePreview(null);
    };
    const handleCheckboxChange = () => {
        setBlog(prev => ({
            ...prev,
            isActive: !prev.isActive
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setBlog((prev) => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
    };
    const updateBlog = async () => {
        setLoading(true);
        try {
            await api.put(`blogs/${id}`, {
                title: blog.title,
                content: blog.content,
                image: blog.image,
                is_active: blog.isActive,
            });
            router.push(`/blog/${id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div>
                <div className=" mt-5 p-5 mx-5">
                    <div>
                        <label htmlFor="title">Blog Title</label>
                        <input name="title" value={blog.title || ""} onChange={handleChange} type="text" className="text-xl font-bold border rounded p-2 w-full"
                            placeholder="Enter Title" />
                    </div>

                    <div>
                        <label htmlFor="content">Content</label>
                        <textarea name="content" value={blog.content || ""} onChange={handleChange} className="border rounded p-2 w-full" rows="5"
                            placeholder="Enter Content"></textarea>
                    </div>

                    <div className="inline-flex items-center cursor-pointer">
                        <span className="select-none text-sm font-medium text-heading">Set Deactive</span>
                        <label className="flex items-center cursor-pointer select-none text-dark dark:text-white mx-2">
                            <div className="relative">
                                <input type="checkbox" className="sr-only" onChange={handleCheckboxChange} />
                                <div className="block h-8 rounded-full box bg-blue-600 w-14"></div>
                                <div className={`${blog.isActive ? 'translate-x-full bg-white' : ''} absolute flex items-center justify-center w-6 h-6 transition bg-white rounded-full dot left-1 top-1`}
                                >
                                </div>
                            </div>
                        </label>
                        <span className="text-sm font-medium text-heading">Set Active</span>
                    </div>

                    <div className="mt-4" >
                        <div>
                            <label htmlFor="image">Enter an Image:</label>
                        <input className="border rounded ps-2 ms-2 bg-gray-100" type="file" name="image" accept="image/*"
                            onChange={handleImageChange} />
                        </div>
                        {imagePreview && (<div className="mt-2">
                            <Image width={300} height={200} unoptimized src={imagePreview} alt="Image Preview" className="max-h-40 rounded" />
                            <button onClick={removeImage} className="bg-red-600 w-8 h-8 p-1 rounded-full  text-white">
                                <span>🗑</span>
                            </button>
                        </div>)}
                    </div>

                    <button onClick={updateBlog} className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
                        Update Blog
                    </button>
                </div>
            </div>
        </>)
}