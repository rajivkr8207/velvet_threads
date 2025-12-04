"use client";

import { useState } from "react";
import { CreditCard, Smartphone, Wallet, Settings, Save, Eye, EyeOff, Check } from "lucide-react";

export default function PaymentSettingsPage() {
  const [settings, setSettings] = useState({
    cod: true,
    upi: true,
    online: false,
    razorpayKey: "",
    razorpaySecret: "",
    testMode: true,
  });
  const [showSecret, setShowSecret] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Settings saved:", settings);
    setIsSaving(false);
    setSaveSuccess(true);
    
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const paymentMethods = [
    {
      id: "cod",
      name: "cod",
      label: "Cash On Delivery (COD)",
      icon: Wallet,
      iconColor: "text-blue-600",
      description: "Allow customers to pay when they receive their order"
    },
    {
      id: "upi",
      name: "upi",
      label: "UPI Payments",
      icon: Smartphone,
      iconColor: "text-purple-600",
      description: "Enable UPI payment methods like Google Pay, PhonePe"
    },
    {
      id: "online",
      name: "online",
      label: "Online Payment (Card/NetBanking)",
      icon: CreditCard,
      iconColor: "text-green-600",
      description: "Accept credit/debit cards and net banking payments"
    }
  ];

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Payment Settings
          </h1>
          <p className="text-gray-600">
            Configure payment methods and gateway settings for your store
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Payment Methods Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Methods
                </h2>
                <p className="text-sm text-gray-500">
                  Enable or disable available payment methods
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.id}
                    className="flex items-start justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-opacity-10`}>
                        <method.icon className={`w-5 h-5 ${method.iconColor}`} />
                      </div>
                      <div>
                        <label
                          htmlFor={method.id}
                          className="block font-medium text-gray-900 cursor-pointer mb-1"
                        >
                          {method.label}
                        </label>
                        <p className="text-sm text-gray-500">
                          {method.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {/* Custom Checkbox */}
                      <div className="relative">
                        <input
                          id={method.id}
                          type="checkbox"
                          name={method.name}
                          checked={settings[method.name]}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                            settings[method.name]
                              ? "bg-blue-600"
                              : "bg-gray-300"
                          }`}
                          onClick={() =>
                            setSettings(prev => ({
                              ...prev,
                              [method.name]: !prev[method.name]
                            }))
                          }
                        >
                          <div
                            className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                              settings[method.name]
                                ? "transform translate-x-7"
                                : "transform translate-x-1"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Razorpay Configuration Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-50 rounded-lg">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Razorpay Configuration
                </h2>
                <p className="text-sm text-gray-500">
                  Set up your Razorpay payment gateway
                </p>
              </div>
            </div>

            {/* Test Mode Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 mb-8">
              <div>
                <div className="font-medium text-gray-900 mb-1">
                  Test Mode
                </div>
                <p className="text-sm text-gray-500">
                  {settings.testMode
                    ? "Using test credentials for sandbox environment"
                    : "Using live credentials for production environment"}
                </p>
              </div>
              <div className="relative">
                <input
                  id="testMode"
                  type="checkbox"
                  name="testMode"
                  checked={settings.testMode}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-14 h-8 rounded-full transition-colors duration-200 cursor-pointer ${
                    settings.testMode
                      ? "bg-purple-600"
                      : "bg-gray-300"
                  }`}
                  onClick={() =>
                    setSettings(prev => ({
                      ...prev,
                      testMode: !prev.testMode
                    }))
                  }
                >
                  <div
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-200 ${
                      settings.testMode
                        ? "transform translate-x-7"
                        : "transform translate-x-1"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* API Credentials */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div>
                <label
                  htmlFor="razorpayKey"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Razorpay Key ID
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="razorpayKey"
                  type="text"
                  name="razorpayKey"
                  value={settings.razorpayKey}
                  onChange={handleChange}
                  placeholder="rzp_test_xxxxxxxxxxxxx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
                <p className="mt-2 text-xs text-gray-500">
                  {settings.testMode
                    ? "Enter your test key ID from Razorpay dashboard"
                    : "Enter your live key ID from Razorpay dashboard"}
                </p>
              </div>

              <div>
                <label
                  htmlFor="razorpaySecret"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Razorpay Key Secret
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    id="razorpaySecret"
                    type={showSecret ? "text" : "password"}
                    name="razorpaySecret"
                    value={settings.razorpaySecret}
                    onChange={handleChange}
                    placeholder="••••••••••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showSecret ? "Hide secret" : "Show secret"}
                  >
                    {showSecret ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {settings.testMode
                    ? "Enter your test key secret from Razorpay dashboard"
                    : "Enter your live key secret from Razorpay dashboard"}
                </p>
              </div>
            </div>

            {/* Warning Message */}
            {!settings.testMode && (
              <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="p-1">
                    <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-amber-800">
                      Production Mode Enabled
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      You are about to use live credentials. All transactions will be real.
                      Please ensure your credentials are correct.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isSaving}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  isSaving
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                } text-white`}
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    Saved Successfully!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {isSaving ? "Saving..." : "Save Settings"}
                  </>
                )}
              </button>
              
              {saveSuccess && (
                <p className="text-green-600 text-sm font-medium">
                  Settings have been updated successfully
                </p>
              )}
            </div>
          </div>
        </form>

        {/* Helper Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a
              href="https://razorpay.com/docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              View Razorpay documentation
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}