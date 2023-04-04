import React from "react";
import { Auth0Feature } from "./auth0-feature";

export const FeaturedUsersHeroSection = () => {
  const featuredUsers = [
    {
      title: "User 1",
      description: "Add some text here - change the URL and Icon",
      resourceUrl: "https://auth0.com/docs/connections",
      icon: "https://cdn.auth0.com/blog/hello-auth0/identity-providers-logo.svg",
    },
    {
      title: "User 2",
      description: "Add some text here - change the URL and Icon",
      resourceUrl: "https://auth0.com/docs/multifactor-authentication",
      icon: "https://cdn.auth0.com/blog/hello-auth0/mfa-logo.svg",
    },
    {
      title: "User 3",
      description: "Add some text here - change the URL and Icon",
      resourceUrl: "https://auth0.com/docs/attack-protection",
      icon: "https://cdn.auth0.com/blog/hello-auth0/advanced-protection-logo.svg",
    },
    {
      title: "User 4",
      description: "Add some text here - change the URL and Icon",
      resourceUrl: "https://auth0.com/docs/actions",
      icon: "https://cdn.auth0.com/blog/hello-auth0/private-cloud-logo.svg",
    },
  ];

  return (
    <div className="auth0-features">
      <h2 className="auth0-features__title">Featured Creators</h2>
      <div className="auth0-features__grid">
        {featuredUsers.map((feature) => (
          <Auth0Feature
            key={feature.resourceUrl}
            title={feature.title}
            description={feature.description}
            resourceUrl={feature.resourceUrl}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
};
