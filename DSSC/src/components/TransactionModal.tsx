import { useState } from 'react';
import { X, Calculator } from 'lucide-react';
import { getT } from '../i18n';
import type { AppSettings } from '../types';

interface Props {
  type: 'DEBT' | 'PAYMENT';
  settings: AppSettings;
  onClose: () => void;
  onSave: (amount: number, details?: string) => void;
}

export function TransactionModal({ type, settings, onClose, onSave }: Props) {
  const [amountInput, setAmountInput] = useState('');
  const [details, setDetails] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [weight, setWeight] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');

  const t = getT(settings.language);
  const isDebt = type === 'DEBT';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amountInput.replace(',', '.'));
    if (isNaN(amountNum) || amountNum <= 0) return;
    onSave(amountNum, details.trim() || undefined);
  };

  const calculateWeight = () => {
    const w = parseFloat(weight.replace(',', '.'));
    const p = parseFloat(pricePerKg.replace(',', '.'));
    if (!isNaN(w) && !isNaN(p)) {
      const total = w * p;
      setAmountInput(total.toFixed(0)); // Removing decimals for Guaraníes
      setShowCalculator(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:w-[400px] sm:rounded-2xl rounded-t-2xl p-6 pb-8 animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-black ${isDebt ? 'text-red-600' : 'text-green-600'}`}>
            {isDebt ? t.addDebtTitle : t.registerPaymentTitle}
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 active:bg-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        {showCalculator ? (
          <div className="bg-blue-50 p-4 rounded-xl mb-6 flex flex-col gap-3 border border-blue-100">
            <h3 className="font-bold text-blue-900 flex items-center gap-2">
              <Calculator className="w-5 h-5" /> {t.weightCalculator}
            </h3>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs font-bold text-blue-800">{t.weightKg}</label>
                <input 
                  type="number"
                  step="0.001"
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  placeholder="0.500"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold text-blue-800">{t.pricePerKg.replace('{currency}', settings.currencySymbol || '₲')}</label>
                <input 
                  type="number"
                  step="1"
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  placeholder="15000"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button 
                type="button"
                onClick={() => setShowCalculator(false)}
                className="flex-1 py-2 bg-white text-gray-600 font-bold rounded-lg border border-gray-200"
              >
                {t.cancel}
              </button>
              <button 
                type="button"
                onClick={calculateWeight}
                className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-lg"
              >
                {t.calculate}
              </button>
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 relative">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700">{t.amount.replace('{currency}', settings.currencySymbol || '₲')}</label>
              {!showCalculator && isDebt && (
                <button 
                  type="button" 
                  onClick={() => setShowCalculator(true)}
                  className="text-xs flex items-center gap-1 text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-md"
                >
                  <Calculator className="w-4 h-4" /> {t.useCalculator}
                </button>
              )}
            </div>
            
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-500">{settings.currencySymbol || '₲'}</span>
              <input 
                type="number" 
                step="1"
                autoFocus={!showCalculator}
                className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl text-3xl font-black focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                placeholder="0"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">{t.detailsOptional}</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
              placeholder={isDebt ? t.debtPlaceholder : t.paymentPlaceholder}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={!amountInput || isNaN(parseFloat(amountInput))}
            className={`w-full min-h-[56px] mt-2 text-white rounded-xl font-black text-xl transition-colors ${
              isDebt 
                ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-red-300' 
                : 'bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-green-300'
            }`}
          >
            {isDebt ? t.addDebtTitle : t.registerPaymentTitle}
          </button>
        </form>
      </div>
    </div>
  );
}
