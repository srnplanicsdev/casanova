import Skeleton from "@/components/Skeleton";

export default function RegionSkeleton() {
    return (
        <div className="container mx-auto px-4 py-12">

            <div className="flex justify-center mb-10">
                <Skeleton className="h-12 w-96" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="relative overflow-hidden">
                        <Skeleton className="w-full h-72 rounded-none" />
                        <div className="absolute bottom-5 left-5 right-5">
                            <Skeleton className="h-14 w-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
