import { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Client, Transaction, AppSettings } from '../types';
import { Search, Plus, UserPlus, MessageCircle, Trash2, Users, ClipboardList, Tag } from 'lucide-react';
import { TransactionModal } from './TransactionModal';
import { NewClientModal } from './NewClientModal';
import { MissingItems } from './MissingItems';
import { Catalog } from './Catalog';
import { getT } from '../i18n';

interface Props {
  settings: AppSettings;
}

export function Dashboard({ settings }: Props) {
  const [clients, setClients] = useLocalStorage<Client[]>('dssc-clients-v2', []);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'CLIENTS' | 'MISSING' | 'CATALOG'>('CLIENTS');
  
  // Modals state
  const [showNewClient, setShowNewClient] = useState(false);
  const [transactionModal, setTransactionModal] = useState<{ clientId: string | null; type: 'DEBT' | 'PAYMENT' | null }>({ clientId: null, type: null });

  const t = getT(settings.language);

  const filteredClients = useMemo(() => {
    return clients.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [clients, search]);

  const handleAddClient = (name: string, phone?: string) => {
    const newClient: Client = {
      id: crypto.randomUUID(),
      name,
      phone,
      transactions: [],
      totalBalance: 0
    };
    setClients([...clients, newClient]);
    setShowNewClient(false);
  };

  const handleDeleteClient = (id: string) => {
    if (window.confirm(t.deleteClientConfirm)) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  const handleRegisterTransaction = (clientId: string, amount: number, type: 'DEBT' | 'PAYMENT', details?: string) => {
    setClients(prevClients => prevClients.map(client => {
      if (client.id !== clientId) return client;
      
      const newTransaction: Transaction = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        amount,
        type,
        details
      };
      
      const transactions = [...client.transactions, newTransaction];
      const totalBalance = transactions.reduce((acc, mov) => {
        return mov.type === 'DEBT' ? acc + mov.amount : acc - mov.amount;
      }, 0);

      return {
        ...client,
        transactions,
        totalBalance
      };
    }));
    setTransactionModal({ clientId: null, type: null });
  };

  const handleFullPayment = (clientId: string, totalBalance: number) => {
    if (totalBalance <= 0) return;
    const confirmMessage = t.payInFullConfirm.replace('{amount}', totalBalance.toLocaleString('es-PY'));
    if (window.confirm(confirmMessage)) {
      handleRegisterTransaction(clientId, totalBalance, 'PAYMENT', t.payInFull);
    }
  };

  const generateWhatsAppMessage = (client: Client) => {
    if (!client.phone) {
      alert(t.noPhoneAlert);
      return;
    }
    
    const recentTransactions = client.transactions.slice(-3).map(m => 
      `- ${new Date(m.date).toLocaleDateString(settings.language === 'es' ? 'es-PY' : 'en-US')}: ${m.type === 'DEBT' ? t.addDebt : t.registerPayment} ₲${m.amount} ${m.details ? `(${m.details})` : ''}`
    ).join('%0A');

    let balanceText = '';
    if (client.totalBalance > 0) {
      balanceText = t.waToPay.replace('{amount}', client.totalBalance.toLocaleString('es-PY'));
    } else {
      balanceText = t.waInFavor.replace('{amount}', Math.abs(client.totalBalance).toLocaleString('es-PY'));
    }

    const greeting = t.waGreeting.replace('{name}', client.name).replace('{company}', settings.companyName);
    
    const text = `${greeting}%0A${balanceText}%0A%0A${t.waRecent}%0A${recentTransactions || t.waNoRecent}`;
    
    let num = client.phone.replace(/\D/g,'');
    window.open(`https://wa.me/${num}?text=${text}`, '_blank');
  };

  const globalBalance = useMemo(() => {
    return clients.reduce((acc, client) => acc + client.totalBalance, 0);
  }, [clients]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 pb-20">
      <header className="bg-white px-4 pt-6 pb-2 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt="Logo" className="w-10 h-10 rounded-xl object-cover shadow-sm" />
          ) : (
            <img src="/AppIcon.png" alt="Logo" className="w-10 h-10 rounded-xl object-cover shadow-sm" />
          )}
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{settings.companyName}</h1>
        </div>
        <div className="mt-2 text-sm text-gray-500 font-medium">{t.totalBalance}</div>
        <div className="text-3xl font-black text-red-600">
          ₲{globalBalance.toLocaleString('es-PY')}
        </div>
        
        <div className="flex mt-4 bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('CLIENTS')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'CLIENTS' ? 'bg-white shadow text-blue-700' : 'text-gray-500'}`}
          >
            <Users className="w-4 h-4" /> {t.clients}
          </button>
          <button 
            onClick={() => setActiveTab('CATALOG')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'CATALOG' ? 'bg-white shadow text-blue-700' : 'text-gray-500'}`}
          >
            <Tag className="w-4 h-4" /> {t.products}
          </button>
          <button 
            onClick={() => setActiveTab('MISSING')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'MISSING' ? 'bg-white shadow text-blue-700' : 'text-gray-500'}`}
          >
            <ClipboardList className="w-4 h-4" /> {t.missingItems}
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 flex flex-col gap-4">
        {activeTab === 'CLIENTS' ? (
          <>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm text-lg shadow-sm transition-all font-medium"
                placeholder={t.searchClient}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              onClick={() => setShowNewClient(true)}
              className="w-full min-h-[56px] bg-blue-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
              <UserPlus className="h-6 w-6" />
              {t.newClient}
            </button>

            <div className="flex flex-col gap-4 mt-2">
              {filteredClients.length === 0 ? (
                <div className="text-center py-10 text-gray-500 font-medium">
                  {search ? t.noClients : t.noClientsYet}
                </div>
              ) : (
                filteredClients.map(client => (
                  <div key={client.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-gray-900">{client.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {client.phone && (
                            <button 
                              onClick={() => generateWhatsAppMessage(client)}
                              className="flex items-center text-green-700 bg-green-50 px-2 py-1 rounded-md text-sm font-bold border border-green-200 active:bg-green-100 transition-colors"
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {t.whatsappMessage}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-2 flex flex-col items-end gap-2">
                        <div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.balance}</div>
                          <div className={`text-2xl font-black ${client.totalBalance > 0 ? 'text-red-600' : client.totalBalance < 0 ? 'text-green-600' : 'text-gray-900'}`}>
                            ₲{Math.abs(client.totalBalance).toLocaleString('es-PY')}
                          </div>
                          {client.totalBalance < 0 && <div className="text-xs text-green-600 font-bold">{t.inFavor}</div>}
                        </div>
                        <button 
                          onClick={() => handleDeleteClient(client.id)}
                          className="p-1 text-gray-400 hover:text-red-500 active:bg-red-50 rounded"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full mt-2">
                      <button 
                        onClick={() => setTransactionModal({ clientId: client.id, type: 'DEBT' })}
                        className="flex-1 min-h-[48px] bg-red-50 border border-red-200 text-red-700 rounded-xl font-bold flex items-center justify-center gap-2 active:bg-red-100 transition-colors"
                      >
                        <Plus className="w-5 h-5" /> {t.addDebt}
                      </button>
                      <button 
                        onClick={() => setTransactionModal({ clientId: client.id, type: 'PAYMENT' })}
                        className="flex-1 min-h-[48px] bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 active:bg-green-700 transition-colors shadow-sm"
                      >
                        {t.registerPayment}
                      </button>
                    </div>
                    {client.totalBalance > 0 && (
                      <button 
                        onClick={() => handleFullPayment(client.id, client.totalBalance)}
                        className="w-full min-h-[48px] mt-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl font-bold flex items-center justify-center gap-2 active:bg-blue-100 transition-colors"
                      >
                        {t.payInFull} (₲{client.totalBalance.toLocaleString('es-PY')})
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        ) : activeTab === 'CATALOG' ? (
          <Catalog settings={settings} />
        ) : (
          <MissingItems settings={settings} />
        )}
      </main>

      {showNewClient && (
        <NewClientModal 
          settings={settings}
          onClose={() => setShowNewClient(false)}
          onSave={handleAddClient}
        />
      )}

      {transactionModal.clientId && transactionModal.type && (
        <TransactionModal
          settings={settings}
          type={transactionModal.type}
          onClose={() => setTransactionModal({ clientId: null, type: null })}
          onSave={(amount, details) => handleRegisterTransaction(transactionModal.clientId!, amount, transactionModal.type!, details)}
        />
      )}
    </div>
  );
}
