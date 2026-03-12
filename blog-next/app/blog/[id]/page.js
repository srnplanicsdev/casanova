/* eslint-disable react-hooks/exhaustive-deps */
 
"use client";
import api from "@/app/utils/api";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SelectedBlog() {
  const [selectedBlog, setSelectedBlog] = useState({});
  const { id } = useParams();
  const router = useRouter();

  const fetchBlogById = async () => {
    try {
      const res = await api.get(`blogs/${id}`);
      setSelectedBlog(res.data.blog);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
     
    fetchBlogById();
  }, []);

  const deleteBlog = async () => {
    try {
      await api.delete(`blogs/${id}`);
      router.push("/blog");
    } catch (error) {
      console.error(error);
    }
  };

  const editBlog = () => {
    router.push(`/blog/edit/${id}`);
  };

  if (!selectedBlog.id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="relative w-full">
          <button
            onClick={deleteBlog}
            className="absolute right-4 top-4 bg-red-600 rounded p-1 text-white px-2"
          >
            Delete
          </button>
          <button
            onClick={editBlog}
            className="absolute right-20 top-4 bg-blue-600 rounded p-1 text-white px-2"
          >
            Edit
          </button>
        </div>
        <div className="flex w-full justify-center">
          <div className="w-280 m-10 px-5">
            <div className="text-3xl font-bold">{selectedBlog.title}</div>
            <div className="border-t mt-3 pt-3">
              {selectedBlog.image && (
                <Image
                  className="rounded "
                  unoptimized
                  width={1200}
                  height={600}
                  src={
                    selectedBlog.image ||
                    "https://picsum.photos/seed/picsum/1200/600"
                  }
                  alt=""
                />
              )}
            </div>
            <div className=" text-justify mt-3 pt-3">
              {selectedBlog.content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
