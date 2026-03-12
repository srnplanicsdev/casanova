import Skeleton from "@/components/Skeleton";

export default function DiscoverSkeleton() {
    return (
        <div className="max-lg:container max-lg:mx-auto max-lg:px-4 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                <div className="order-2 md:order-1">
                    <div className="w-full lg:px-20 lg:ps-42 pb-5 flex flex-col gap-5">
                        <Skeleton className="h-14 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>

                <div className="order-1 md:order-2 w-full">
                    <Skeleton className="w-full h-80 rounded-none" />
                </div>
            </div>
        </div>
    );
}
