// Dashboard.js
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  // SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Incidents from './Incidents';
import Services from './Services';


const HEADER_MAX_HEIGHT = 140;
const CARD_EXPANDED_HEIGHT = 130;
const CARD_COLLAPSED_HEIGHT = 80;

const Dashboard = ({ onMenuPress }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState("assets");

  const cardHeight = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [CARD_EXPANDED_HEIGHT, CARD_COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });

  const extraInfoOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a2b47" />

     
      <Animated.View style={[styles.header, { height: HEADER_MAX_HEIGHT }]}>
        <View style={styles.headerTop}>
          <Text style={styles.appName}>Vajra</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="grid-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon} onPress={onMenuPress}>
              <Ionicons name="menu" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={[styles.hospitalCard, { height: cardHeight }]}>
          <Text style={styles.hospitalName}>ABC Hospital</Text>
          <Text style={styles.branchName}>Branch Name</Text>
          <Animated.View style={{ opacity: extraInfoOpacity }}>
            <View style={styles.hospitalInfo}>
              <Text style={styles.hospitalText}>All Assets are in order</Text>
              <Text style={styles.hospitalHours}>00 hr : 00 m : 00 s</Text>
            </View>
            <TouchableOpacity style={styles.checkIcon}>
              <Ionicons name="checkmark" size={28} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Animated.View>


      <Animated.ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT + 70, paddingBottom: 50 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
      
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>22</Text>
              <Text style={styles.statLabel}>Dept</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>240</Text>
              <Text style={styles.statLabel}>Assets</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>04</Text>
              <Text style={styles.statLabel}>Check In</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

      
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              activeTab === "assets"
                ? { backgroundColor: '#2b7ff3' }
                : { backgroundColor: '#fff', borderWidth: 1, borderColor: '#2b7ff3' }
            ]}
            onPress={() => setActiveTab("assets")}
          >
            <Text
              style={[
                styles.actionButtonText,
                activeTab === "assets" ? { color: '#fff' } : { color: '#2b7ff3' }
              ]}
            >
              Assets
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              activeTab === "incidents"
                ? { backgroundColor: '#2b7ff3' }
                : { backgroundColor: '#fff', borderWidth: 1, borderColor: '#2b7ff3' }
            ]}
            onPress={() => setActiveTab("incidents")}
          >
            <Text
              style={[
                styles.actionButtonText,
                activeTab === "incidents" ? { color: '#fff' } : { color: '#2b7ff3' }
              ]}
            >
              Incidents
            </Text>
          </TouchableOpacity>
        </View>


        {activeTab === "assets" ? <Services /> : <Incidents />}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  header: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    backgroundColor: '#1a2b47',
    zIndex: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 25,
  },
  appName: { color: '#fff', fontSize: 20, fontWeight: '700' },
  headerIcons: { flexDirection: 'row' },
  headerIcon: { marginLeft: 15 },

  hospitalCard: {
    backgroundColor: '#2b7ff3',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  hospitalName: { color: '#fff', fontSize: 20, fontWeight: '700' },
  branchName: { color: '#E3F2FD', fontSize: 14, marginBottom: 8 },
  hospitalInfo: { marginBottom: 8, marginTop: 8 },
  hospitalText: { color: '#fff', fontSize: 14 },
  hospitalHours: { color: '#E3F2FD', fontSize: 12 },
  checkIcon: {
    position: 'absolute',
    top: 3,
    right: 15,
    backgroundColor: '#2b7ff3',
    borderRadius: 20,
    padding: 6,
  },

  scrollContainer: { flex: 1 },

  statsContainer: { paddingHorizontal: 8, marginBottom: 20, marginTop: 20 },
  statsRow: { flexDirection: 'row', justifyContent: "space-around" },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    alignItems: 'flex-start',
    flex: 1,
    marginHorizontal: 5,
    elevation: 1.5,
  },
  statNumber: { fontSize: 24, fontWeight: '900', color: '#3785ddff', marginBottom: 20 },
  statLabel: { fontSize: 14, fontWeight: '900', color: '#000000ff' },

  actionButtons: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    paddingHorizontal: 20, 
    marginBottom: 10, 
  },
  divider: { height: 1, backgroundColor: '#d2d2d2ff', marginVertical: 10, marginBottom: 20, paddingHorizontal: 50 },
  actionButton: {
    borderRadius: 25,
    paddingHorizontal: 60,
    paddingVertical: 14,
    marginHorizontal: 10,
  },
  actionButtonText: { fontSize: 16, fontWeight: '600' },
});

export default Dashboard;
