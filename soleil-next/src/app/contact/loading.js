import Skeleton from "@/components/Skeleton";

export default function ContactLoading() {
    return (
        <div>

            <div className="sticky top-0 z-50 bg-white border-b h-20 w-full flex items-center px-6 justify-between shadow-sm">
                <Skeleton className="h-10 w-36" />
                <div className="hidden md:flex gap-6">
                    {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-4 w-20" />)}
                </div>
                <Skeleton className="h-8 w-20" />
            </div>

            <div className="w-full min-h-screen py-30 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="bg-white shadow-xl p-6 md:p-10 space-y-5">
                            <Skeleton className="h-14 w-3/4 mx-auto" />
                            <Skeleton className="h-14 w-full" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Skeleton className="h-14 w-full" />
                                <Skeleton className="h-14 w-full" />
                            </div>
                            <Skeleton className="h-28 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-32" />
                        </div>
                        <div className="flex flex-col gap-8 p-6">
                            <Skeleton className="h-14 w-2/3 mx-auto" />
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <Skeleton className="h-6 w-36" />
                                    <Skeleton className="h-5 w-52" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-20 px-4">
                <Skeleton className="h-12 w-48 mx-auto mb-10" />
                <Skeleton className="w-full max-w-5xl mx-auto h-[500px] rounded-none" />
            </div>
            <Skeleton className="w-full h-80 rounded-none" />
        </div>
    );
}
