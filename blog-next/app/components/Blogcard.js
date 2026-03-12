import Image from "next/image";

export default function Blogcard({blog}){
return(<>
  <div className="rounded-md shadow-sm dark:shadow-gray-50 p-3">
        <div className="w-full overflow-hidden">
            <Image width={900} height={300} unoptimized className="w-full h-full rounded object-cover"
                src="https://picsum.photos/seed/picsum/900/300" alt="" />
        </div>
        <div>
            <span className="text-lg font-semibold">{
                blog.title || "Lorem Ipsum"
                }</span>
        </div>
        <div>
            <p className="truncate w-full">
                {
                    blog.content ||
                `What is Lorem Ipsum?
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
                `
                }
            </p>
        </div>
        <div className="flex justify-end text-gray-500">
            Made by { blog.user?.name || " Lorem Ipsum" }
        </div>
    </div>
</>)
}