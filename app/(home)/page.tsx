import CallToAction from "./components/CallToAction";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Hero />
                <Features />
                <HowItWorks />
                <Pricing/>
                <FAQ/>
                <CallToAction/>
            </main>
            <Footer/>
        </div>
    );
}