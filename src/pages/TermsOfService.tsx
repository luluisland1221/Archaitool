import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Helmet>
        <title>Terms of Service - Arch AI Tool</title>
        <meta name="description" content="Arch AI Tool's terms of service - Learn about the rules, conditions, liability limitations, and user obligations for using our website and services." />
        <link rel="canonical" href="https://archaitool.com/terms-of-service" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Terms of Service - Arch AI Tool" />
        <meta property="og:description" content="Read Arch AI Tool's terms of service and usage rules" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://archaitool.com/terms-of-service" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">
              Last updated: {currentDate}
            </p>
          </div>

          {/* Terms Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Arch AI Tool ("we," "our," or "Arch AI Tool"). By accessing or using our website and services,
                you agree to be bound by these terms of service ("terms"). If you do not agree to these terms, please do not use our website.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                We reserve the right to modify these terms at any time. Significant changes will be communicated to users through website notifications or other appropriate means.
                Continued use of our services indicates your acceptance of the modified terms.
              </p>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
              <p className="text-gray-700 leading-relaxed">
                Arch AI Tool is an AI tool navigation and discovery platform that provides:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                <li>AI tool categorized directory and search functionality</li>
                <li>Detailed tool introductions, feature descriptions, and user reviews</li>
                <li>Industry news and trend analysis</li>
                <li>Educational and learning resources</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                We strive to ensure information accuracy but do not guarantee the completeness and timeliness of all information.
              </p>
            </section>

            {/* User Conduct */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Conduct</h2>
              <p className="text-gray-700 leading-relaxed">
                When using our services, you agree to:
              </p>
              <div className="space-y-3 mt-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Prohibited Activities</h3>
                  <p className="text-gray-700 mb-2">You must not:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Violate applicable laws and regulations</li>
                    <li>Infringe upon others' intellectual property or privacy rights</li>
                    <li>Publish false, misleading, or harmful information</li>
                    <li>Attempt to interfere with or disrupt normal website operation</li>
                    <li>Use automated tools to scrape website content on a large scale</li>
                    <li>Distribute malware or viruses</li>
                    <li>Engage in any form of commercial abuse or fraudulent behavior</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">User Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Be responsible for the security of your account and password</li>
                    <li>Ensure provided information is true and accurate</li>
                    <li>Respect the rights of other users and third parties</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Update your contact information promptly</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Rights</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The content of this website, including but not limited to text, images, logos, designs, data, and software,
                    is protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-2">
                    Without our explicit written permission, you may not copy, modify, distribute, display, perform,
                    create derivative works, or otherwise use our content.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">User Content</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You retain ownership of content you submit. By submitting content, you grant us:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                    <li>The right to use, copy, modify, distribute, and display your content worldwide</li>
                    <li>The right to process your content to provide and improve services</li>
                    <li>The right to use your content for marketing and promotion (where permitted by applicable law)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Trademarks</h3>
                  <p className="text-gray-700 leading-relaxed">
                    "Arch AI Tool," our logo, and other related trademarks are our property or that of third parties.
                    You may not use our trademarks without our explicit permission.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  Our services are provided "as is" without any express or implied warranties. Specifically:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>We do not guarantee the accuracy, reliability, or availability of services</li>
                  <li>We do not guarantee website content is free from errors or defects</li>
                  <li>We do not guarantee the website will meet your specific needs</li>
                  <li>We do not guarantee the website will operate uninterrupted or timely</li>
                </ul>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <p className="text-gray-700">
                    <strong>Important Notice:</strong> Third-party AI tools and services linked on our website are operated by their respective owners.
                    We are not responsible for the content, functionality, or policies of these third-party services.
                  </p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by applicable law:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                <li>We are not liable for any indirect, incidental, special, or consequential damages</li>
                <li>Our total liability shall not exceed the amount you paid for using our services (if any)</li>
                <li>We are not liable for loss of profits or data resulting from use or inability to use our services</li>
                <li>Certain jurisdictions do not allow exclusion or limitation of certain warranties, so the above limitations may not apply to you</li>
              </ul>
            </section>

            {/* Service Changes and Termination */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Changes and Termination</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Service Changes</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify, suspend, or terminate all or part of our services at any time without notice.
                    We may periodically update the website, which may result in changes to functionality, appearance, or availability.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Termination</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may terminate or suspend your access to services for the following reasons:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                    <li>Violation of these terms of service</li>
                    <li>Engaging in fraudulent or illegal activities</li>
                    <li>Harming our or other users' interests</li>
                    <li>Requirements of laws and regulations require us to do so</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Privacy Protection */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                We value your privacy. Our privacy policy explains how we collect, use, and protect your personal information.
                Using our services indicates your agreement to the practices described in our privacy policy.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                <a href="/privacy-policy" className="text-gray-700 hover:text-gray-900 underline">
                  View our privacy policy
                </a>
              </p>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Applicable Law</h3>
                  <p className="text-gray-700 leading-relaxed">
                    These terms of service are governed by the laws of the People's Republic of China, without regard to conflict of law principles.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Dispute Resolution Method</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Any disputes arising from or related to these terms of service should first be resolved through friendly negotiation.
                    If negotiation fails, either party may file a lawsuit with a court of competent jurisdiction.
                  </p>
                </div>
              </div>
            </section>

            {/* Force Majeure */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Force Majeure</h2>
              <p className="text-gray-700 leading-relaxed">
                We are not liable for service interruptions or delays caused by force majeure events, including but not limited to:
                natural disasters, wars, terrorist activities, government actions, cyber attacks, power outages, or other situations beyond our control.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these terms of service, please contact us through the following methods:
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Email:</strong>service@archaitool.com</li>
                    <li><strong>Website:</strong><a href="https://archaitool.com" className="text-gray-700 hover:text-gray-900">https://archaitool.com</a></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Terms Modification */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms Modification</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Modified terms will be published on the website and take effect immediately.
                Significant changes will be notified to users through appropriate means. Continued use of our services indicates your acceptance of the modified terms.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                We recommend you regularly review this page to stay informed of the latest terms of service.
              </p>
            </section>

            {/* Miscellaneous */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Miscellaneous</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Entire Agreement</h3>
                  <p className="text-gray-700 leading-relaxed">
                    These terms of service constitute the complete agreement between you and us regarding the use of our services,
                    superseding all prior oral or written agreements, understandings, or arrangements.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Severability</h3>
                  <p className="text-gray-700 leading-relaxed">
                    If any provision of these terms of service is deemed invalid or unenforceable,
                    the remaining provisions shall remain valid and have full legal effect.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Waiver</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our failure to exercise or enforce any right under these terms of service
                    does not constitute a waiver of that right.
                  </p>
                </div>
              </div>
            </section>

            {/* Effective Date */}
            <section className="border-t pt-6">
              <div className="text-center">
                <p className="text-gray-600">
                  These terms of service are effective from the date of publication and were last updated on {currentDate}.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;