import Property from "@/app/properties/[id]/Property"

export default async function NewProperty({ params }) {
    const { id } = await params
    return (
        <div>
            <Property id={id} />
        </div>
    )
}