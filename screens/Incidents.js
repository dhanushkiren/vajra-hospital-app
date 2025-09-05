import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  // SafeAreaView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';


function describeArc(cx, cy, r, startAngle, endAngle) {
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', r, r, 0, largeArcFlag, 0, end.x, end.y,
  ].join(' ');
}

const HalfCircleProgress = ({ total, stats, size = 120, strokeWidth = 16 }) => {
  const radius = (size - strokeWidth) / 2;
  const centerX = size / 2;
  const centerY = size / 2;
  const totalValue = stats.reduce((sum, stat) => sum + stat.count, 0);

  let currentAngle = -90; // start from left side
  const segments = stats.map((stat, idx) => {
    const angle = (stat.count / totalValue) * 180; // distribute over 180 only
    const seg = (
      <Path
        key={idx}
        d={describeArc(centerX, centerY, radius, currentAngle, currentAngle + angle)}
        stroke={stat.color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
    );
    currentAngle += angle;
    return seg;
  });

  return (
    <View style={{ width: size, height: size / 2, alignItems: 'center', justifyContent: 'flex-end' }}>
      <Svg width={size} height={size / 2}>
        {segments}
      </Svg>
      <View style={{ position: 'absolute', bottom: -10, alignItems: 'center' }}>
        <Text style={styles.progressTotal}>{total}</Text>
        <Text style={styles.progressLabel}>Reported</Text>
      </View>
    </View>
  );
};

const StatusDot = ({ color }) => (
  <View style={[styles.statusDot, { backgroundColor: color }]} />
);

const CardSection = ({
  title,
  subtitle,
  total,
  dueCount,
  dueColor,
  stats,
  onRequest,
  isIncident = false,
}) => (
  <View style={styles.card}>
   
    <View style={styles.cardHeader}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}
      </View>
      <TouchableOpacity>
        <Ionicons name="arrow-forward-sharp" size={22} color="#7F8C8D" />
      </TouchableOpacity>
    </View>

   
    {isIncident ? (
      <>
        <View style={styles.incidentStatsRow}>
          {stats.map((stat, index) => (
            <Text
              key={index}
              style={[
                styles.incidentStat,
                { color: stat.color },
              ]}
            >
              {String(stat.count).padStart(2, '0')} {stat.label}
            </Text>
          ))}
        </View>
        <View style={styles.incidentProgress}>
          <HalfCircleProgress total={total} stats={stats} />
        </View>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.addButton} onPress={onRequest}>
          <Text style={styles.addButtonText}>Add</Text>
          <Text style={styles.addButtonPlus}>+</Text>
        </TouchableOpacity>
      </>
    ) : (
      <>
       
        <View style={styles.cardContent}>
          <View style={styles.progressSection}>
            <HalfCircleProgress total={total} stats={stats} />
          </View>
          <View style={styles.statsSection}>
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                count={stat.count}
                label={stat.label}
                color={stat.color}
              />
            ))}
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.cardFooter}>
          <Text style={[styles.dueText, { color: dueColor }]}>
            {String(dueCount).padStart(2, '0')} Due
          </Text>
          <TouchableOpacity style={styles.requestButton} onPress={onRequest}>
            <Text style={styles.requestButtonText}>Request</Text>
            <Text style={styles.plusIcon}>+</Text>
          </TouchableOpacity>
        </View>
      </>
    )}
  </View>
);

const StatItem = ({ count, label, color = '#333' }) => (
  <View style={styles.statItem}>
    <StatusDot color={color} />
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const Incident = () => {
  const handleRequest = (type) => {
    console.log(`Request ${type}`);
  };

  const incidentStats = [
    { count: 4, label: 'Open', color: '#FF6B35' },
    { count: 6, label: 'Closed', color: '#2C3E50' },
  ];

  const calibrationStats = [
    { count: 247, label: 'Calibrated', color: '#2C3E50' },
    { count: 12, label: 'Not Calibrated', color: '#95A5A6' },
    { count: 38, label: 'Not Required', color: '#BDC3C7' },
  ];

  const amcCmcStats = [
    { count: 213, label: 'AMC', color: '#2C3E50' },
    { count: 43, label: 'CMC', color: '#95A5A6' },
  ];

  const warrantyStats = [
    { count: 250, label: 'Total', color: '#2C3E50' },
    { count: 10, label: 'Requested', color: '#95A5A6' },
    { count: 7, label: 'Expires soon', color: '#FF6B35' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ✅ New Incident Card */}
        <CardSection
          title="Incidents"
          subtitle="No. of raised incidents"
          total={10}
          stats={incidentStats}
          onRequest={() => handleRequest('Incidents')}
          isIncident
        />

        {/* Other existing cards */}
        <CardSection
          title="Calibrations"
          total={297}
          dueCount={4}
          dueColor="#FF6B35"
          stats={calibrationStats}
          onRequest={() => handleRequest('Calibrations')}
        />
        <CardSection
          title="AMC / CMC"
          total={256}
          dueCount={0}
          dueColor="#333"
          stats={amcCmcStats}
          onRequest={() => handleRequest('AMC/CMC')}
        />
        <CardSection
          title="Warranty"
          total={267}
          dueCount={7}
          dueColor="#FF6B35"
          stats={warrantyStats}
          onRequest={() => handleRequest('Warranty')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', paddingHorizontal: 16, paddingTop: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#2C3E50' },
  cardSubtitle: { fontSize: 12, color: '#7F8C8D', marginTop: 2 },
  cardContent: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20 },
  progressSection: { marginRight: 20, flex: 1, alignItems: 'center' },
  progressTotal: { fontSize: 22, fontWeight: '700', color: '#2C3E50' },
  progressLabel: { fontSize: 13, color: '#7F8C8D', marginTop: -2 },
  statsSection: { flex: 1 },
  statItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  statCount: { fontSize: 16, fontWeight: '600', color: '#2C3E50', marginRight: 8, minWidth: 30 },
  statLabel: { fontSize: 14, color: '#7F8C8D', flex: 1 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dueText: { fontSize: 16, fontWeight: '600' },
  requestButton: { backgroundColor: '#3498DB', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25, flexDirection: 'row', alignItems: 'center',alignSelf: 'flex-end', justifyContent: 'space-between' },
  requestButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600', marginRight: 8 },
  plusIcon: { color: '#FFF', fontSize: 18, fontWeight: '300' },
  divider: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 12 },
  incidentStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  incidentStat: { fontSize: 16, fontWeight: '600' },
  incidentProgress: { marginTop: 10, marginBottom: 10, alignItems: 'center' },
  addButton: {
  backgroundColor: '#3498DB',
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 25,
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-end',
  justifyContent: 'space-between',
  width: 115,
  marginTop: 5,
},
  addButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600', marginRight: 8 },
  addButtonPlus: { color: '#FFF', fontSize: 18, fontWeight: '300' },
});

export default Incident;
