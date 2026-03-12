'use client'
import PropertyForm from '@/components/PropertyForm';
import { useParams } from 'next/navigation';

export default function EditPropertyPage() {
    const params = useParams();
    const { role, id } = params;

    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <PropertyForm mode="edit" role={role} id={id} />
        </div>
    );
}
