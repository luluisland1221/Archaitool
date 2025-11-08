import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, Users, Building2, HelpCircle, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'general',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: HelpCircle },
    { value: 'tool-submission', label: 'Tool Submission', icon: Building2 },
    { value: 'partnership', label: 'Business Partnership', icon: Users },
    { value: 'technical', label: 'Technical Support', icon: MessageSquare },
    { value: 'feedback', label: 'Feedback', icon: MessageSquare }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you can integrate actual form submission logic
      // For example, sending to backend API or using third-party service like Formspree
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate submission

      setSubmitStatus('success');
      setFormData({ name: '', email: '', type: 'general', subject: '', message: '' });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Arch AI Tool</title>
        <meta name="description" content="Contact the Arch AI Tool team - tool submissions, business partnerships, technical support. We are dedicated to providing the best AI tool navigation service for architecture and design professionals." />
        <link rel="canonical" href="https://archaitool.com/contact" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contact Us - Arch AI Tool" />
        <meta property="og:description" content="Contact us to discover more AI architecture tools" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://archaitool.com/contact" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are dedicated to providing the best AI tool navigation service for architecture and design professionals.
              If you have any questions, suggestions, or cooperation intentions, please feel free to contact us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">contact@archaitool.com</p>
                      <p className="text-sm text-gray-500 mt-1">We will reply to you within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Send className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Response Time</h3>
                      <p className="text-gray-600">General inquiries: within 24 hours</p>
                      <p className="text-gray-600">Urgent matters: within 4 hours</p>
                      <p className="text-gray-600">Business partnerships: within 48 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Types */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Can Help You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {inquiryTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <div key={type.value} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-colors">
                        <IconComponent className="h-5 w-5 text-gray-700" />
                        <span className="text-gray-700">{type.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Other Contact Info */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="font-semibold text-gray-900 mb-3">Other Contact Information</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Website:</strong> <a href="https://archaitool.com" className="text-gray-700 hover:text-gray-900 underline">https://archaitool.com</a></p>
                  <p><strong>Service Area:</strong> Global</p>
                  <p><strong>Supported Languages:</strong> English, Chinese</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Message</h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">✅ Message sent successfully! We will reply to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">❌ Sending failed, please try again later or send email directly to contact@archaitool.com</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Inquiry Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Please briefly describe your question or needs"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Detailed Description *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    placeholder="Please describe your question, suggestion, or cooperation needs in detail..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Fields marked with * are required
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>

              {/* Privacy Notice */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Privacy Protection:</strong> Your personal information will be strictly processed in accordance with our{' '}
                  <a href="/privacy-policy" className="text-gray-700 hover:text-gray-900 underline">
                    privacy policy
                  </a>
                  , and will only be used to reply to your inquiries and improve our services.
                </p>
              </div>
            </div>
          </div>

          {/* Tool Submission Special Notice */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="font-semibold text-gray-900 mb-3">🚀 Want to Submit an AI Tool?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 mb-3">We welcome excellent AI architecture and design tools to join our directory!</p>
                <p className="text-gray-700">Please select "Tool Submission" type in the contact form and provide the following information:</p>
              </div>
              <div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Tool name and official website</li>
                  <li>• Tool features and characteristics</li>
                  <li>• Target user groups</li>
                  <li>• Pricing model</li>
                  <li>• Why this tool should be included</li>
                </ul>
                <p className="text-sm mt-3 text-gray-600">We will review your submission as soon as possible and inform you of the review result via email.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;