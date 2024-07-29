import { COIN_GECKO_API } from "@/constants/env";
import { convertMarketCapsToTCandleData } from "@/utils/currency";
import { TCandle } from "react-native-wagmi-charts";

class CoinGecko {
  public fetchBtcOhlc = async (time: string): Promise<TCandle[]> => {
    const response = await fetch(
      `${COIN_GECKO_API}/ohlc/1/series/usd/${time}.json`
    );
    const data = await response.json();
    return convertMarketCapsToTCandleData(data?.ohlc);
  };
}

const coinGeckoAction = new CoinGecko();
export default coinGeckoAction;