import Skeleton from "@/components/Skeleton";

export default function PropertiesLoading() {
    return (
        <div>
            <div className="sticky top-0 z-50 bg-white border-b h-20 w-full flex items-center px-6 justify-between shadow-sm">
                <Skeleton className="h-10 w-36" />
                <div className="hidden md:flex gap-6">
                    {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-4 w-20" />)}
                </div>
                <Skeleton className="h-8 w-20" />
            </div>
            <div className="bg-gold/10 w-full pt-40 pb-10">
                <div className="flex justify-center mb-8">
                    <Skeleton className="h-12 w-48" />
                </div>
                <div className="max-w-7xl mx-auto px-4 pb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-10 px-4">
                <div className="flex justify-between items-center mb-6">
                    <Skeleton className="h-8 w-28" />
                    <Skeleton className="h-8 w-40" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Array.from({ length: 12 }).map((_, i) => (
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
        </div>
    );
}
