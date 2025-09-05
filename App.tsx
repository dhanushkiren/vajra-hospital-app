import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Dashboard from './screens/Dashboard';
import Incidents from './screens/Incidents';
import Services from './screens/Services';
import MenuScreen from './screens/MenuScreen';
import BottomNavigation from './components/BottomNavigation';

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  // Render screens
  const renderScreen = () => {
    if (activeTab === 'dashboard') return <Dashboard onMenuPress={openMenu} />;
    if (activeTab === 'incidents') return <Incidents />;
    if (activeTab === 'services') return <Services />;
    return <Dashboard onMenuPress={openMenu} />;
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {showMenu ? (
        <MenuScreen onClose={closeMenu} setActiveTab={setActiveTab} />
      ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <View style={{ flex: 1 }}>{renderScreen()}</View>

          {/* ✅ Bottom Navigation Component */}
          <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
};

export default App;
