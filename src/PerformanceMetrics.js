import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BarChart} from 'react-native-chart-kit';
import {useFocusEffect} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const PerformanceMetrics = ({navigation}) => {
  const [strength, setStrength] = useState('');
  const [speed, setSpeed] = useState('');
  const [metrics, setMetrics] = useState({strength: 0, speed: 0});

  const saveData = async () => {
    if (!strength || !speed) {
      alert('Please fill in all fields.');
      return;
    }

    const newMetric = {strength: parseInt(strength), speed: parseInt(speed)};
    const existingMetrics =
      JSON.parse(await AsyncStorage.getItem('allMetrics')) || [];
    const updatedMetrics = [...existingMetrics, newMetric];

    await AsyncStorage.setItem('allMetrics', JSON.stringify(updatedMetrics));
    setMetrics(newMetric);
    alert('Data Saved!');
    setStrength('');
    setSpeed('');
  };

  const loadData = async () => {
    const savedData =
      JSON.parse(await AsyncStorage.getItem('allMetrics')) || [];
    if (savedData.length > 0) {
      const lastMetric = savedData[savedData.length - 1];
      setMetrics(lastMetric);
    } else {
      setMetrics({strength: 0, speed: 0});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0066cc" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Performance Metrics</Text>
        <BarChart
          data={{
            labels: ['Strength', 'Speed'],
            datasets: [{data: [metrics.strength, metrics.speed]}],
          }}
          width={width - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#003366',
            backgroundGradientFrom: '#004080',
            backgroundGradientTo: '#0066cc',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={styles.chart}
        />
        <Text style={styles.subHeader}>Enter New Metrics</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Strength Metric</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Strength Metric"
            keyboardType="numeric"
            value={strength}
            onChangeText={setStrength}
          />
          <Text style={styles.inputLabel}>Speed Metric</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Speed Metric"
            keyboardType="numeric"
            value={speed}
            onChangeText={setSpeed}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={saveData}
            style={[styles.button, {backgroundColor: '#4caf50'}]}>
            <Text style={styles.buttonText}>Save Metrics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AllRecords')}
            style={[styles.button, {backgroundColor: '#607d8b'}]}>
            <Text style={styles.buttonText}>All Metrics Record</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryHeader}>Last Saved Metrics</Text>
          <Text style={styles.summaryText}>Maximum Strength: {metrics.strength}</Text>
          <Text style={styles.summaryText}>Maximum Speed: {metrics.speed}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066cc',
    textAlign: 'center',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 16,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 16,
  },
  inputContainer: {
    marginVertical: 16,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginVertical: 16,
    backgroundColor: '#e8eaf6',
    padding: 16,
    borderRadius: 8,
  },
  summaryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  summaryText: {
    fontSize: 16,
    color: '#555',
  },
});

export default PerformanceMetrics;
