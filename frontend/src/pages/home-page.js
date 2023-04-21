import React from "react";
import { FeaturedUsersHeroSection } from "../components/featured-users-hero-image";
import { HeroBanner } from "../components/hero-banner";
import { PageLayout } from "../components/page-layout";

export const HomePage = () => (
  <PageLayout>
    <HeroBanner />
    <FeaturedUsersHeroSection />
  </PageLayout>
);
