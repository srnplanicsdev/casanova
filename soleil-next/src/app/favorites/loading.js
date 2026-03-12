import Skeleton from "@/components/Skeleton";

export default function FavoritesLoading() {
    return (
        <div>

            <div className="sticky top-0 z-50 bg-white border-b h-20 w-full flex items-center px-6 justify-between shadow-sm">
                <Skeleton className="h-10 w-36" />
                <div className="hidden md:flex gap-6">
                    {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-4 w-20" />)}
                </div>
                <Skeleton className="h-8 w-20" />
            </div>


            <div className="pt-30 flex flex-col items-center justify-center px-4">
                <Skeleton className="h-9 w-56 mb-3" />
                <Skeleton className="h-6 w-72 mb-10" />
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Skeleton className="h-14 w-full sm:w-64 md:w-80" />
                    <Skeleton className="h-14 w-full sm:w-64 md:w-80" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 container mx-auto px-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white overflow-hidden border border-gray-100">
                        <Skeleton className="h-52 w-full rounded-none" />
                        <div className="p-4 space-y-3">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <div className="flex gap-4 pt-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
