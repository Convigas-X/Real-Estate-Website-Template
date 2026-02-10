import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const SoldListings = () => {
  useEffect(() => {
    // Load IDX Broker Sold/Pending Showcase Widget (ID: 135840)
    const script = document.createElement('script');
    script.src = 'https://realestate360.idxbroker.com/idx/customshowcasejs.php?widgetid=135840';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* IDX Wrapper Container - Sold/Pending Listings */}
      <main className="w-full min-h-[800px] bg-black py-10 px-4">
        <div id="idx-start"></div>
        <div id="idx-stop"></div>
      </main>

      <Footer />
    </div>
  );
};

export default SoldListings;
