/**
 * Reusable Skeleton utility component with shimmer effect.
 * Usage: <Skeleton className="h-6 w-48" />
 */
export default function Skeleton({ className = "" }) {
    return (
        <div className={`skeleton-base ${className}`} />
    );
}

/**
 * A shimmer line that's easy to use inline
 */
export function SkeletonLine({ width = "100%", height = "1rem", className = "" }) {
    return (
        <div
            className={`skeleton-base ${className}`}
            style={{ width, height }}
        />
    );
}
