import { convertMarketCapsToTCandleData } from "@/utils/currency";
import { TCandle } from "react-native-wagmi-charts";
import { create } from "zustand";

export const TIME_INTERVALS = {
  "24_hours": "24H",
  "7_days": "1W",
  "30_days": "1M",
  "365_days": "1Y",
  max: "ALL",
};

type StoreState = {
  data: { [key: string]: TCandle[] };
  fetchData: () => void;
};

type StoreTimeState = {
  time: string;
  setTime: (time: string) => void;
};

type StoreLoadingState = {
  isLoading: boolean;
  error: string | null;
};

const fetchCandleData = async (time: string): Promise<TCandle[]> => {
  const response = await fetch(
    `https://www.coingecko.com/ohlc/1/series/usd/${time}.json`
  );
  const data = await response.json();
  return convertMarketCapsToTCandleData(data?.ohlc);
};

export const useCoinGeckoStore = create<StoreState>((set, get) => ({
  data: {},
  isLoading: false,
  error: null,
  fetchData: async () => {
    const { time } = useCoinGeckoStoreTime.getState();
    useCoinGeckoStoreLoading.setState({ isLoading: true, error: null });
    try {
      const candleData = await fetchCandleData(time);
      set((state) => ({
        data: { ...state.data, [time]: candleData },
      }));
      useCoinGeckoStoreLoading.setState({ isLoading: false });
    } catch (error) {
      useCoinGeckoStoreLoading.setState({
        error: (error as Error).message,
        isLoading: false,
      });
    }
  },
}));

export const useCoinGeckoStoreTime = create<StoreTimeState>((set) => ({
  time: "24_hours",
  setTime: (time: string) => {
    set({ time });
    if (!useCoinGeckoStore.getState().data[time]) {
      useCoinGeckoStore.getState().fetchData();
    }
  },
}));

export const useCoinGeckoStoreLoading = create<StoreLoadingState>(() => ({
  isLoading: false,
  error: null,
}));

export default useCoinGeckoStore;
