import { CoinGecko } from "@/actions";
import { TCandle } from "react-native-wagmi-charts";
import { create } from "zustand";

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

export const useCoinGeckoStore = create<StoreState>((set, get) => ({
  data: {},
  isLoading: false,
  error: null,
  fetchData: async () => {
    const { time } = useCoinGeckoStoreTime.getState();
    useCoinGeckoStoreLoading.setState({ isLoading: true, error: null });
    try {
      const candleData = await CoinGecko.fetchBtcOhlc(time);
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

