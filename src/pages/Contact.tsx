import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, Clock, Building2, Users, HelpCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 这里可以集成实际的表单提交逻辑
      // 例如发送到后端API或使用第三方服务如Formspree
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟提交
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // 3秒后重置状态
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const inquiryTypes = [
    { value: 'general', label: '一般咨询', icon: HelpCircle },
    { value: 'tool-submission', label: '工具提交', icon: Building2 },
    { value: 'partnership', label: '商务合作', icon: Users },
    { value: 'technical', label: '技术支持', icon: MessageSquare },
    { value: 'feedback', label: '意见反馈', icon: MessageSquare }
  ];

  return (
    <>
      <Helmet>
        <title>联系我们 - Arch AI Tool</title>
        <meta name="description" content="联系Arch AI Tool团队 - 工具提交、商务合作、技术支持。我们致力于为建筑和设计专业人士提供最好的AI工具导航服务。" />
        <link rel="canonical" href="https://archaitool.com/contact" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="联系我们 - Arch AI Tool" />
        <meta property="og:description" content="联系我们，发现更多AI建筑工具" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://archaitool.com/contact" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* 页面标题区域 */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">联系我们</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                我们致力于为建筑和设计专业人士提供最好的AI工具导航服务。
                如有任何问题、建议或合作意向，请随时与我们联系。
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 联系信息 */}
            <div className="lg:col-span-1 space-y-6">
              {/* 快速联系方式 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">快速联系方式</h2>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">电子邮件</h3>
                      <p className="text-gray-600">contact@archaitool.com</p>
                      <p className="text-sm text-gray-500 mt-1">我们会在24小时内回复您</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">响应时间</h3>
                      <p className="text-gray-600">一般咨询：24小时内</p>
                      <p className="text-gray-600">紧急事宜：4小时内</p>
                      <p className="text-gray-600">商务合作：48小时内</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 咨询类型 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">我们可以帮助您</h2>

                <div className="space-y-3">
                  {inquiryTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div key={type.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Icon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{type.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 其他联系方式 */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-3">其他联系方式</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>网站：</strong> <a href="https://archaitool.com" className="text-blue-600 hover:text-blue-800">https://archaitool.com</a></p>
                  <p><strong>服务范围：</strong> 全球</p>
                  <p><strong>支持语言：</strong> 中文、英文</p>
                </div>
              </div>
            </div>

            {/* 联系表单 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">发送消息</h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800">✅ 消息发送成功！我们会尽快回复您。</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">❌ 发送失败，请稍后重试或直接发送邮件到 contact@archaitool.com</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        姓名 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="您的姓名"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        电子邮件 *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      咨询类型 *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      主题 *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请简要描述您的问题或需求"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      详细描述 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请详细描述您的问题、建议或合作需求..."
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      带 * 号的字段为必填项
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? '发送中...' : '发送消息'}
                    </button>
                  </div>
                </form>

                {/* 隐私说明 */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    <strong>隐私保护：</strong> 您的个人信息将严格按照我们的{' '}
                    <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                      隐私政策
                    </a>{' '}
                    进行处理，仅用于回复您的咨询和改善我们的服务。
                  </p>
                </div>
              </div>

              {/* 工具提交特别说明 */}
              <div className="bg-yellow-50 rounded-xl p-6 mt-8 border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-3">🚀 想要提交AI工具？</h3>
                <div className="text-gray-700 space-y-2">
                  <p>我们欢迎优秀的AI建筑和设计工具加入我们的目录！</p>
                  <p>请在联系表单中选择"工具提交"类型，并提供以下信息：</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                    <li>工具名称和官方网站</li>
                    <li>工具功能和特色</li>
                    <li>目标用户群体</li>
                    <li>定价模式</li>
                    <li>为什么这个工具应该被收录</li>
                  </ul>
                  <p className="text-sm mt-3">我们会尽快审核您的提交，并通过邮件告知审核结果。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;