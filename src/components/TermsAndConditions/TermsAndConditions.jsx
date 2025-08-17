import React from "react";
import { ShieldCheck, FileText, Lock, Star, RefreshCcw, Mail } from "lucide-react";

const TermsAndConditions = () => {
  const sections = [
    {
      id: 1,
      title: "Subscription",
      icon: <FileText className="w-6 h-6 text-indigo-500" />,
      content:
        "Subscriptions are billed according to the plan you choose. Payments are non-refundable once processed. You may cancel at any time, and your access will remain until the end of the billing period.",
    },
    {
      id: 2,
      title: "Usage Policy",
      icon: <ShieldCheck className="w-6 h-6 text-indigo-500" />,
      content:
        "Subscribers are responsible for all activities under their account. Sharing login credentials is prohibited. Abuse of services may result in suspension or termination without refund.",
    },
    {
      id: 3,
      title: "Content Policy",
      icon: <Lock className="w-6 h-6 text-indigo-500" />,
      content:
        "You may only post original content that complies with our community guidelines. Any form of plagiarism, offensive, or harmful content will be removed, and your account may be restricted.",
    },
    {
      id: 4,
      title: "Premium Features",
      icon: <Star className="w-6 h-6 text-indigo-500" />,
      content:
        "Premium plans unlock additional features. Misuse of these features may lead to account suspension.",
    },
    {
      id: 5,
      title: "Changes to Terms",
      icon: <RefreshCcw className="w-6 h-6 text-indigo-500" />,
      content:
        "We may update these Terms & Conditions from time to time. Continued use of our services implies acceptance of the updated terms.",
    },
    {
      id: 6,
      title: "Contact Us",
      icon: <Mail className="w-6 h-6 text-indigo-500" />,
      content: (
        <>
          If you have any questions regarding these terms, please contact our
          support team at{" "}
          <a
            href="mailto:support@newspaperapp.com"
            className="text-indigo-600 font-medium hover:underline"
          >
            support@newspaperapp.com
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 text-gray-800">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center mb-6 font-serif bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
        Terms & Conditions
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        By subscribing to our plans and using our services, you agree to the following Terms and Conditions. 
        Please read them carefully before proceeding.
      </p>

      {/* Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {sections.map(({ id, title, icon, content }) => (
          <div
            key={id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-3">
              {icon}
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditions;
