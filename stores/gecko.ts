import { convertMarketCapsToTCandleData } from '@/utils/currency';
import { TCandle } from 'react-native-wagmi-charts';
import { create } from 'zustand';

type StoreState = {
  data: { [key: string]: TCandle[] };
  isLoading: boolean;
  error: string | null;
  time: string;
  setTime: (time: string) => void;
  fetchData: () => void;
};

const fetchCandleData = async (time: string): Promise<TCandle[]> => {
  const response = await fetch(
    `https://www.coingecko.com/ohlc/1/series/usd/${time}.json`
  );
  const data = await response.json();
  return convertMarketCapsToTCandleData(data?.ohlc);
};

const useCoinGeckoStore = create<StoreState>((set, get) => ({
  data: {},
  isLoading: false,
  error: null,
  time: '24_hours',
  setTime: (time: string) => {
    set({ time });
    if (!get().data[time]) {
      get().fetchData();
    }
  },
  fetchData: async () => {
    const { time } = get();
    set({ isLoading: true, error: null });
    try {
      const candleData = await fetchCandleData(time);
      set((state) => ({
        data: { ...state.data, [time]: candleData },
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));

export default useCoinGeckoStore;
