import Skeleton from "@/components/Skeleton";

export default function SellWithUsLoading() {
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

            <div className="mt-10 flex flex-col items-center gap-5 px-4 lg:mx-100">
                <Skeleton className="h-14 w-2/3 mx-auto" />
                <Skeleton className="h-4 w-full max-w-xl mx-auto" />
                <Skeleton className="h-4 w-3/4 max-w-xl mx-auto" />
            </div>

            <div className="container mx-auto px-4 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border border-gray-100 bg-white p-6 space-y-3">
                            <Skeleton className="h-20 w-20" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center mt-10">
                <Skeleton className="h-24 w-80" />
            </div>

            <div className="bg-gold/10 py-10 mt-10">
                <div className="flex flex-col items-center gap-5 px-4">
                    <Skeleton className="h-14 w-64 mx-auto mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mx-auto">
                        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
                    </div>
                    <Skeleton className="h-14 w-64 mx-auto mt-4" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mx-auto">
                        {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
                    </div>
                    <Skeleton className="h-12 w-44 mt-4" />
                </div>
            </div>

            <Skeleton className="w-full h-80 rounded-none mt-10" />
        </div>
    );
}
