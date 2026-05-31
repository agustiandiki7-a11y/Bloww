import React, { useState } from 'react';
import { Sparkles, Check, Crown, CreditCard, Lock, ShieldCheck, Heart, Sparkle } from 'lucide-react';

interface SubscriptionProps {
  isPremium: boolean;
  setIsPremium: (isPrem: boolean) => void;
}

export default function Subscription({ isPremium, setIsPremium }: SubscriptionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'GoPay' | 'DANA' | 'QRIS' | 'Bank Transfer' | 'Virtual Account'>('QRIS');
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'waiting_payment' | 'success'>('idle');
  const [invoiceCode, setInvoiceCode] = useState('');

  const priceVal = billingCycle === 'monthly' ? 'Rp 49,000' : 'Rp 299,000';
  const pricePeriod = billingCycle === 'monthly' ? '/mo' : '/yr';

  const handleStartPayment = () => {
    setShowPayModal(true);
    setCheckoutState('idle');
  };

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutState('processing');

    setTimeout(() => {
      setCheckoutState('waiting_payment');
      if (paymentMethod === 'QRIS') {
        setInvoiceCode('QR_LOVEBLOOM_' + Math.floor(Math.random() * 900000 + 100000));
      } else {
        setInvoiceCode('VA_BCA_2026' + Math.floor(Math.random() * 9000000 + 1000000));
      }
    }, 1200);
  };

  const simulateSuccessPayment = () => {
    setCheckoutState('processing');
    setTimeout(() => {
      setCheckoutState('success');
      setIsPremium(true);
    }, 1000);
  };

  const cancelPremium = () => {
    setIsPremium(false);
  };

  return (
    <div id="subscription-tab" className="space-y-6 max-w-4xl mx-auto pb-10 font-sans">
      
      {/* Title */}
      <div className="bg-white/65 backdrop-blur-xl rounded-3xl p-6 border border-pink-100 shadow-sm text-center">
        <h2 className="text-2xl font-serif italic font-bold text-rose-950 flex items-center justify-center gap-1.5 leading-none">
          <span>LoveBloom Premium Workspace</span>
          <Crown className="w-6 h-6 text-yellow-400 fill-yellow-350 animate-pulse" />
        </h2>
        <p className="text-xs text-stone-600 font-medium mt-1.5">Cultivate unlimited shared diaries, High-definition locks, and premium floral card styles with Bloomy 🌷</p>

        {/* Toggle billing option */}
        <div className="flex items-center justify-center gap-2 mt-4 select-none">
          <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-pink-600' : 'text-stone-400'}`}>Monthly</span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-11 h-6 rounded-full bg-pink-100 hover:bg-pink-200 p-0.5 transition relative flex items-center shrink-0 cursor-pointer border-none"
          >
            <span
              className={`w-5 h-5 rounded-full bg-pink-500 shadow transition-all ${
                billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-bold ${billingCycle === 'yearly' ? 'text-pink-600' : 'text-stone-400'} flex items-center gap-1`}>
            Yearly <span className="bg-amber-100 text-amber-805 text-amber-800 text-[9px] px-1.5 py-0.5 rounded-full font-extrabold uppercase">Save 50%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-2xl mx-auto">
        
        {/* Free Plan Card */}
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col justify-between items-stretch">
          <div>
            <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest block mb-1">Standard Option</span>
            <h3 className="text-xl font-bold text-stone-800 font-serif italic">Free Bloom</h3>
            <p className="text-xs text-stone-500 leading-relaxed mt-1">Perfect for newly dating pairs to test baseline widgets.</p>

            <div className="my-6">
              <span className="text-4xl font-extrabold text-stone-850 font-mono">Rp 0</span>
              <span className="text-xs text-stone-400 ml-1 font-mono uppercase">Free Forever</span>
            </div>

            <div className="border-t border-dashed border-stone-200/60 my-4" />

            <ul className="space-y-2.5 text-xs text-stone-605 text-stone-600 font-semibold text-left">
              {[
                { label: 'Access to main LoveBloom Dashboard', yes: true },
                { label: 'Standard bouquet arrangers', yes: true },
                { label: 'Custom lockscreen wallpaper drafts', yes: true },
                { label: 'Limit of 2 scrapbook collage diaries', yes: false },
                { label: 'Lockscreen exports restricted to Low Resolution', yes: false },
                { label: 'Excludes premium floral ribbon choices', yes: false },
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className={`w-3.5 h-3.5 shrink-0 ${f.yes ? 'text-green-500' : 'text-stone-300'}`} />
                  <span className={f.yes ? '' : 'text-stone-400/80 line-through'}>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-2">
            <button
              disabled
              className="w-full py-2.5 bg-stone-50 border border-stone-200 text-stone-400 font-bold rounded-2xl text-xs select-none cursor-not-allowed"
            >
              Active Plan
            </button>
          </div>
        </div>

        {/* Premium Plan Card */}
        <div className="bg-gradient-to-b from-pink-500/10 to-rose-400/5 backdrop-blur-xl rounded-3xl p-6 border-2 border-pink-400 shadow-xl flex flex-col justify-between items-stretch relative">
          
          <span className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-extrabold text-[9px] px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
            Best couple value
          </span>

          <div>
            <span className="text-[10px] font-extrabold text-pink-650 uppercase tracking-widest block mb-1 flex items-center gap-1 font-bold text-pink-600">
              <Crown className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse shrink-0" />
              Prestige License Space
            </span>
            <h3 className="text-xl font-bold text-stone-850 font-serif italic">Premium Couple</h3>
            <p className="text-xs text-stone-500 leading-relaxed mt-1">Unlock our entire collection of couple canvases, cards, and memory diaries.</p>

            <div className="my-6">
              <span className="text-4xl font-extrabold text-stone-850 font-mono">{priceVal}</span>
              <span className="text-xs text-stone-450 ml-1 font-mono uppercase">{pricePeriod}</span>
            </div>

            <div className="border-t border-dashed border-pink-200 my-4" />

            <ul className="space-y-2.5 text-xs text-stone-700 font-semibold text-left">
              {[
                { label: 'Create unlimited scrapbook memory pages', yes: true },
                { label: 'High definition wallpaper exports', yes: true },
                { label: 'Premium ribbons and background tunes', yes: true },
                { label: 'All bouquet floral configurations (lavender, lilies)', yes: true },
                { label: 'Secure cloud synchronized memories (Durable)', yes: true },
                { label: 'VIP specialized theme skin panels', yes: true },
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 font-bold" />
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-2">
            {isPremium ? (
              <button
                onClick={cancelPremium}
                className="w-full py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-2xl text-red-650 text-red-650 font-bold text-xs transition cursor-pointer"
              >
                Cancel Premium Account
              </button>
            ) : (
              <button
                onClick={handleStartPayment}
                className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 text-white text-xs font-bold rounded-2xl shadow-lg border-b-4 border-pink-700/25 transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Crown className="w-4 h-4 text-yellow-300 fill-yellow-300 shrink-0" />
                <span>Cultivate Premium Love ({priceVal})</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Midtrans/Xendit Secure Gateway Simulator Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fade-in text-[#2D2A32] text-left">
          <div className="bg-white rounded-3xl p-6.5 w-full max-w-sm border border-stone-100 shadow-2xl relative">
            
            <button
              onClick={() => setShowPayModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:bg-stone-50 transition"
            >
              ✕
            </button>

            {checkoutState === 'idle' && (
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF4D6D] bg-rose-50 px-2.5 py-0.5 rounded-full border border-pink-100/35">
                  Xendit/Midtrans Gateway
                </span>
                
                <h3 className="text-xl font-serif italic font-bold text-rose-950 mt-2 mb-1">Secure Checkout</h3>
                <p className="text-xs text-stone-500 mb-4">Complete your LoveBloom upgrade. Choose Indonesian local standard payments:</p>

                <form onSubmit={handlePaySubmit} className="space-y-2">
                  {[
                    { id: 'QRIS', label: 'QRIS Scan & Pay', provider: 'Instant code QR' },
                    { id: 'GoPay', label: 'GoPay E-Wallet', provider: 'Interactive Gojek secure redirect' },
                    { id: 'DANA', label: 'DANA Digital Wallet', provider: 'Instant wallet transfer code' },
                    { id: 'Bank Transfer', label: 'Bank Transfer (BCA, Mandiri, BNI)', provider: 'Virtual account bank payload' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${
                        paymentMethod === method.id
                          ? 'border-pink-400 bg-pink-50/20 shadow-inner'
                          : 'border-stone-200 bg-white hover:bg-stone-50/50'
                      }`}
                    >
                      <div className="text-xs">
                        <p className="font-bold text-stone-850">{method.label}</p>
                        <p className="text-[9px] text-stone-400">{method.provider}</p>
                      </div>
                      <input
                        type="radio"
                        name="sub_pay_method"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id as any)}
                        className="w-4 h-4 accent-pink-500 cursor-pointer"
                      />
                    </label>
                  ))}

                  <div className="p-3 bg-stone-50 border rounded-xl flex justify-between items-center text-xs font-bold text-stone-700 my-4">
                    <span>Total Bill:</span>
                    <span className="text-sm text-pink-600">{priceVal}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow transition"
                  >
                    Authenticate via {paymentMethod}
                  </button>
                </form>
              </div>
            )}

            {checkoutState === 'processing' && (
              <div className="text-center py-8">
                <span className="text-4xl animate-bounce block w-fit mx-auto mb-3">🌷</span>
                <p className="font-bold text-stone-800 text-sm">Processing signals securely...</p>
                <p className="text-[10px] text-stone-400">Communicating with payment infrastructure</p>
              </div>
            )}

            {/* Waiting Payment State */}
            {checkoutState === 'waiting_payment' && (
              <div className="text-center py-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100 mb-2 inline-block">
                  Awaiting Verification
                </span>
                <h4 className="text-sm font-bold text-stone-850">Your Invoice Payload Generated</h4>
                <p className="text-[10px] text-stone-500 max-w-xs mx-auto mt-1 mb-4 leading-relaxed">
                  Scan QR code or transfer to Virtual Account. Secure sandbox simulator detects action automatically.
                </p>

                {paymentMethod === 'QRIS' ? (
                  <div className="p-3 bg-white border border-stone-200 rounded-2xl w-fit mx-auto mb-4 text-center shadow-inner">
                    <div className="w-28 h-28 bg-[#2d2a32] p-1.5 rounded-lg flex flex-col justify-between mx-auto">
                      <div className="flex justify-between">
                        <div className="w-5 h-5 bg-white rounded border border-stone-900" />
                        <div className="w-5 h-5 bg-white rounded border border-stone-900" />
                      </div>
                      <span className="text-[9px] text-white font-mono tracking-widest leading-none font-bold">QRIS PAY</span>
                      <div className="flex justify-between">
                        <div className="w-5 h-5 bg-white rounded border border-stone-900" />
                        <div className="w-5 h-5 bg-white rounded border border-stone-900" />
                      </div>
                    </div>
                    <code className="text-[9px] font-extrabold uppercase mt-1.5 block text-stone-70 tracking-widest">{invoiceCode}</code>
                  </div>
                ) : (
                  <div className="p-4 bg-pink-50/20 border border-dashed border-pink-100 rounded-2xl mb-4">
                    <p className="text-[9px] font-bold text-pink-600 tracking-wider">VIRTUAL ACCOUNT ID</p>
                    <code className="text-base font-extrabold text-stone-800 font-mono tracking-wider block my-1">{invoiceCode}</code>
                    <p className="text-[9px] text-[#4A4A4A]">Please transfer exact sum: <strong className="text-rose-600">{priceVal}</strong></p>
                  </div>
                )}

                {/* Bloomy tips integration */}
                <div className="bg-amber-50 rounded-2xl p-3 text-left flex gap-2 text-[10.5px] text-amber-850 border border-amber-100/50 mb-4 select-none">
                  <span className="text-base shrink-0">🌷</span>
                  <p>
                    <strong>Bloomy's Advice:</strong> Tap the simulate payment button to instantaneously flash a success signal to our server.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCheckoutState('idle')}
                    className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold rounded-xl text-xs transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={simulateSuccessPayment}
                    className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs transition shadow"
                  >
                    Pay &amp; Validate 🌸
                  </button>
                </div>
              </div>
            )}

            {/* Premium Activated State */}
            {checkoutState === 'success' && (
              <div className="text-center py-4">
                <span className="text-5xl animate-bounce block mb-3">🌷✨</span>
                <h3 className="text-lg font-serif italic font-bold text-rose-500">Premium Activated Successfully!</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed mt-1 mb-4 select-none">
                  Your payment is verified. Beautiful flower styles, lock screen creators, stickers, and infinite scrapbooks are now at your disposal.
                </p>

                <div className="p-3 bg-green-50 text-green-800 border border-green-100 rounded-2xl text-[10.5px] text-left mb-4">
                  <strong>🌸 Bloomy's Message:</strong> "We grew the perfect seed for your love space. Enjoy exploring Premium together!"
                </div>

                <button
                  onClick={() => setShowPayModal(false)}
                  className="w-full py-2.5 bg-[#FF8FAB] hover:bg-[#FF4D6D] text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Enter Premium Nest
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
