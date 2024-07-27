import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useCoinGeckoStore } from "@/stores";
import { TIME_INTERVALS } from "@/stores/gecko";

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

const styles = StyleSheet.create({
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

export default TimeSelector;
