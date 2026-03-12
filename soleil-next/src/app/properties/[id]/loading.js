import Skeleton from "@/components/Skeleton";

export default function PropertyDetailLoading() {
    return (
        <div className="min-h-screen bg-gray-50 pb-10">

            <div className="sticky top-0 z-50 bg-white border-b h-20 w-full flex items-center px-6 justify-between shadow-sm">
                <Skeleton className="h-10 w-36" />
                <div className="hidden md:flex gap-6">
                    {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-4 w-20" />)}
                </div>
                <Skeleton className="h-8 w-20" />
            </div>

            <div className="sticky top-20 z-30 bg-white shadow-sm border-b h-24">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-72" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="space-y-2 text-right">
                        <Skeleton className="h-5 w-24 ml-auto" />
                        <Skeleton className="h-6 w-36 ml-auto" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="h-12 w-32" />
                        <Skeleton className="h-12 w-36" />
                        <Skeleton className="h-12 w-12" />
                    </div>
                </div>
            </div>

            <Skeleton className="w-full h-[500px] rounded-none" />

            <div className="container mx-auto px-4 py-6 flex flex-wrap gap-4 justify-center">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12 w-32" />)}
            </div>

            <div className="bg-gold/10 py-10">
                <div className="container mx-auto flex flex-wrap justify-center gap-10">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    ))}
                </div>
                <div className="container mx-auto px-4 py-12 max-w-4xl space-y-4">
                    <Skeleton className="h-10 w-2/3 mx-auto" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                    <div className="flex justify-center mt-4">
                        <Skeleton className="h-12 w-40" />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <Skeleton className="h-10 w-48 mx-auto mb-10" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-6 w-full" />)}
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <Skeleton className="h-10 w-40 mx-auto mb-8" />
                <Skeleton className="h-[400px] w-full max-w-5xl mx-auto rounded-none" />
            </div>

            <div className="bg-gold/10 mt-12 py-12">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl">
                    <div className="bg-white shadow-sm">
                        <Skeleton className="h-64 w-full rounded-none" />
                        <div className="p-4 space-y-3">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>
                    <div className="space-y-5">
                        <Skeleton className="h-14 w-full" />
                        <div className="grid grid-cols-2 gap-5">
                            <Skeleton className="h-14 w-full" />
                            <Skeleton className="h-14 w-full" />
                        </div>
                        <Skeleton className="h-28 w-full" />
                        <Skeleton className="h-12 w-40" />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <Skeleton className="h-10 w-64 mx-auto mb-10" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="bg-white overflow-hidden border border-gray-100">
                            <Skeleton className="h-48 w-full rounded-none" />
                            <div className="p-4 space-y-3">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-1/3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
