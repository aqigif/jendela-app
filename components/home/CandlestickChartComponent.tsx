import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useCoinGeckoStore } from "@/stores";
import { TIME_INTERVALS, useCoinGeckoStoreLoading } from "@/stores/gecko";
import { CandlestickChart } from "react-native-wagmi-charts";

const CandlestickChartComponent = () => {
  const { isLoading, error } = useCoinGeckoStoreLoading((state) => ({
    isLoading: state.isLoading,
    error: state.error,
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
        <CandlestickChartComponentAtom key={key} index={key} />
      ))}
    </View>
  );
};

const CandlestickChartComponentAtom = ({ index }: { index: string }) => {
  const { data, time } = useCoinGeckoStore((state) => ({
    data: state.data,
    time: state.time,
  }));
  return (
    <View
      style={[
        styles.chart,
        { opacity: time === index ? 1 : 0, zIndex: time === index ? 1 : 0 },
      ]}
    >
      <CandlestickChart.Provider data={data[index] || []}>
        <CandlestickChart height={200}>
          <CandlestickChart.Candles />
        </CandlestickChart>
      </CandlestickChart.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default CandlestickChartComponent;
