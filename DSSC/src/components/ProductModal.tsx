import { useState, useRef } from 'react';
import { X, Camera } from 'lucide-react';
import { getT } from '../i18n';
import type { Category, AppSettings } from '../types';

interface Props {
  settings: AppSettings;
  categories: Category[];
  preselectedCategoryId?: string;
  onClose: () => void;
  onSave: (name: string, price: number, categoryId: string, imageUrl?: string) => void;
}

export function ProductModal({ settings, categories, preselectedCategoryId, onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(preselectedCategoryId || (categories.length > 0 ? categories[0].id : ''));
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = getT(settings.language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(price.replace(',', '.'));
    if (!name.trim() || isNaN(priceNum) || priceNum <= 0 || !categoryId) return;
    onSave(name.trim(), priceNum, categoryId, imageUrl);
  };

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:w-[400px] sm:rounded-2xl rounded-t-2xl p-6 pb-8 animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-gray-900">{t.newProduct}</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 active:bg-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 items-center">
            <div 
              className={`w-32 h-32 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden relative cursor-pointer ${imageUrl ? 'border-blue-500' : 'border-gray-300 bg-gray-50'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <Camera className="w-8 h-8 mb-1" />
                  <span className="text-xs font-bold text-center px-2">{t.addPhoto}</span>
                </div>
              )}
            </div>
            {imageUrl && (
              <button 
                type="button" 
                onClick={() => setImageUrl(undefined)} 
                className="text-xs text-red-500 font-bold mt-1"
              >
                {t.removePhoto}
              </button>
            )}
            <input 
              type="file" 
              accept="image/*" 
              capture="environment"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageCapture}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">{t.productName}</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">{t.price.replace('{currency}', settings.currencySymbol || '₲')}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-500">{settings.currencySymbol || '₲'}</span>
              <input 
                type="number" 
                step="1"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-xl font-black focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">{t.category}</label>
            <select
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all bg-white"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="" disabled>{t.selectCategory}</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit"
            disabled={!name.trim() || !price || !categoryId}
            className="w-full min-h-[56px] mt-2 bg-blue-600 disabled:bg-blue-300 text-white rounded-xl font-bold text-lg active:bg-blue-700 transition-colors"
          >
            {t.saveProduct}
          </button>
        </form>
      </div>
    </div>
  );
}
