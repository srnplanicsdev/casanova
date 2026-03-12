import Skeleton from "@/components/Skeleton";

export default function AboutUsLoading() {
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

            <div className="container mx-auto px-4 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="flex flex-col gap-5">
                        <Skeleton className="h-14 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="w-full h-80 rounded-none" />
                </div>
            </div>

            <div className="mt-20">
                <Skeleton className="w-full h-96 rounded-none" />
            </div>

            <div className="my-20 bg-gold/10 py-10">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="flex flex-col gap-5">
                        <Skeleton className="h-14 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-16 w-36 mt-6" />
                    </div>
                    <Skeleton className="w-full h-80 rounded-none" />
                </div>
            </div>

            <Skeleton className="w-full h-80 rounded-none" />
        </div>
    );
}
