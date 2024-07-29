import React, { useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useCoinGeckoStore, useCoinGeckoStoreLoading, useCoinGeckoStoreTime } from "@/stores";
import { CandlestickChart as WagmiCandlestickChart } from "react-native-wagmi-charts";
import { TIME_INTERVALS } from "@/constants/times";

const CandlestickChart = () => {
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
        <CandlestickChartAtom key={key} index={key} />
      ))}
    </View>
  );
};

const CandlestickChartAtom = ({ index }: { index: string }) => {
  const { time } = useCoinGeckoStoreTime((state) => ({
    time: state.time,
  }));
  return (
    <View
      style={[
        styles.chart,
        { opacity: time === index ? 1 : 0, zIndex: time === index ? 1 : 0 },
      ]}
    >
      <CandlestickChartSuperAtom index={index} />
    </View>
  );
};

const CandlestickChartSuperAtom = React.memo(
  ({ index }: { index: string }) => {
    const { data } = useCoinGeckoStore((state) => ({
      data: state.data,
    }));

    const dataChart = useMemo(() => data[index] || [], [data, index]);
    return (
      <WagmiCandlestickChart.Provider data={dataChart}>
        <WagmiCandlestickChart height={200}>
          <WagmiCandlestickChart.Candles />
        </WagmiCandlestickChart>
      </WagmiCandlestickChart.Provider>
    );
  }
);

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

export default CandlestickChart;
