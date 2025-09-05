import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const data = [
  { label: 'Blood', value: 2, color: '#2C3E50' },
  { label: 'Emer..', value: 5, color: '#2C3E50' },
  { label: 'ICU', value: 4, color: '#2C3E50' },
  { label: 'Blood..', value: 2, color: '#2C3E50' },
  { label: 'Lab..', value: 8, color: '#FF6B35' }, // needs attention
  { label: 'Lab..', value: 3, color: '#2C3E50' },
  { label: 'Lab..', value: 5, color: '#2C3E50' },
];

const Services = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      
      <View style={styles.card}>
       
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Services</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.cardSubtitle}>No. of services</Text>
            <View style={styles.indicatorRow}>
              <View style={[styles.dot, { backgroundColor: '#FF6B35' }]} />
              <Text style={styles.indicatorText}>01 Dept needs attention</Text>
            </View>
          </View>
        </View>
       
        <View style={styles.chartContainer}>
          {data.map((item, i) => (
            <View key={i} style={styles.chartItem}>
              <View
                style={[
                  styles.bar,
                  { height: item.value * 10, backgroundColor: item.color },
                ]}
              />
              <Text style={styles.barLabel} numberOfLines={1}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

   
        <View style={styles.controls}>
          <Ionicons name="chevron-back" size={22} color="#2C3E50" />
          <View style={styles.pagination}>
            <View style={styles.line} />
            <View style={[styles.line, { width: 25, backgroundColor: '#2C3E50' }]} />
            <View style={styles.line} />
          </View>
          <Ionicons name="chevron-forward" size={22} color="#2C3E50" />
        </View>
        {/* Divider */}
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
          <Text style={styles.addButtonPlus}>+</Text>
        </TouchableOpacity>
      </View>

     
      <View style={styles.listContainer}>
        {data.map((item, i) => (
          <View key={i} style={styles.listItemWrap}>
            <View style={styles.listLeft}>
              <Text style={styles.listTitle}>Ge ECG Machine</Text>
              <Text style={styles.listSubtitle}>Intensive Care</Text>
              <Text style={styles.listSubtitle}>AG-764569812</Text>
            </View>
            {item.color === '#FF6B35' ? (
              <View style={styles.orangeBox}>
                <Ionicons name="warning-outline" size={20} color="#fff" style={{ marginBottom: 6 }} />
                <Text style={styles.orangeBoxText}>
                  {item.value.toString().padStart(2, '0')} Services
                </Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 16 }}>
                <Text style={styles.listValue}>{item.value.toString().padStart(2, '0')}</Text>
                <Text style={styles.listServices}> Services</Text>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.allServicesButton}>
          <Text style={styles.allServicesText}>All Services</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 22,
  },
  cardHeader: { marginBottom: 15 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#2C3E50' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardSubtitle: { fontSize: 12, color: '#7F8C8D' },
  indicatorRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
  indicatorText: { fontSize: 12, color: '#FF6B35' },

  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
  chartItem: { alignItems: 'center', flex: 1, marginHorizontal: 3 },
  bar: { width: 18, borderRadius: 4 },
  barLabel: { fontSize: 10, color: '#2C3E50', marginTop: 4 },

  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pagination: { flexDirection: 'row', alignItems: 'center' },
  line: {
    width: 15,
    height: 3,
    backgroundColor: '#BDC3C7',
    borderRadius: 2,
    marginHorizontal: 3,
  },
  divider: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 12 },
  addButton: {
    backgroundColor: '#3498DB',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 115,
    alignItems: 'center',
    paddingVertical: 12,
    alignSelf: 'flex-end',
    paddingHorizontal: 25,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  addButtonPlus: { color: '#FFF', fontSize: 18, fontWeight: '300' },

  // LIST STYLES
  listContainer: {},
  listItemWrap: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 11,
    marginBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F3F3',
    overflow: 'hidden',
    minHeight: 85,
  },
  listLeft: { padding: 14 },
  listTitle: { fontWeight: '600', color: '#232323', fontSize: 15, marginBottom: 5 },
  listSubtitle: { color: '#7F8C8D', fontSize: 13, marginTop: 0 },
  listValue: {
    fontSize: 17,
    color: '#FF9500',
    alignSelf: 'center',
    fontWeight: '600',
    marginRight: 3,
  },
  listServices: {
    fontSize: 15,
    color: '#FF9500',
    alignSelf: 'center',
    fontWeight: '400',
  },
  orangeBox: {
    minWidth: 85,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 15,
    paddingHorizontal: 14,
  },
  orangeBoxText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  allServicesButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    margin: 15,
  },
  allServicesText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default Services;
