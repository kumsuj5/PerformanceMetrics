import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const AllRecords = () => {
  const [allMetrics, setAllMetrics] = useState([]);
  const [maxStrength, setMaxStrength] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);

  const fetchMetrics = async () => {
    const savedMetrics =
      JSON.parse(await AsyncStorage.getItem('allMetrics')) || [];
    setAllMetrics(savedMetrics);

    const strengthValues = savedMetrics.map(metric => metric.strength);
    const speedValues = savedMetrics.map(metric => metric.speed);
    setMaxStrength(Math.max(0, ...strengthValues));
    setMaxSpeed(Math.max(0, ...speedValues));
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMetrics();
    }, [])
  );

  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      setAllMetrics([]);
      setMaxStrength(0);
      setMaxSpeed(0);
     Alert.alert('Metrics cleared');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  const strengthData = allMetrics.map(metric => metric.strength);
  const speedData = allMetrics.map(metric => metric.speed);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#22b8cf" barStyle="light-content"/>
      <Text style={styles.header}>All Performance Records</Text>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Maximum Strength: {maxStrength}</Text>
        <Text style={styles.summaryText}>Maximum Speed: {maxSpeed}</Text>
      </View>
      <Text style={styles.chartTitle}>Strength Metrics</Text>
      <BarChart
        data={{
          labels: strengthData.map((_, index) => `#${index + 1}`),
          datasets: [{data: strengthData}],
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#ff5733',
          backgroundGradientFrom: '#ff8d72',
          backgroundGradientTo: '#ff3f34',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: () => '#fff',
        }}
        style={styles.chart}
      />
      <Text style={styles.chartTitle}>Speed Metrics</Text>
      <BarChart
        data={{
          labels: speedData.map((_, index) => `#${index + 1}`),
          datasets: [{data: speedData}],
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#22b8cf',
          backgroundGradientFrom: '#39c0ed',
          backgroundGradientTo: '#63e6be',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: () => '#fff',
        }}
        style={styles.chart}
      />
      <TouchableOpacity onPress={clearData} style={styles.button}>
        <Text style={styles.buttonText}>Clear All Records</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  summaryContainer: {
    backgroundColor: '#e0f7fa',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00796b',
    textAlign: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
    textAlign: 'center',
    color: '#555',
  },
  chart: {
    marginVertical: 12,
    borderRadius: 8,
    elevation: 2,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AllRecords;
