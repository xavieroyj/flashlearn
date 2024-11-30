import Features from "./components/Features";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Hero />
                <Features />
                <HowItWorks />
            </main>
        </div>
    );
}