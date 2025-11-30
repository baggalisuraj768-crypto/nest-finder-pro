import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TopAgents from "@/components/home/TopAgents";
import CallToAction from "@/components/home/CallToAction";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>NestFinder - Find Your Perfect Nest | Real Estate in India</title>
        <meta name="description" content="Discover your dream home with NestFinder. Browse premium properties across Hyderabad, Bangalore, Mumbai, Delhi and more. Apartments, Villas, Houses available." />
      </Helmet>
      <Layout>
        <HeroSection />
        <FeaturedListings />
        <WhyChooseUs />
        <TopAgents />
        <CallToAction />
      </Layout>
    </>
  );
}
