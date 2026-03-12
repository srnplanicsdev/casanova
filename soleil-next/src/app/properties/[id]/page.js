import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Property from "./Property";

export default async function PropertyPage({ params }) {
    const {id} = await params;
    return (
        <div>
            <Navbar />
            <Property id={id}/>
            <Footer />
        </div>
    )
}