import React, { useState } from 'react';
import { AppScreen, GarageInfo, RescueOrder } from './types';
import { DEFAULT_GARAGE, INITIAL_ORDER } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { BookingView } from './views/BookingView';
import { TrackingView } from './views/TrackingView';
import { MechanicDashboardView } from './views/MechanicDashboardView';
import { PricingCatalogView } from './views/PricingCatalogView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [selectedGarage, setSelectedGarage] = useState<GarageInfo>(DEFAULT_GARAGE);
  const [currentOrder, setCurrentOrder] = useState<RescueOrder>(INITIAL_ORDER);
  const [activeOrderCount, setActiveOrderCount] = useState<number>(1);

  const handleNavigate = (screen: AppScreen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGarage = (garage: GarageInfo) => {
    setSelectedGarage(garage);
    setCurrentScreen('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmOrder = (order: RescueOrder) => {
    setCurrentOrder(order);
    setActiveOrderCount(1);
    setCurrentScreen('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelOrder = () => {
    setActiveOrderCount(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* Universal Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        activeOrderCount={activeOrderCount}
      />

      {/* Screen Views */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeView
            onSelectGarage={handleSelectGarage}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'booking' && (
          <BookingView
            selectedGarage={selectedGarage}
            onConfirmOrder={handleConfirmOrder}
            onNavigate={handleNavigate}
            onBackToHome={() => handleNavigate('home')}
          />
        )}

        {currentScreen === 'tracking' && (
          <TrackingView
            order={currentOrder}
            onNavigate={handleNavigate}
            onCancelOrder={handleCancelOrder}
          />
        )}

        {currentScreen === 'mechanic' && (
          <MechanicDashboardView
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'pricing' && (
          <PricingCatalogView
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Universal Bottom Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
