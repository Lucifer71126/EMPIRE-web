import { ClientTypes } from "@/components/ClientTypes";
import { ContactCTA } from "@/components/ContactCTA";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FounderSection } from "@/components/FounderSection";
import { GroupCredentials } from "@/components/GroupCredentials";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IdentityJourney } from "@/components/IdentityJourney";
import { ProblemSection } from "@/components/ProblemSection";
import { ServiceNetwork } from "@/components/ServiceNetwork";
import { ServicesOverview } from "@/components/ServicesOverview";
import { SloganSection } from "@/components/SloganSection";
import { WhyEmpire } from "@/components/WhyEmpire";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SloganSection />
        <ProblemSection />
        <ServicesOverview />
        <IdentityJourney />
        <WhyEmpire />
        <FounderSection />
        <GroupCredentials />
        <ServiceNetwork />
        <ClientTypes />
        <ContactCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
