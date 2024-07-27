import { TCandle } from "react-native-wagmi-charts";

export const convertMarketCapsToTCandleData = (
  ohlc: [number, number, number, number, number][]
) => {
  return ohlc.map(([timestamp, open, high, low, close]) => {
    return {
        timestamp,
        open: open,
        high: high,
        low: low,
        close: close,
    } as unknown as TCandle;
  });
};
