import { useState } from 'react';
import { X } from 'lucide-react';
import { getT } from '../i18n';
import type { AppSettings } from '../types';

interface Props {
  settings: AppSettings;
  onClose: () => void;
  onSave: (name: string, phone?: string) => void;
}

export function NewClientModal({ settings, onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const t = getT(settings.language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim(), phone.trim() || undefined);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:w-[400px] sm:rounded-2xl rounded-t-2xl p-6 pb-8 animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t.newClient}</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 active:bg-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">{t.clientName}</label>
            <input 
              type="text" 
              autoFocus
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">{t.phoneOptional}</label>
            <input 
              type="tel" 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={!name.trim()}
            className="w-full min-h-[56px] mt-2 bg-blue-600 disabled:bg-blue-300 text-white rounded-xl font-bold text-lg active:bg-blue-700 transition-colors"
          >
            {t.saveClient}
          </button>
        </form>
      </div>
    </div>
  );
}
