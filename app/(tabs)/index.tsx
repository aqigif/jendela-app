import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { convertMarketCapsToTCandleData } from "@/utils/currency";
import { CandlestickChart, TCandle } from "react-native-wagmi-charts";

const TIME_INTERVALS = {
  "24_hours": "24H",
  "7_days": "1W",
  "30_days": "1M",
};

const HomeScreen = () => {
  const [time, setTime] = useState("24_hours");
  const { data, isLoading, error } = useQuery<CoinGeckoType, Error>(
    ["btc", time],
    async () => {
      const response = await fetch(
        `https://www.coingecko.com/ohlc/36927/series/btc/${time}.json`
      );
      return response.json();
    }
  );
  const [candleData, setCandleData] = useState<TCandle[]>([]);

  useEffect(() => {
    if (data) {
      setCandleData(convertMarketCapsToTCandleData(data?.ohlc));
    }
  }, [data]);

  return (
    <ThemedView style={{ paddingTop: 60, flex: 1 }}>
      <View style={styles.chartContainer}>
        {error ? (
          <View style={styles.centeredContainer}>
            <ThemedText>Terjadi Kesalahan pada koneksi</ThemedText>
          </View>
        ) : isLoading ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <View>
            <ThemedText style={styles.smallText}>Bitcoin Price</ThemedText>
            <View style={styles.priceContainer}>
              <ThemedText style={styles.boldText}>
                Rp 1.106.550.546
              </ThemedText>
              <ThemedText style={styles.percentageText}>
                1.34%
              </ThemedText>
            </View>
            <CandlestickChart.Provider data={candleData}>
              <CandlestickChart height={200}>
                <CandlestickChart.Candles />
              </CandlestickChart>
            </CandlestickChart.Provider>
          </View>
        )}
      </View>
      <View style={styles.timeSelectorContainer}>
        {Object.entries(TIME_INTERVALS).map(([key, label]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.time,
              time === key && styles.timeActive
            ]}
            onPress={() => setTime(key)}
          >
            <ThemedText
              style={[
                styles.timeText,
                time === key && styles.timeActiveText,
              ]}
            >
              {label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
};


const styles = StyleSheet.create({
  chartContainer: {
    paddingHorizontal: 16,
    minHeight: 200,
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  smallText: {
    fontSize: 12,
  },
  priceContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  percentageText: {
    fontSize: 12,
    fontWeight: "bold",
    color: 'green',
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
