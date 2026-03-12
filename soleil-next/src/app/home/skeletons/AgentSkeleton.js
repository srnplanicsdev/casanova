import Skeleton from "@/components/Skeleton";

export default function AgentSkeleton() {
    return (
        <div className="bg-gold/10 py-10 mt-20">
            <div className="max-lg:container max-lg:mx-auto max-lg:px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    <div className="w-full h-full">
                        <Skeleton className="w-full h-96 rounded-none" />
                    </div>

                    <div className="flex flex-col gap-5 p-6">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <Skeleton className="h-12 w-40" />
                            <Skeleton className="h-12 w-32" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
