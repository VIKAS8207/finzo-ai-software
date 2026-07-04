import { useState } from 'react';
import { CheckCircle2, ShieldCheck, Lock, Rocket } from 'lucide-react';
import MinimalInput from '../../components/ui/MinimalInput'; // Adjust path if needed

export default function PaymentStep({ formData, setFormData, handleBack, handleFinishSetup }) {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <form onSubmit={handleFinishSetup} className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-light text-finzo-white mb-2">Plan & Payment</h2>
          <p className="text-sm text-finzo-white/50">Complete setup to launch your workspace.</p>
        </div>
        {/* Billing Toggle */}
        <div className="flex bg-finzo-white/5 border rounded-[10px] border-finzo-white/10 p-1">
          <button type="button" onClick={() => setBillingCycle('monthly')} className={`px-4 py-1.5 text-xs font-bold transition-colors cursor-pointer rounded-[10px] ${billingCycle === 'monthly' ? 'bg-finzo-white/10 text-finzo-white' : 'text-finzo-white/40'}`}>Monthly</button>
          <button type="button" onClick={() => setBillingCycle('annual')} className={`px-4 py-1.5 text-xs font-bold transition-colors cursor-pointer rounded-[10px] ${billingCycle === 'annual' ? 'bg-finzo-white/10 text-finzo-white' : 'text-finzo-white/40'}`}>Annual <span className="text-finzo-primary">-20%</span></button>
        </div>
      </div>

      {/* Plans Row */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div 
          onClick={() => setFormData({ ...formData, plan: 'starter' })}
          className={`relative p-5 border cursor-pointer transition-all bg-transparent rounded-[10px] ${
            formData.plan === 'starter' ? 'border-finzo-white shadow-[0_10px_30px_rgba(255,255,255,0.05)]' : 'border-finzo-white/10 hover:border-finzo-white/30'
          }`}
        >
          <h3 className="text-sm font-bold text-finzo-white">Starter</h3>
          <div className="mt-2 text-xl font-light text-finzo-white">₹{billingCycle === 'monthly' ? '0' : '0'}<span className="text-xs font-normal text-finzo-white/50">/mo</span></div>
        </div>

        <div 
          onClick={() => setFormData({ ...formData, plan: 'growth' })}
          className={`relative p-5 border cursor-pointer transition-all bg-transparent rounded-[10px] ${
            formData.plan === 'growth' ? 'border-finzo-primary shadow-[0_10px_30px_rgba(23,70,234,0.1)]' : 'border-finzo-white/10 hover:border-finzo-white/30'
          }`}
        >
          <div className="absolute top-0 right-0 px-2 py-1 bg-finzo-primary text-[8px] font-bold uppercase tracking-widest text-white rounded-tr-[9px]">Recommended</div>
          <h3 className="text-sm font-bold text-finzo-white">Growth</h3>
          <div className="mt-2 text-xl font-light text-finzo-primary">₹{billingCycle === 'monthly' ? '2,999' : '2,399'}<span className="text-xs font-normal text-finzo-white/50">/mo</span></div>
        </div>
      </div>

      {/* Billing Info */}
      <div className="space-y-6 mb-8 pt-6 border-t border-finzo-white/10">
        <div className="grid grid-cols-2 gap-6">
          <MinimalInput 
            label="Billing Email" type="email" 
            value={formData.billingEmail} onChange={(e) => setFormData({ ...formData, billingEmail: e.target.value })} 
          />
          <MinimalInput 
            label="GSTIN (For Invoice)" className="uppercase"
            value={formData.billingGstin} onChange={(e) => setFormData({ ...formData, billingGstin: e.target.value.toUpperCase() })} 
          />
        </div>
        <MinimalInput 
          label="Billing Address" 
          value={formData.billingAddress} onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })} 
        />
      </div>

      {/* Payment Methods */}
      <div className="mb-8">
        <label className="block text-xs font-medium text-finzo-white/50 mb-3 uppercase tracking-widest">Payment Method</label>
        <div className="flex border-b border-finzo-white/20">
          {['card', 'upi', 'netbanking'].map(method => (
            <button 
              key={method} type="button" onClick={() => setPaymentMethod(method)}
              className={`px-6 py-2 text-sm font-bold capitalize transition-colors border-b-2 rounded-none cursor-pointer ${paymentMethod === method ? 'border-finzo-primary text-finzo-white' : 'border-transparent text-finzo-white/40 hover:text-finzo-white/70'}`}
            >
              {method}
            </button>
          ))}
        </div>
        {paymentMethod === 'card' && (
          <div className="mt-6 grid grid-cols-2 gap-6">
            <MinimalInput placeholder="Card Number" containerClassName="col-span-2" />
            <MinimalInput placeholder="MM/YY" />
            <MinimalInput placeholder="CVC" />
          </div>
        )}
        {paymentMethod === 'upi' && <div className="mt-6"><MinimalInput placeholder="Enter UPI ID" /></div>}
      </div>

      {/* Order Summary & Trust */}
      <div className="bg-finzo-white/5 p-4 flex flex-col gap-2 rounded-[10px] border border-finzo-white/10 mb-8">
        <div className="flex justify-between text-sm"><span className="text-finzo-white/50">Plan Total ({billingCycle})</span><span>₹{billingCycle === 'monthly' ? '2,999' : '28,788'}</span></div>
        <div className="flex justify-between text-sm"><span className="text-finzo-white/50">Taxes (18% GST)</span><span>₹{billingCycle === 'monthly' ? '540' : '5,181'}</span></div>
        <div className="flex justify-between text-lg font-bold border-t border-finzo-white/10 pt-2 mt-2"><span>Total Due Today</span><span className="text-finzo-primary">₹{billingCycle === 'monthly' ? '3,539' : '33,969'}</span></div>
        <button type="button" className="text-left text-[10px] text-finzo-white/50 mt-2 hover:text-finzo-white underline cursor-pointer">Have a coupon code?</button>
      </div>

      <div className="flex items-center justify-between mt-12">
        <button type="button" onClick={handleBack} className="text-sm font-bold text-finzo-white/50 hover:text-finzo-white transition-colors cursor-pointer">
          Back
        </button>
        <div className="flex items-center gap-4">
          <div className="text-[10px] text-finzo-white/30 text-right">
            <Lock size={12} className="inline mr-1 mb-0.5" />
            Secure SSL Payment<br/>Cancel anytime
          </div>
          <button 
            type="submit" 
            className="px-8 py-4 rounded-[10px] font-bold transition-all flex items-center gap-2 bg-gradient-to-r from-finzo-primary to-finzo-secondary text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-[1.02] cursor-pointer"
          >
            Confirm & Launch <Rocket size={18} />
          </button>
        </div>
      </div>
    </form>
  );
}