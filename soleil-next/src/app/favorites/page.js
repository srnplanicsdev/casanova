import Navbar from "@/components/Navbar"
import { getServerTranslation } from "@/utils/serverTranslation"
import Favorite from "./Favorite";
import Footer from "@/components/Footer";

export default async function Favorites() {
    const {t} = await getServerTranslation()
    return (
        <div>
        <Navbar />
        <Favorite/>
    <Footer />
</div>
    );
}