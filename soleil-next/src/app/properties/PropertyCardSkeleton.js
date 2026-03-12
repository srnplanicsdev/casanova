export default function PropertyCardSkeleton() {
    return (
        <div>

    <div className="w-full rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
     
      <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
      </div>

      <div className="p-4 space-y-4">
        <div className="relative h-5 bg-gray-200 rounded w-3/4 overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>

        <div className="relative h-4 bg-gray-200 rounded w-1/2 overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>

        <div className="flex gap-4 pt-2">
          <div className="relative h-4 bg-gray-200 rounded w-16 overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>
          <div className="relative h-4 bg-gray-200 rounded w-16 overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>
          <div className="relative h-4 bg-gray-200 rounded w-16 overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  
        </div>
    )
}