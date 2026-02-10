import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const IdxWrapper = () => {
  useEffect(() => {
    // Load IDX Broker Map Search Widget (ID: 135842)
    // This provides the full Search/Map/Results functionality
    const script = document.createElement('script');
    script.src = 'https://realestate360.idxbroker.com/idx/customshowcasejs.php?widgetid=135842';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 1. Your Real Header */}
      <Navigation />

      {/* 2. The Injection Point (Where IDX Broker dumps the MLS) */}
      <main className="w-full max-w-7xl mx-auto py-10 px-4 min-h-[800px]">
        {/* IDX Broker looks for these EXACT ids to know where to start/stop */}
        <div id="idx-start"></div>
        <div id="idx-stop"></div>
      </main>

      {/* 3. Your Real Footer */}
      <Footer />
    </div>
  );
};

export default IdxWrapper;
