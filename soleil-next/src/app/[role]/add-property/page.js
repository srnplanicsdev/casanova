'use client'
import PropertyForm from '@/components/PropertyForm';
import { useParams } from 'next/navigation';

export default function AddPropertyPage() {
    const params = useParams();
    const role = params.role;

    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <PropertyForm mode="create" role={role} />
        </div>
    );
}