import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { getT } from '../i18n';
import type { MissingItem, AppSettings } from '../types';

interface Props {
  settings: AppSettings;
}

export function MissingItems({ settings }: Props) {
  const [items, setItems] = useLocalStorage<MissingItem[]>('dssc-missing-items', []);
  const [newItem, setNewItem] = useState('');
  const t = getT(settings.language);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    
    setItems([
      ...items,
      { id: crypto.randomUUID(), name: newItem.trim(), purchased: false }
    ]);
    setNewItem('');
  };

  const togglePurchased = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, purchased: !i.purchased } : i));
  };

  const remove = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input 
          type="text"
          placeholder={t.addItemPlaceholder}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-xl font-bold flex items-center justify-center min-h-[48px]"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      <div className="flex flex-col gap-2">
        {items.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            {t.noMissingItems}
          </div>
        ) : (
          items.map(item => (
            <div 
              key={item.id} 
              className={`flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border ${item.purchased ? 'border-green-200 bg-green-50' : 'border-gray-100'}`}
            >
              <button 
                onClick={() => togglePurchased(item.id)}
                className="flex items-center gap-3 flex-1 text-left"
              >
                {item.purchased ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 flex-shrink-0" />
                )}
                <span className={`text-lg ${item.purchased ? 'line-through text-gray-400' : 'text-gray-900 font-medium'}`}>
                  {item.name}
                </span>
              </button>
              
              <button 
                onClick={() => remove(item.id)}
                className="p-2 text-red-400 hover:text-red-600 active:bg-red-50 rounded-full transition-colors ml-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
