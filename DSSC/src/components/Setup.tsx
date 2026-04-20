import { useState, useRef } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { getT } from '../i18n';
import type { AppSettings } from '../types';

interface Props {
  onComplete: (settings: AppSettings) => void;
}

const COUNTRIES = [
  { code: 'PY', nameES: 'Paraguay', nameEN: 'Paraguay', symbol: '₲' },
  { code: 'AR', nameES: 'Argentina', nameEN: 'Argentina', symbol: '$' },
  { code: 'US', nameES: 'Estados Unidos', nameEN: 'United States', symbol: '$' },
  { code: 'MX', nameES: 'México', nameEN: 'Mexico', symbol: '$' },
  { code: 'ES', nameES: 'España', nameEN: 'Spain', symbol: '€' },
  { code: 'CO', nameES: 'Colombia', nameEN: 'Colombia', symbol: '$' },
  { code: 'CL', nameES: 'Chile', nameEN: 'Chile', symbol: '$' },
  { code: 'PE', nameES: 'Perú', nameEN: 'Peru', symbol: 'S/' },
  { code: 'BR', nameES: 'Brasil', nameEN: 'Brazil', symbol: 'R$' },
];

export function Setup({ onComplete }: Props) {
  const [language, setLanguage] = useState<'en' | 'es'>('es');
  const [countryCode, setCountryCode] = useState('PY');
  const [companyName, setCompanyName] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = getT(language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    const selectedCountry = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0];
    onComplete({
      isConfigured: true,
      language,
      companyName: companyName.trim(),
      logoUrl,
      currencySymbol: selectedCountry.symbol,
      country: selectedCountry.code
    });
  };

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100 animate-in slide-in-from-bottom-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">{t.welcome}</h1>
          <p className="text-gray-500 font-medium">{t.setupSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">{t.language}</label>
            <select
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white"
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">{t.country || 'País'}</label>
            <select
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>
                  {language === 'es' ? c.nameES : c.nameEN} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">{t.companyName} *</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              placeholder={t.companyPlaceholder}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2 items-center mt-2">
            <label className="text-sm font-bold text-gray-700 self-start">{t.logo}</label>
            <div 
              className={`w-32 h-32 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden relative cursor-pointer ${logoUrl ? 'border-blue-500' : 'border-gray-300 bg-gray-50'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <ImageIcon className="w-8 h-8 mb-1" />
                  <span className="text-xs font-bold text-center px-2">{t.addLogo}</span>
                </div>
              )}
            </div>
            {logoUrl && (
              <button 
                type="button" 
                onClick={() => setLogoUrl(undefined)} 
                className="text-xs text-red-500 font-bold mt-1"
              >
                {t.removeLogo}
              </button>
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageCapture}
            />
          </div>

          <button 
            type="submit"
            disabled={!companyName.trim()}
            className="w-full min-h-[56px] mt-4 bg-blue-600 disabled:bg-blue-300 text-white rounded-xl font-bold text-lg active:bg-blue-700 transition-colors shadow-md"
          >
            {t.continue}
          </button>
        </form>
      </div>
    </div>
  );
}
