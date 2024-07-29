import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StatusBar } from "expo-status-bar";
import { useCoinGeckoStore } from "@/stores";
import CandlestickChart from "@/components/home/CandlestickChart";
import TimeSelector from "@/components/home/TimeSelector";
import OrderBook from "@/components/home/OrderBook";

const HomeScreen = () => {
  useEffect(() => {
    useCoinGeckoStore.getState().fetchData();
  }, []);

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
      <View style={styles.chartContent}>
        <CandlestickChart />
        <TimeSelector />
      </View>
      <OrderBook />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 16,
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
  chartContent: {
    marginBottom: 16
  }
});

export default HomeScreen;
