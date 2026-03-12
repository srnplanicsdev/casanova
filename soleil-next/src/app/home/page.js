export const dynamic = 'force-dynamic';


import Hero from "./Hero";
import NewPropertyCard from "./components/newPropertyCard";
import Featured from "./Featured";
import Region from "./Region";
import Discover from "./Discover";
import Agent from "./Agent";
import Navbar from "@/components/Navbar";
import Testimonials from "./Testimonials";
import Footer from "@/components/Footer";
export default function Home() {
    const components = [
        Navbar,
        Hero,
        NewPropertyCard,
        Featured,
        Region,
        Discover,
        Agent,
        Testimonials,
        Footer
    ];
    return (
        <div>
            {components.map((Component, index) => (
                <Component key={index} />
            ))}

        </div>
    );
}