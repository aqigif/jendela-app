import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";

import { convertMarketCapsToTCandleData } from "@/utils/currency";
import { useEffect, useState } from "react";
import { CandlestickChart, TCandle } from "react-native-wagmi-charts";
import { useQuery } from "react-query";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
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
      <View
        style={{
          paddingHorizontal: 16,
          minHeight: 200,
        }}
      >
        {error ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ThemedText>Terjadi Kesalahan pada koneksi</ThemedText>
          </View>
        ) : isLoading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <View>
            <ThemedText style={{fontSize: 12}}>Bitcoin Price</ThemedText>
            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
              <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
                Rp 1.106.550.546
              </ThemedText>
              <ThemedText style={{ fontSize: 12, fontWeight: "bold", color: 'green', marginLeft:10 }}>
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
      <View
        style={{ flexDirection: "row", marginTop: 20, marginHorizontal: 16 }}
      >
        <TouchableOpacity
          style={[styles.time, time === "24_hours" && styles.timeActive]}
          onPress={() => setTime("24_hours")}
        >
          <ThemedText
            style={[
              styles.timeText,
              time === "24_hours" && styles.timeActiveText,
            ]}
          >
            24H
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.time, time === "7_days" && styles.timeActive]}
          onPress={() => setTime("7_days")}
        >
          <ThemedText
            style={[
              styles.timeText,
              time === "7_days" && styles.timeActiveText,
            ]}
          >
            1W
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.time, time === "30_days" && styles.timeActive]}
          onPress={() => setTime("30_days")}
        >
          <ThemedText
            style={[
              styles.timeText,
              time === "30_days" && styles.timeActiveText,
            ]}
          >
            1M
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
