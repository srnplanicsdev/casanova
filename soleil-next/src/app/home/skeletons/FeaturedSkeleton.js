import Skeleton from "@/components/Skeleton";

export default function FeaturedSkeleton() {
    return (
        <div className="container mx-auto px-4 py-12">

            <div className="flex justify-center mb-10">
                <Skeleton className="h-10 w-72" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                        <Skeleton className="h-56 w-full rounded-none" />
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
            <div className="flex justify-center gap-4 mt-8">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-10" />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <Skeleton className="h-12 w-52" />
            </div>
        </div>
    );
}
