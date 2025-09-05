// components/BottomNavigation.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

const BottomNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.bottomNav}>
     
      <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('dashboard')}>
        <Ionicons
          name="dashboard"
          size={24}
          color={activeTab === 'dashboard' ? '#2b7ff3' : '#555'}
        />
        <Text style={[styles.navLabel, activeTab === 'dashboard' && { color: '#2b7ff3' }]}>
          Dashboard
        </Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('services')}>
        <Ionicons
          name="analytics"
          size={24}
          color={activeTab === 'services' ? '#2b7ff3' : '#555'}
        />
        <Text style={[styles.navLabel, activeTab === 'services' && { color: '#2b7ff3' }]}>
          Assets
        </Text>
      </TouchableOpacity>

   
      <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('incidents')}>
        <Ionicons
          name="build"
          size={24}
          color={activeTab === 'incidents' ? '#2b7ff3' : '#555'}
        />
        <Text style={[styles.navLabel, activeTab === 'incidents' && { color: '#2b7ff3' }]}>
          Incidents
        </Text>
      </TouchableOpacity>
     
      <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('requests')}>
        <Ionicons
          name="textsms"
          size={24}
          color={activeTab === 'requests' ? '#2b7ff3' : '#555'}
        />
        <Text style={[styles.navLabel, activeTab === 'requests' && { color: '#2b7ff3' }]}>
          Requests
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('users')}>
        <Ionicons
          name="supervisor-account"
          size={24}
          color={activeTab === 'users' ? '#2b7ff3' : '#555'}
        />
        <Text style={[styles.navLabel, activeTab === 'users' && { color: '#2b7ff3' }]}>
          Users
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: { alignItems: 'center' },
  navLabel: { fontSize: 12, color: '#555', marginTop: 2 },
});

export default BottomNavigation;
