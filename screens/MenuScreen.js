import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  // SafeAreaView,
  StatusBar,  
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MenuScreen = ({ onClose, setActiveTab }) => {
  const [isAssetsExpanded, setIsAssetsExpanded] = useState(false);
  const [isUserExpanded, setIsUserExpanded] = useState(false);
  const [isReportExpanded, setIsReportExpanded] = useState(false);
  const [isBranchExpanded, setIsBranchExpanded] = useState(false);

  const toggleAssets = () => setIsAssetsExpanded(!isAssetsExpanded);
  const toggleUsers = () => setIsUserExpanded(!isUserExpanded);
  const toggleReports = () => setIsReportExpanded(!isReportExpanded);
  const toggleBranch = () => setIsBranchExpanded(!isBranchExpanded);

  const MenuItem = ({ icon, title, hasSubmenu = false, onPress, isExpanded = false, children }) => (
    <View>
      <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuItemLeft}>
          <Ionicons name={icon} size={20} color="#666" style={styles.menuIcon} />
          <Text style={styles.menuText}>{title}</Text>
        </View>
        {hasSubmenu && (
          <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={16} color="#666" />
        )}
      </TouchableOpacity>
      {isExpanded && children && <View style={styles.submenuContainer}>{children}</View>}
    </View>
  );

  const SubMenuItem = ({ title, onPress }) => (
    <TouchableOpacity style={styles.submenuItem} onPress={onPress}>
      <Text style={styles.submenuText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.topSection}>
        {/* Profile Info */}
        <View style={styles.menuHeader}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={24} color="#4285F4" />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Kristin Kumar</Text>
              <Text style={styles.userRole}>Admin</Text>
            </View>
          </View>
        </View>

        
        <MenuItem
          icon="location-outline"
          title="Branch"
          hasSubmenu={true}
          isExpanded={isBranchExpanded}
          onPress={toggleBranch}
        >
          <SubMenuItem title="Bangalore" onPress={() => console.log('Location 1 pressed')} />
          <SubMenuItem title="Hyderabad" onPress={() => console.log('Location 2 pressed')} />
        </MenuItem>
      </View>

     
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingVertical: 10 }}>
        <MenuItem
          icon="qr-code-outline"
          title="Scan QR Code"
          onPress={() => console.log('Scan QR Code pressed')}
        />
        <MenuItem
          icon="grid-outline"
          title="Dashboard"
          onPress={() => {
            setActiveTab('dashboard');
            onClose();
          }}
        />
        <MenuItem
          icon="alert-circle-outline"
          title="Incidents"
          onPress={() => {
            setActiveTab('incidents');
            onClose();
          }}
        />
        <MenuItem
          icon="settings-outline"
          title="Services"
          onPress={() => {
            setActiveTab('services');
            onClose();
          }}
        />
        <MenuItem
          icon="briefcase-outline"
          title="Assets"
          hasSubmenu={true}
          isExpanded={isAssetsExpanded}
          onPress={toggleAssets}
        >
          <SubMenuItem title="Assets 1" onPress={() => console.log('Assets 1 pressed')} />
          <SubMenuItem title="Assets 2" onPress={() => console.log('Assets 2 pressed')} />
        </MenuItem>
        <MenuItem
          icon="document-outline"
          title="Requests"
          onPress={() => console.log('Requests pressed')}
        />
        <MenuItem
          icon="people-outline"
          title="Users"
          hasSubmenu={true}
          isExpanded={isUserExpanded}
          onPress={toggleUsers}
        >
          <SubMenuItem title="All Users" onPress={() => console.log('User 1 pressed')} />
          <SubMenuItem title="Calender" onPress={() => console.log('User 2 pressed')} />
          <SubMenuItem title="User Manuals" onPress={() => console.log('User 2 pressed')} />
        </MenuItem>
        <MenuItem
          icon="bar-chart-outline"
          title="Reports"
          hasSubmenu={true}
          isExpanded={isReportExpanded}
          onPress={toggleReports}
        >
          <SubMenuItem title="All Report" onPress={() => console.log('Report 1 pressed')} />
          <SubMenuItem title="PM Checklist" onPress={() => console.log('Report 2 pressed')} />
        </MenuItem>
        <MenuItem
          icon="notifications-outline"
          title="Notifications"
          onPress={() => console.log('Notifications pressed')}
        />
        <MenuItem
          icon="scan-outline"
          title="QR Scanners"
          onPress={() => console.log('QR Scanners pressed')}
        />
        <MenuItem
          icon="person-outline"
          title="Profile"
          onPress={() => console.log('Profile pressed')}
        />
      </ScrollView>

      
      <View style={styles.menuFooter}>
        <TouchableOpacity style={styles.streamlineButton}>
          <Text style={styles.streamlineText}>Streamline</Text>
          <Ionicons name="chevron-up" size={16} color="#4285F4" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20, backgroundColor: '#F8F9FA', paddingHorizontal: 16 },
  topSection: { paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  scrollContainer: { flex: 1, paddingHorizontal: 0 },
  menuHeader: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  closeButton: { alignSelf: 'flex-end', padding: 5, marginBottom: 15 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userDetails: { flex: 1 },
  userName: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 2 },
  userRole: { fontSize: 14, color: '#666' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  menuIcon: { marginRight: 15 },
  menuText: { fontSize: 16, color: '#333' },
  submenuContainer: { backgroundColor: '#f8f9fa', paddingLeft: 20 },
  submenuItem: {
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e9ecef',
  },
  submenuText: { fontSize: 14, color: '#666' },
  menuFooter: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10 },
  streamlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  streamlineText: { fontSize: 16, color: '#4285F4', fontWeight: '500' },
});

export default MenuScreen;
