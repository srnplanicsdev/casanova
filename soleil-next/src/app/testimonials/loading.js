import Skeleton from "@/components/Skeleton";

export default function TestimonialsLoading() {
    return (
        <div>

            <div className="sticky top-0 z-50 bg-white border-b h-20 w-full flex items-center px-6 justify-between shadow-sm">
                <Skeleton className="h-10 w-36" />
                <div className="hidden md:flex gap-6">
                    {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-4 w-20" />)}
                </div>
                <Skeleton className="h-8 w-20" />
            </div>

            <div className="flex justify-center mt-20 mb-10 px-4">
                <Skeleton className="h-14 w-72 mx-auto" />
            </div>

            <div className="container mx-auto px-4 max-w-4xl space-y-10">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-6 gap-4 w-full py-6 border-b border-gray-100">

                        <div className="col-span-1 flex justify-center sm:justify-start pt-2">
                            <Skeleton className="w-20 h-20 rounded-full" />
                        </div>
                        <div className="col-span-5 flex flex-col gap-3 ps-0 sm:ps-5">
                            <Skeleton className="h-7 w-48" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-5 w-28 mt-2" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-3 my-10">
                {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-8 w-8 rounded-full" />)}
            </div>

            <Skeleton className="w-full h-80 rounded-none" />
        </div>
    );
}
