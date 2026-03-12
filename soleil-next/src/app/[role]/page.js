'use client'
import { useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function RoleRedirect({ params }) {
    const { role } = use(params);
    const router = useRouter();

    useEffect(() => {
        if (role) {
            router.replace(`/${role}/dashboard`);
        }
    }, [role, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
        </div>
    );
}