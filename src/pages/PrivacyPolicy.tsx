import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Arch AI Tool</title>
        <meta name="description" content="Arch AI Tool's privacy policy - Learn how we collect, use, and protect your personal information, including cookie policy, data processing, and user rights." />
        <link rel="canonical" href="https://archaitool.com/privacy-policy" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Privacy Policy - Arch AI Tool" />
        <meta property="og:description" content="Learn how Arch AI Tool protects your privacy and data security" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://archaitool.com/privacy-policy" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Last updated: {currentDate}
            </p>
          </div>

          {/* Policy Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Arch AI Tool ("we," "our," or "Arch AI Tool"). We understand the importance of privacy protection and have created this privacy policy to explain how we collect, use, store, and protect your personal information.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                Using our website and services means you agree to the practices described in this privacy policy. If you do not agree with our practices, please do not use our website.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Automatically Collected Information</h3>
                  <p className="text-gray-700 leading-relaxed">
                    When you visit our website, we may automatically collect the following information:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                    <li>IP address and browser information</li>
                    <li>Access time and date</li>
                    <li>Pages viewed and time spent</li>
                    <li>Device information and operating system</li>
                    <li>Referring website and search keywords</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Cookies and Similar Technologies</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We use cookies and similar technologies to improve your experience:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                    <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                    <li><strong>Analytics Cookies:</strong> Through Google Analytics to understand website usage</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Information You Provide</h3>
                  <p className="text-gray-700 leading-relaxed">
                    When you contact us through our contact page or forms, we may collect:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                    <li>Name and email address</li>
                    <li>Message content you send</li>
                    <li>Any other information you choose to provide</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Provide Services:</strong> To operate and maintain the website, providing requested features</li>
                  <li><strong>Improve Experience:</strong> To analyze usage, optimize functionality and user interface</li>
                  <li><strong>Customer Support:</strong> To respond to your questions and requests</li>
                  <li><strong>Security:</strong> To detect and prevent fraud, abuse, and security threats</li>
                  <li><strong>Legal Compliance:</strong> To comply with applicable legal requirements</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  We do not sell, trade, or transfer your personal information to third parties, except:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Service Providers:</strong> We use third-party service providers (like Google Analytics) to help us operate the website</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or security</li>
                  <li><strong>Business Transfers:</strong> In case of mergers, acquisitions, or asset transfers (we will notify users beforehand)</li>
                </ul>

                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Third-Party Services</h4>
                  <p className="text-gray-700 text-sm">
                    We use the following third-party services:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 text-sm">
                    <li><strong>Google Analytics:</strong> Website analytics and user behavior statistics</li>
                    <li><strong>Vercel:</strong> Website hosting and content delivery</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                <li>SSL encryption technology to protect data transmission</li>
                <li>Regular updates to security protocols and systems</li>
                <li>Limited employee access to personal information</li>
                <li>Regular security reviews and risk assessments</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                However, no internet transmission method or electronic storage method is 100% secure.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                Under applicable privacy laws, you have the following rights:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
                <li><strong>Access Rights:</strong> Know whether we hold your personal information</li>
                <li><strong>Rectification Rights:</strong> Request correction of inaccurate personal information</li>
                <li><strong>Erasure Rights:</strong> Request deletion of your personal information</li>
                <li><strong>Restrict Processing Rights:</strong> Restrict how we process your personal information</li>
                <li><strong>Data Portability Rights:</strong> Obtain your personal information in a structured format</li>
                <li><strong>Objection Rights:</strong> Object to our processing of your personal information</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                To exercise these rights, please contact us using the contact information below.
              </p>
            </section>

            {/* Cookie Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Policy</h2>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  Cookies are small text files stored on your device that remember your preferences and track website usage.
                </p>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Managing Cookies</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You can manage cookies through your browser settings:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                    <li>Accept or reject all cookies</li>
                    <li>Delete existing cookies</li>
                    <li>Set cookie notifications</li>
                    <li>Block specific website cookies</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <p className="text-gray-700 text-sm">
                    <strong>Note:</strong> Disabling certain cookies may affect website functionality.
                  </p>
                </div>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not directed at children under 13. We do not knowingly collect personal information from children under 13.
                If we discover we have collected information from a child, we will take immediate steps to delete that information.
              </p>
            </section>

            {/* International Data Transfers */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your personal information may be transferred to and processed in other countries where data protection laws may differ from those in your country.
                We take appropriate steps to ensure your personal information is adequately protected during transfer.
              </p>
            </section>

            {/* Policy Changes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Changes</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this privacy policy from time to time. For significant changes, we will notify you through the website or email.
                We recommend you regularly review this policy to stay informed of the latest information.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions or concerns about this privacy policy, or want to exercise your rights, please contact us:
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Email:</strong>contact@archaitool.com</li>
                    <li><strong>Website:</strong><a href="https://archaitool.com" className="text-gray-700 hover:text-gray-900">https://archaitool.com</a></li>
                  </ul>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  We will respond to your request within a reasonable time (typically 30 days).
                </p>
              </div>
            </section>

            {/* Effective Date */}
            <section className="border-t pt-6">
              <div className="text-center">
                <p className="text-gray-600">
                  This privacy policy is effective as of the date of publication and was last updated on {currentDate}.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;