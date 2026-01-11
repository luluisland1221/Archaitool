import React from 'react';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = 'About Arch AI Tool - Best Architecture AI Tools & Free Solutions';
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">About Arch AI Tool - Your Guide to Architecture AI Tools</h1>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-8 leading-relaxed text-gray-700">
          <section>
            <p className="mb-4">
              Arch AI Tool started as an internal spreadsheet tracking generative design experiments, rendering copilots, and real estate visualization startups. The list quickly outgrew our studio and turned into a public directory so architects, developers, and creative technologists could evaluate new software without spending days scraping social posts or Discord servers. Today the directory covers concept sketching bots, BIM-aware optimizers, fabrication helpers, and marketing assistants—each vetted manually and annotated with practical usage notes.
            </p>
            <p>
              We believe AI should augment the craft rather than replace it. Every entry in the database is reviewed for transparency, licensing language, and evidence of real-world deployments. If we cannot trace a claim back to the vendor’s documentation, changelog, or product demo, we do not publish it. That approach keeps the directory useful for teams that need reliable benchmarks instead of hype.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">How we research</h2>
            <p className="mb-4">
              Our analysts monitor public product roadmaps, investor updates, and engineering releases, then test the tools with sample briefs that mirror real studio work—multi-family feasibility studies, hospitality rebrands, civic landscape plans, and proptech marketing packs. We record prompt structures, export fidelity, and collaboration features. Only after those checks do we add the tool to the site with structured data for pricing, supported formats, and target users.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Quarterly audits verify that screenshots, pricing notes, and feature claims still match the vendor’s current offer.</li>
              <li>Each tool detail page highlights real use cases so readers understand when AI saves time versus when traditional modeling is still required.</li>
              <li>We tag tools with categories and subcategories that match how architecture and real estate teams actually structure their workflows.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Who we serve</h2>
            <p className="mb-4">
              The directory is written for cross-disciplinary teams—architects coordinating with developers, visualization studios pitching investors, landscape architects navigating climate constraints, and in-house innovation leads responsible for pilot programs. Students and indie creators use the free tiers to build portfolios, while enterprise readers benchmark production-ready platforms before making procurement requests.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Architecture &amp; Design Studios</h3>
                <p>Find copilots for concept generation, layout studies, and visualization so your teams can spend more time on coordination and detailing.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Developers &amp; Brokerages</h3>
                <p>Evaluate virtual staging, marketing automation, and interactive sales collateral to keep listings fresh without waiting for new photography.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Editorial principles</h2>
            <p className="mb-4">
              Transparency matters. We cite the official source for every feature description, indicate when pricing is invite-only, and flag any limitations we encounter during testing. Sponsored placements are not allowed, and vendors cannot pay to be included or to influence rankings. If a tool removes critical functionality or receives sustained user complaints, we annotate the listing and may archive it until the issues are resolved.
            </p>
            <p>
              Because AI tooling moves quickly, we encourage readers to share their field notes. When you submit feedback through the contact form, it is reviewed by the same research team that curates the site. Verified insights—positive or negative—inform the next update cycle so the community benefits from collective experience.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">How to collaborate</h2>
            <p className="mb-2">
              Have a tool to recommend or a case study to share? Reach out via service@archaitool.com or the submission form on the Contact page. Provide:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>The official product URL and a short summary of what the AI delivers.</li>
              <li>Any public pricing or credit information—free tier limits, enterprise seat minimums, or hardware requirements.</li>
              <li>Links to demo reels, documentation, or blog posts that prove the feature exists in production.</li>
            </ol>
            <p className="mt-4">
              Once verified, we will add the tool to the research backlog and keep you informed about publication timelines. Together we can document responsible, high-impact AI practices for the built environment.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
