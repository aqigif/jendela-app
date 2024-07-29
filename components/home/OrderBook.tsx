import React from "react";
import { useWindowDimensions, View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ThemedText } from "../ThemedText";
import useOrderBookIndodax from "@/hooks/useIndoDaxWs";
import AskBidItem from "./AskBidItem";

const OrderBook = () => {
  const { width } = useWindowDimensions();
  const fullWidth = width - 16;
  const halfWidth = fullWidth / 2;

  const data = useOrderBookIndodax();
  const bids = Array.from(data?.bid || []);
  const asks = Array.from(data?.ask || []);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.headerText}>Order Book</ThemedText>
      <View style={styles.row}>
        <FlashList
          data={bids}
          estimatedItemSize={10}
          scrollEnabled={false}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <View style={styles.headerSection}>
                <ThemedText style={styles.subHeaderText}>Bids</ThemedText>
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <AskBidItem
              btcVolume={item.btc_volume}
              price={item.price}
              isAsk={false}
            />
          )}
          keyExtractor={(item, index) => index.toString() + item.price}
        />
        <View style={styles.separator} />
        <FlashList
          data={asks}
          estimatedItemSize={10}
          scrollEnabled={false}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <View style={styles.headerSection}>
                <ThemedText style={styles.subHeaderText}>Asks</ThemedText>
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <AskBidItem
              btcVolume={item.btc_volume}
              price={item.price}
              isAsk={true}
            />
          )}
          keyExtractor={(item, index) => index.toString() + item.price}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    maxHeight: 400
  },
  headerText: {
    fontSize: 12,
  },
  headerContainer: {
    flexDirection: "row",
  },
  headerSection: {
    flex: 1,
  },
  subHeaderText: {
    fontSize: 10,
  },
  spacing: {
    width: 20,
  },
  row: {
    flexDirection: "row",
  },
  separator: {
    width: 10,
  },
});

export default OrderBook;
