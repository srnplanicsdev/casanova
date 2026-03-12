import Skeleton from "@/components/Skeleton";

export default function NewPropertyCardSkeleton() {
    return (
        <div className="mt-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto px-4 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="relative overflow-hidden">
                    <Skeleton className="w-full h-80 rounded-none" />

                    <div className="absolute bottom-5 left-5 right-5">
                        <Skeleton className="h-16 w-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}
