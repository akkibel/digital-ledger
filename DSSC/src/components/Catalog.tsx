import { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Plus, FolderPlus, Trash2, Tag, Search, PackageOpen } from 'lucide-react';
import { ProductModal } from './ProductModal';
import { getT } from '../i18n';
import type { Category, Product, AppSettings } from '../types';

interface Props {
  settings: AppSettings;
}

export function Catalog({ settings }: Props) {
  const [categories, setCategories] = useLocalStorage<Category[]>('dssc-categories', []);
  const [products, setProducts] = useLocalStorage<Product[]>('dssc-products', []);
  
  const [search, setSearch] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [preselectedCategoryId, setPreselectedCategoryId] = useState<string>();

  const t = getT(settings.language);

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setCategories([...categories, { id: crypto.randomUUID(), name: newCategory.trim() }]);
    setNewCategory('');
    setShowCategoryInput(false);
  };

  const handleDeleteCategory = (id: string) => {
    const hasProducts = products.some(p => p.categoryId === id);
    if (hasProducts) {
      alert(t.deleteCategoryError);
      return;
    }
    if (window.confirm(t.deleteCategoryConfirm)) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleSaveProduct = (name: string, price: number, categoryId: string, imageUrl?: string) => {
    setProducts([...products, {
      id: crypto.randomUUID(),
      name,
      price,
      categoryId,
      imageUrl
    }]);
    setShowProductModal(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm(t.deleteProductConfirm)) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const openProductModal = (catId?: string) => {
    setPreselectedCategoryId(catId);
    setShowProductModal(true);
  };

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    return products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [products, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
            placeholder={t.searchProduct}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-2">
        <button 
          onClick={() => setShowCategoryInput(true)}
          className="flex-1 min-h-[48px] bg-purple-100 text-purple-700 rounded-xl font-bold flex items-center justify-center gap-2 active:bg-purple-200 transition-colors px-2 text-sm sm:text-base"
        >
          <FolderPlus className="w-5 h-5" /> {t.newSubcategory}
        </button>
        <button 
          onClick={() => openProductModal()}
          className="flex-1 min-h-[48px] bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 active:bg-blue-700 transition-colors px-2 text-sm sm:text-base"
        >
          <Tag className="w-5 h-5" /> {t.newProduct}
        </button>
      </div>

      {showCategoryInput && (
        <form onSubmit={handleSaveCategory} className="flex gap-2 bg-purple-50 p-3 rounded-xl border border-purple-100">
          <input 
            type="text"
            autoFocus
            placeholder={t.subcategoryName}
            className="flex-1 px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none w-0"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold">{t.create}</button>
          <button type="button" onClick={() => setShowCategoryInput(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold">X</button>
        </form>
      )}

      <div className="flex flex-col gap-6 mt-2">
        {categories.length === 0 ? (
          <div className="text-center py-10 text-gray-500 font-medium flex flex-col items-center">
            <PackageOpen className="w-12 h-12 text-gray-300 mb-2" />
            {t.startCreatingCategory}
          </div>
        ) : (
          categories.map(category => {
            const prodOfCategory = filteredProducts.filter(p => p.categoryId === category.id);
            
            if (search.trim() && prodOfCategory.length === 0) return null;

            return (
              <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 text-lg">{category.name}</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openProductModal(category.id)}
                      className="text-xs bg-white border border-gray-200 px-2 py-1 rounded shadow-sm font-bold text-blue-600 flex items-center gap-1 active:bg-gray-50"
                    >
                      <Plus className="w-3 h-3" /> {t.add}
                    </button>
                    <button onClick={() => handleDeleteCategory(category.id)} className="text-gray-400 hover:text-red-500 active:bg-red-50 p-1 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col gap-3">
                  {prodOfCategory.length === 0 ? (
                    <div className="text-sm text-gray-400 text-center py-2">{t.noProductsInCategory}</div>
                  ) : (
                    prodOfCategory.map(prod => (
                      <div key={prod.id} className="flex gap-3 items-center border border-gray-100 p-2 rounded-xl">
                        {prod.imageUrl ? (
                          <img src={prod.imageUrl} alt={prod.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200">
                            <Tag className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg leading-tight">{prod.name}</h4>
                          <div className="text-blue-600 font-black mt-1">₲{prod.price.toLocaleString('es-PY')}</div>
                        </div>
                        <button onClick={() => handleDeleteProduct(prod.id)} className="p-3 text-red-400 active:bg-red-50 rounded-full">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {showProductModal && (
        <ProductModal
          settings={settings}
          categories={categories}
          preselectedCategoryId={preselectedCategoryId}
          onClose={() => setShowProductModal(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}
