import Skeleton from "@/components/Skeleton";

export default function ServicesLoading() {
    return (
        <div>

            <div className="sticky top-0 z-50 bg-white border-b h-20 w-full flex items-center px-6 justify-between shadow-sm">
                <Skeleton className="h-10 w-36" />
                <div className="hidden md:flex gap-6">
                    {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-4 w-20" />)}
                </div>
                <Skeleton className="h-8 w-20" />
            </div>

            <Skeleton className="w-full h-screen rounded-none" />

            <div className="flex flex-col items-center gap-5 mt-20 container mx-auto px-4">
                <Skeleton className="h-14 w-2/3 mx-auto" />
                <Skeleton className="h-4 w-full max-w-4xl mx-auto" />
                <Skeleton className="h-4 w-3/4 max-w-4xl mx-auto" />
            </div>

            <div className="bg-gold/10 mt-10 py-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="bg-white p-6 space-y-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center mt-20 px-4 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
                    <div className="flex flex-col gap-5">
                        <Skeleton className="h-14 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-12 w-44 mt-3" />
                    </div>
                    <Skeleton className="w-full h-80 rounded-none" />
                </div>
            </div>

            <Skeleton className="w-full h-80 rounded-none mt-20" />
        </div>
    );
}
