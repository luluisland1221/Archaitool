import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Mail } from 'lucide-react';

const Contact = () => (
  <>
    <Helmet>
      <title>Contact Us - Arch AI Tool</title>
      <meta name="description" content="Email service@archaitool.com for listing corrections, tool recommendations, partnerships and support from Arch AI Tool." />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Contact Us - Arch AI Tool" />
      <meta property="og:description" content="Get in touch with Arch AI Tool at service@archaitool.com." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://archaitool.com/contact/" />
      <link rel="canonical" href="https://archaitool.com/contact/" />
    </Helmet>

    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-5">Get in touch</p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          Have a listing correction, a tool to recommend, or a question? Email us directly.
        </p>

        <section aria-labelledby="email-heading" className="mt-10 sm:mt-12 bg-white border border-gray-200 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-5">
            <Mail className="h-5 w-5 text-gray-700" aria-hidden="true" />
            <h2 id="email-heading" className="text-sm font-semibold text-gray-600">Our contact email</h2>
          </div>
          <a
            href="mailto:service@archaitool.com"
            className="inline-block max-w-full break-all text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 underline decoration-gray-300 underline-offset-8 hover:decoration-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-gray-900"
          >
            service@archaitool.com
          </a>
          <p className="mt-7 text-gray-600 leading-relaxed">Click the address to open your email app, or copy it into your preferred email service.</p>
          <a
            href="mailto:service@archaitool.com"
            className="mt-7 inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3 font-medium hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900"
          >
            Email us <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
          <section aria-labelledby="corrections-heading">
            <h2 id="corrections-heading" className="text-xl font-semibold text-gray-900 mb-3">Listing corrections &amp; feedback</h2>
            <p className="text-gray-600 leading-relaxed">Include the page URL, the details that need updating, and links to official sources so we can verify your correction.</p>
          </section>
          <section aria-labelledby="recommendations-heading">
            <h2 id="recommendations-heading" className="text-xl font-semibold text-gray-900 mb-3">Tool recommendations &amp; partnerships</h2>
            <p className="text-gray-600 leading-relaxed">Send the tool name, official website, key features and pricing. For partnership or support inquiries, describe how we can help.</p>
          </section>
        </div>
      </div>
    </div>
  </>
);

export default Contact;
