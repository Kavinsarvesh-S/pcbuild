import React, { useState } from 'react';
import type { SelectedParts, CompatibilityReport } from '../types/pcBuilder';
import { CATEGORY_INFO } from '../data/mockComponents';
import { formatRupees } from '../utils/currencyFormatter';
import { 
  Cpu, CheckCircle2, Truck, CreditCard, 
  Wrench, AlertTriangle, ChevronRight, Download, Sparkles, Building2, Smartphone, Landmark, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from './Footer';
import confetti from 'canvas-confetti';

interface CheckoutPageProps {
  selectedParts: SelectedParts;
  report: CompatibilityReport;
  budget: number;
  
  onGoToHome: () => void;
  onGoToContact: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  selectedParts,
  report,
  budget,
  
  onGoToHome,
  onGoToContact,
}) => {
  const [includeAssembly, setIncludeAssembly] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  // Shipping Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Calculate pricing
  const partsList = Object.entries(selectedParts).filter(([_, item]) => Boolean(item));
  const assemblyFee = includeAssembly ? 1499 : 0;
  const shippingFee = 0; // Free express shipping
  const grandTotal = report.totalPrice + assemblyFee + shippingFee;
  const isOverBudget = grandTotal > budget;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (partsList.length === 0) return;

    const generatedId = `NX-` + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderPlaced(true);

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#80CCE3', '#B0DEED', '#B0DEED', '#94BDCF', '#10b981'],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-transparent text-slate-900 flex flex-col pb-16"
    >
      {/* Top Header */}
      

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full flex-1 space-y-8">
        {/* Checkout Header Title Banner */}
        <div className="glass-panel rounded-2xl p-6 border border-[#94BDCF]/40 glass-layer shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#80CCE3]" /> Final Rig Order & Shipping
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Review your customized hardware configuration, select professional assembly, and complete delivery details.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-600">
              Total Hardware: <strong className="font-mono text-slate-900">{partsList.length} / 8 Parts</strong>
            </span>
            {report.isCompatible ? (
              <span className="px-3 py-1 rounded-full bg-[#80CCE3] text-[#80CCE3] border border-[#80CCE3]/50 text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#80CCE3]" /> Fully Compatible
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-[#94BDCF]/20 text-[#80CCE3] border border-[#94BDCF]/50 text-xs font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-[#80CCE3]" /> Conflicts Detected
              </span>
            )}
          </div>
        </div>

        {/* Main Grid: Form Left (7 cols) + Order Summary Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Professional Assembly Toggle */}
            <div className="glass-panel rounded-2xl p-6 border border-[#94BDCF]/40 glass-layer shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#80CCE3]" /> Custom Rig Assembly Option
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Pro Assembly */}
                <div
                  onClick={() => setIncludeAssembly(true)}
                  className={`p-4 rounded-xl border cursor-pointer transition hover-gemini-gradient flex flex-col justify-between space-y-2 ${
                    includeAssembly
                      ? 'bg-[#94BDCF]/40/20 border-[#94BDCF]/50 shadow-xs'
                      : 'glass-layer border-[#94BDCF]/40 hover:border-[#94BDCF]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#80CCE3]" /> Pro Rig Assembly
                    </span>
                    <span className="text-xs font-mono font-extrabold text-slate-900">+₹1,499</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Professional hardware mounting, thermal paste application, clean cable management, BIOS flashing & 24h stress test.
                  </p>
                  <span className="text-[10px] text-[#80CCE3] font-semibold">Recommended for custom rigs</span>
                </div>

                {/* Option 2: DIY Parts Only */}
                <div
                  onClick={() => setIncludeAssembly(false)}
                  className={`p-4 rounded-xl border cursor-pointer transition hover-gemini-gradient flex flex-col justify-between space-y-2 ${
                    !includeAssembly
                      ? 'bg-[#80CCE3]/20/70 border-[#80CCE3]/40 shadow-xs'
                      : 'glass-layer border-[#94BDCF]/40 hover:border-[#94BDCF]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">DIY Components Only</span>
                    <span className="text-xs font-mono font-bold text-[#80CCE3]">FREE</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    All components delivered individually sealed in original manufacturer packaging with standard warranties.
                  </p>
                  <span className="text-[10px] text-slate-900/70 font-semibold">Build it yourself at home</span>
                </div>
              </div>
            </div>

            {/* Step 2: Delivery & Shipping Address Form */}
            <form onSubmit={handlePlaceOrder} className="glass-panel rounded-2xl p-6 border border-[#94BDCF]/40 glass-layer shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#80CCE3]" /> Delivery & Shipping Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#94BDCF]/40 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:border-[#94BDCF]/50 focus:ring-2 focus:ring-cyan-500/20 transition hover-gemini-gradient"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#94BDCF]/40 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:border-[#94BDCF]/50 focus:ring-2 focus:ring-cyan-500/20 transition hover-gemini-gradient"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="rahul@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#94BDCF]/40 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:border-[#94BDCF]/50 focus:ring-2 focus:ring-cyan-500/20 transition hover-gemini-gradient"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Street Address *</label>
                  <textarea
                    name="address"
                    required
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House No, Apartment, Street / Area Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#94BDCF]/40 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:border-[#94BDCF]/50 focus:ring-2 focus:ring-cyan-500/20 transition hover-gemini-gradient resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Bengaluru"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#94BDCF]/40 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:border-[#94BDCF]/50 focus:ring-2 focus:ring-cyan-500/20 transition hover-gemini-gradient"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="e.g. Karnataka"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#94BDCF]/40 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:border-[#94BDCF]/50 focus:ring-2 focus:ring-cyan-500/20 transition hover-gemini-gradient"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="560001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#94BDCF]/40 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:border-[#94BDCF]/50 focus:ring-2 focus:ring-cyan-500/20 transition hover-gemini-gradient"
                  />
                </div>
              </div>

              {/* Step 3: Payment Method Tabs */}
              <div className="pt-4 border-t border-[#94BDCF]/40 space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#80CCE3]" /> Payment Method
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition hover-gemini-gradient ${
                      paymentMethod === 'upi'
                        ? 'bg-[#94BDCF]/20 text-slate-900 border-[#94BDCF]/50 shadow-xs'
                        : 'glass-layer text-slate-700 border-[#94BDCF]/40 hover:bg-[#80CCE3]/20'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" /> UPI / QR
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition hover-gemini-gradient ${
                      paymentMethod === 'card'
                        ? 'bg-[#94BDCF]/20 text-slate-900 border-[#94BDCF]/50 shadow-xs'
                        : 'glass-layer text-slate-700 border-[#94BDCF]/40 hover:bg-[#80CCE3]/20'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> Cards
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition hover-gemini-gradient ${
                      paymentMethod === 'netbanking'
                        ? 'bg-[#94BDCF]/20 text-slate-900 border-[#94BDCF]/50 shadow-xs'
                        : 'glass-layer text-slate-700 border-[#94BDCF]/40 hover:bg-[#80CCE3]/20'
                    }`}
                  >
                    <Landmark className="w-4 h-4" /> NetBanking
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition hover-gemini-gradient ${
                      paymentMethod === 'cod'
                        ? 'bg-[#94BDCF]/20 text-slate-900 border-[#94BDCF]/50 shadow-xs'
                        : 'glass-layer text-slate-700 border-[#94BDCF]/40 hover:bg-[#80CCE3]/20'
                    }`}
                  >
                    <Building2 className="w-4 h-4" /> COD / Pay
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-[#94BDCF]/40 text-xs text-slate-600">
                  {paymentMethod === 'upi' && 'Instant zero-fee payment via Google Pay, PhonePe, Paytm, or BHIM QR code.'}
                  {paymentMethod === 'card' && 'Secured Visa, Mastercard, and RuPay debit or credit cards accepted.'}
                  {paymentMethod === 'netbanking' && 'Direct net banking support across HDFC, ICICI, SBI, Axis, and all major Indian banks.'}
                  {paymentMethod === 'cod' && 'Pay on delivery after inspecting package seal. ₹500 advance verification token applies.'}
                </div>
              </div>

              {/* Submit Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={partsList.length === 0}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#94BDCF]/20 hover:bg-[#94BDCF]/90 disabled:opacity-50 text-slate-900 font-extrabold text-sm shadow-lg transition hover-gemini-gradient flex items-center justify-center gap-2 border border-[#94BDCF]/50"
              >
                <span>Place Order • {formatRupees(grandTotal)}</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </form>
          </div>

          {/* Right Column: Hardware Itemized Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 border border-[#94BDCF]/40 glass-layer shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-[#94BDCF]/40 pb-3">
                <Cpu className="w-4 h-4 text-[#80CCE3]" /> Hardware Configuration Summary
              </h3>

              {/* Parts List */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {partsList.length > 0 ? (
                  partsList.map(([cat, item]) => {
                    if (!item) return null;
                    const catInfo = CATEGORY_INFO[cat as keyof typeof CATEGORY_INFO];

                    return (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-slate-50 border border-[#94BDCF]/40 flex items-center gap-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-11 h-11 object-cover rounded-lg border border-slate-200 glass-layer shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-[#80CCE3]">{catInfo.name}</span>
                            <span className="text-xs font-mono font-bold text-slate-900">{formatRupees(item.price)}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                          <span className="text-[10px] text-slate-900/70 font-mono">
                            {item.brand} • {item.wattage > 0 ? `${item.wattage}W` : 'Base Load'}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-xs text-slate-900/70 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    No hardware selected yet. Please return to the builder to configure your custom PC.
                  </div>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-[#94BDCF]/40 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Hardware Subtotal ({partsList.length} items)</span>
                  <span className="font-mono font-bold text-slate-900">{formatRupees(report.totalPrice)}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Pro Rig Assembly & Cable Management</span>
                  <span className="font-mono font-bold text-slate-900">
                    {includeAssembly ? formatRupees(1499) : 'FREE (DIY)'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Express Safe Courier Shipping</span>
                  <span className="font-mono font-bold text-[#80CCE3]">FREE</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>GST Taxes (18% Included)</span>
                  <span className="font-mono font-semibold text-slate-900/70">Included</span>
                </div>

                {isOverBudget && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-[#94BDCF]/50 text-[#80CCE3] text-[11px] flex items-center gap-1.5 font-medium">
                    <AlertTriangle className="w-4 h-4 text-[#80CCE3] shrink-0" />
                    <span>Total exceeds target budget of {formatRupees(budget)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#94BDCF]/40 flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-slate-900">Grand Total</span>
                    <p className="text-[10px] text-slate-900/70">All prices in INR (₹)</p>
                  </div>
                  <span className="text-xl font-mono font-extrabold text-slate-900">
                    {formatRupees(grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Order Confirmation Receipt Modal */}
      <AnimatePresence>
        {orderPlaced && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/10 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg glass-layer border border-[#94BDCF]/40 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 text-slate-900 space-y-6"
            >
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#94BDCF]/20/60 border border-[#94BDCF]/50 text-[#80CCE3] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10 text-[#80CCE3]" />
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900">Order Placed Successfully!</h2>
                <p className="text-xs text-slate-600">
                  Thank you, <strong className="text-slate-900">{formData.fullName || 'Valued Customer'}</strong>! Your custom PC rig order has been confirmed.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="p-4 rounded-2xl bg-[#80CCE3]/20/70 border border-[#80CCE3]/40 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-[#80CCE3]/40 pb-2">
                  <span className="text-slate-600 font-semibold">Order ID</span>
                  <span className="font-mono font-extrabold text-slate-900">{orderId}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Est. Delivery Date</span>
                  <span className="font-semibold text-slate-900">3 - 5 Business Days</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Assembly Status</span>
                  <span className="font-semibold text-[#80CCE3]">
                    {includeAssembly ? 'Pro Bench Assembly & Testing' : 'DIY Component Dispatch'}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#80CCE3]/40">
                  <span className="font-bold text-slate-900">Total Paid</span>
                  <span className="font-mono font-extrabold text-slate-900 text-sm">{formatRupees(grandTotal)}</span>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => window.print()}
                  className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl glass-layer border border-[#94BDCF]/40 text-slate-900 font-bold text-xs hover:bg-[#80CCE3]/20 transition hover-gemini-gradient shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-[#80CCE3]" /> Print Receipt
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onGoToHome}
                  className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-[#94BDCF]/20 text-slate-900 font-bold text-xs hover:bg-[#94BDCF]/90 transition hover-gemini-gradient shadow-md flex items-center justify-center gap-1.5 border border-[#94BDCF]/50"
                >
                  <Check className="w-4 h-4" /> Back to Home
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer onGoToHome={onGoToHome} onGoToContact={onGoToContact} />
    </motion.div>
  );
};
