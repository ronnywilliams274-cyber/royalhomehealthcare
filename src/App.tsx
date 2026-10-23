import { Route, Routes } from "react-router";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import FaqPage from "@/pages/FaqPage";
import AboutPage from "@/pages/AboutPage";
import ServiceAreasPage from "@/pages/ServiceAreasPage";
import ReferralsPage from "@/pages/ReferralsPage";
import ContactPage from "@/pages/ContactPage";
import AccessibilityPage from "@/pages/AccessibilityPage";
import NondiscriminationPage from "@/pages/NondiscriminationPage";
import SitemapPage from "@/pages/SitemapPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="service-areas" element={<ServiceAreasPage />} />
        <Route path="referrals" element={<ReferralsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="accessibility" element={<AccessibilityPage />} />
        <Route path="nondiscrimination" element={<NondiscriminationPage />} />
        <Route path="sitemap" element={<SitemapPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
