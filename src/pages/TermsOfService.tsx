import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  const currentDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Helmet>
        <title>服务条款 - Arch AI Tool</title>
        <meta name="description" content="Arch AI Tool的服务条款 - 了解使用我们网站和服务的规则、条件、责任限制和用户义务。" />
        <link rel="canonical" href="https://archaitool.com/terms-of-service" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="服务条款 - Arch AI Tool" />
        <meta property="og:description" content="阅读Arch AI Tool的服务条款和使用规则" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://archaitool.com/terms-of-service" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">服务条款</h1>
            <p className="text-lg text-gray-600">
              最后更新时间：{currentDate}
            </p>
          </div>

          {/* 服务条款内容 */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            {/* 接受条款 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">接受条款</h2>
              <p className="text-gray-700 leading-relaxed">
                欢迎使用 Arch AI Tool（"我们"、"我们的"或"Arch AI Tool"）。通过访问或使用我们的网站和服务，
                您同意受本服务条款（"条款"）的约束。如果您不同意这些条款，请不要使用我们的网站。
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                我们保留随时修改这些条款的权利。重大变更将通过网站通知或其他适当方式告知用户。
                继续使用我们的服务即表示您接受修改后的条款。
              </p>
            </section>

            {/* 服务描述 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">服务描述</h2>
              <p className="text-gray-700 leading-relaxed">
                Arch AI Tool 是一个AI工具导航和发现平台，提供：
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                <li>AI工具的分类目录和搜索功能</li>
                <li>工具详细介绍、功能说明和用户评价</li>
                <li>行业新闻和趋势分析</li>
                <li>教育和学习资源</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                我们努力确保信息的准确性，但不保证所有信息的完整性和时效性。
              </p>
            </section>

            {/* 用户行为准则 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">用户行为准则</h2>
              <p className="text-gray-700 leading-relaxed">
                使用我们的服务时，您同意：
              </p>
              <div className="space-y-3 mt-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">禁止的行为</h3>
                  <p className="text-gray-700 mb-2">您不得：</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>违反适用的法律法规</li>
                    <li>侵犯他人的知识产权或隐私权</li>
                    <li>发布虚假、误导性或有害信息</li>
                    <li>试图干扰或破坏网站的正常运行</li>
                    <li>使用自动化工具大量抓取网站内容</li>
                    <li>传播恶意软件或病毒</li>
                    <li>进行任何形式的商业滥用或欺诈行为</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">用户责任</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>对您的账户和密码安全负责</li>
                    <li>确保提供的信息真实准确</li>
                    <li>尊重其他用户和第三方的权利</li>
                    <li>遵守所有适用的法律法规</li>
                    <li>及时更新您的联系信息</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 知识产权 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">知识产权</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">我们的权利</h3>
                  <p className="text-gray-700 leading-relaxed">
                    本网站的内容，包括但不限于文本、图片、标识、设计、数据和软件，
                    受到版权、商标和其他知识产权法的保护。
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-2">
                    未经我们明确书面许可，您不得复制、修改、分发、展示、执行、
                    创建衍生作品或以其他方式使用我们的内容。
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">用户内容</h3>
                  <p className="text-gray-700 leading-relaxed">
                    您保留对您提交内容的所有权。通过提交内容，您授予我们：
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                    <li>在全球范围内使用、复制、修改、分发和展示您的内容的权利</li>
                    <li>为提供和改进服务而处理您内容的权利</li>
                    <li>将您内容用于营销和推广的权利（在适用法律允许的范围内）</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">商标</h3>
                  <p className="text-gray-700 leading-relaxed">
                    "Arch AI Tool"、我们的标志和其他相关商标是我们或第三方的财产。
                    未经我们明确许可，您不得使用我们的商标。
                  </p>
                </div>
              </div>
            </section>

            {/* 免责声明 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">免责声明</h2>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  我们的服务按"现状"提供，不提供任何明示或暗示的保证。具体而言：
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>我们不保证服务的准确性、可靠性或可用性</li>
                  <li>我们不保证网站内容没有错误或缺陷</li>
                  <li>我们不保证网站将满足您的特定需求</li>
                  <li>我们不保证网站将不间断或及时运行</li>
                </ul>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <p className="text-gray-700">
                    <strong>重要提醒：</strong>我们网站上链接的第三方AI工具和服务由其各自的所有者运营。
                    我们不对这些第三方服务的内容、功能或政策承担责任。
                  </p>
                </div>
              </div>
            </section>

            {/* 责任限制 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">责任限制</h2>
              <p className="text-gray-700 leading-relaxed">
                在适用法律允许的最大范围内：
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                <li>我们对任何间接、偶然、特殊或后果性损害不承担责任</li>
                <li>我们的总责任不超过您为使用我们的服务而支付的金额（如有）</li>
                <li>我们不承担因使用或无法使用我们的服务而导致的利润损失或数据损失</li>
                <li>某些司法管辖区不允许排除或限制某些保证，因此上述限制可能不适用于您</li>
              </ul>
            </section>

            {/* 服务变更和终止 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">服务变更和终止</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">服务变更</h3>
                  <p className="text-gray-700 leading-relaxed">
                    我们保留随时修改、暂停或终止全部或部分服务的权利，恕不另行通知。
                    我们可能会定期更新网站，这可能导致功能、外观或可用性的变化。
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">账户终止</h3>
                  <p className="text-gray-700 leading-relaxed">
                    我们可能出于以下原因终止或暂停您使用服务的权限：
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                    <li>违反本服务条款</li>
                    <li>从事欺诈或非法活动</li>
                    <li>损害我们或其他用户的利益</li>
                    <li>法律法规要求我们这样做</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 隐私保护 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">隐私保护</h2>
              <p className="text-gray-700 leading-relaxed">
                我们重视您的隐私。我们的隐私政策说明了我们如何收集、使用和保护您的个人信息。
                使用我们的服务即表示您同意我们的隐私政策中描述的做法。
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                  查看我们的隐私政策
                </a>
              </p>
            </section>

            {/* 争议解决 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">争议解决</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">适用法律</h3>
                  <p className="text-gray-700 leading-relaxed">
                    本服务条款受中华人民共和国法律管辖，不考虑法律冲突原则。
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">争议解决方式</h3>
                  <p className="text-gray-700 leading-relaxed">
                    任何因本服务条款引起或与之相关的争议，应首先通过友好协商解决。
                    如果协商不成，任何一方均可向有管辖权的法院提起诉讼。
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
                    <li><strong>Email:</strong>contact@archaitool.com</li>
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