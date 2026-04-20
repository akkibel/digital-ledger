import { useLocalStorage } from './hooks/useLocalStorage';
import { Dashboard } from './components/Dashboard';
import { Setup } from './components/Setup';
import type { AppSettings } from './types';

function App() {
  const [settings, setSettings] = useLocalStorage<AppSettings>('dssc-settings-v2', {
    isConfigured: false,
    language: 'es',
    companyName: ''
  });

  return (
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen selection:bg-blue-200">
      {!settings.isConfigured ? (
        <Setup onComplete={setSettings} />
      ) : (
        <Dashboard settings={settings} />
      )}
    </div>
  );
}

export default App;
