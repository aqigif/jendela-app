import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { CandlestickChart } from "react-native-wagmi-charts";
import { StatusBar } from "expo-status-bar";
import { useCoinGeckoStore } from "@/stores";

const TIME_INTERVALS = {
  "24_hours": "24H",
  "7_days": "1W",
  "30_days": "1M",
  "365_days": "1Y",
  max: "ALL",
};

const CandlestickChartComponent = () => {
  const { data, isLoading, error, time } = useCoinGeckoStore((state) => ({
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    time: state.time,
  }));

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <ThemedText>Terjadi Kesalahan pada koneksi</ThemedText>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.chartContainer}>
      {Object.entries(TIME_INTERVALS).map(([key]) => (
        <View
          key={key}
          style={[
            styles.chart,
            { opacity: time === key ? 1 : 0, zIndex: time === key ? 1 : 0 },
          ]}
        >
          <CandlestickChart.Provider data={data[key] || []}>
            <CandlestickChart height={200}>
              <CandlestickChart.Candles />
            </CandlestickChart>
          </CandlestickChart.Provider>
        </View>
      ))}
    </View>
  );
};

const TimeSelector = () => {
  const { time, setTime } = useCoinGeckoStore((state) => ({
    time: state.time,
    setTime: state.setTime,
  }));

  return (
    <View style={styles.timeSelectorContainer}>
      {Object.entries(TIME_INTERVALS).map(([key, label]) => (
        <TouchableOpacity
          key={key}
          style={[styles.time, time === key && styles.timeActive]}
          onPress={() => setTime(key)}
        >
          <ThemedText
            style={[styles.timeText, time === key && styles.timeActiveText]}
          >
            {label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const HomeScreen = () => {
  const { fetchData } = useCoinGeckoStore((state) => ({
    fetchData: state.fetchData,
  }));

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ThemedView style={{ paddingTop: 60, flex: 1 }}>
      <StatusBar style="light" />
      <View style={styles.titleContainer}>
        <ThemedText style={styles.smallText}>Bitcoin Price</ThemedText>
        <View style={styles.priceContainer}>
          <ThemedText style={styles.boldText}>Rp 1.106.550.546</ThemedText>
          <ThemedText style={styles.percentageText}>1.34%</ThemedText>
        </View>
      </View>
      <CandlestickChartComponent />
      <TimeSelector />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 16,
  },
  chartContainer: {
    paddingHorizontal: 16,
    height: 200,
    position: "relative",
  },
  chart: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  smallText: {
    fontSize: 12,
  },
  priceContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  percentageText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "green",
    marginLeft: 10,
  },
  timeSelectorContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 16,
  },
  timeText: {
    fontSize: 12,
  },
  timeActiveText: {
    color: "black",
  },
  time: {
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  timeActive: {
    backgroundColor: "white",
  },
});

export default HomeScreen;
