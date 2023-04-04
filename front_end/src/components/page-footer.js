import React from "react";
import { PageFooterHyperlink } from "./page-footer-hyperlink";

export const PageFooter = () => {
  const resourceList = [
    {
      path: "https://localhost:4040/",
      label: "Path Name",
    },
    {
      path: "https://localhost:4040/",
      label: "And Another",
    },
  ];

  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div className="page-footer-grid__info">
          <div className="page-footer-info__message">
            <p className="page-footer-message__headline">
              <span>You need to fill in your footer still</span>
              <PageFooterHyperlink path="https://localhost:4040/">
                Auth0
              </PageFooterHyperlink>
            </p>
            <p className="page-footer-message__description">
              <span>More text if you want it</span>
            </p>
          </div>
          <div className="page-footer-info__button">
            <a
              id="create-account-button"
              className="button button--secondary"
              href="https://auth0.com/signup"
              target="_blank"
              rel="noreferrer noopener"
            >
              Create Free Auth0 Account
            </a>
          </div>
          <div className="page-footer-info__resource-list">
            {resourceList.map((resource) => (
              <div
                key={resource.path}
                className="page-footer-info__resource-list-item"
              >
                <PageFooterHyperlink path={resource.path}>
                  {resource.label}
                </PageFooterHyperlink>
              </div>
            ))}
          </div>
        </div>
        <div className="page-footer-grid__brand">
          <div className="page-footer-brand">
            <img
              className="page-footer-brand__logo"
              src="https://cdn.auth0.com/blog/hello-auth0/auth0-shield.svg"
              alt="Your Logo"
              width="20"
              height="22.22"
            />
            <PageFooterHyperlink path="https://auth0.com/">
              Site Name
            </PageFooterHyperlink>
          </div>
        </div>
      </div>
    </footer>
  );
};
