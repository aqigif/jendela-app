import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { formatCurrency } from "@/constants/currency";

interface AskBidItemProps {
  btcVolume: string;
  price: string;
  isAsk: boolean;
}

const AskBidItem: React.FC<AskBidItemProps> = ({ btcVolume, price, isAsk }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isAsk ? (
          <>
            <ThemedText style={[styles.priceText, styles.askPrice]}>{formatCurrency(Number(price), "BTC")}</ThemedText>
            <ThemedText style={styles.btcVolumeText}>{btcVolume}</ThemedText>
          </>
        ) : (
          <>
            <ThemedText style={styles.btcVolumeText}>{btcVolume}</ThemedText>
            <ThemedText style={[styles.priceText, styles.bidPrice]}>{formatCurrency(Number(price), "BTC")}</ThemedText>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  background: {
    position: "absolute",
    justifyContent: "center",
    top: 0,
    bottom: 0,
    zIndex: -1,
    height: "100%",
  },
  content: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
  },
  btcVolumeText: {
    fontSize: 10,
    margin: 0,
  },
  priceText: {
    fontSize: 10,
    margin: 0,
  },
  bidPrice: {
    color: "rgb(0, 197, 130)",
  },
  askPrice: {
    color: "rgb(255, 3, 114)",
  },
});

export default AskBidItem;
