/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Blogcard from "./components/Blogcard";
import api from "./utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthGuard from "./components/AuthGuard";

export default function Home() {
  const [blogs, setblogs] = useState([]);
  const router = useRouter()

  const fetchBlog = async () => {
    try {
      const res = await api.get("/blogs");
      setblogs(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  const handleLogOut = async () => {
    try {
      await api.post("/logout")
      router.push('/auth/login')
    } catch (error) {

    }
  }
  return (
    <AuthGuard>
      <div>
        <div className="flex justify-between items-center mx-12 px-12 dark:bg-gray-900">
          <span className="text-3xl font-semibold">Blog</span>
          <div className="flex items-center">
            <Link href={"/blog/create"}>
              <button className="text-lg text-white bg-blue-600 p-2 rounded flex items-center">
                Create blog
              </button>
            </Link>
            <div className="group relative cursor-pointer py-2">
              <div className="flex items-center justify-between space-x-5 px-4">
                <a className="menu-hover my-2 py-2 text-base font-medium text-black lg:mx-4">
                  <Image
                    fill={true}
                    className=" ms-3 rounded-full h-10 border"
                    unoptimized
                    src="https://api.dicebear.com/7.x/bottts/svg?seed=mail@ashallendesign.co.uk"
                    alt="image"
                  />
                </a>
              </div>

              <div className="invisible absolute z-50 flex w-25 flex-col bg-white py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
                <button onClick={handleLogOut} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 m-7">
          {blogs.map((blog) => (
            <div key={blog.id}>
              <Link href={`/blog/${blog.id}`}><Blogcard blog={blog} onclick="handleBlog(blog.id)" /></Link>
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}
