import { useEffect, useState } from "react";

export interface OrderBookData {
  result: {
    channel: string;
    data: {
      data: {
        pair: string;
        ask: AskBidItem[];
        bid: AskBidItem[];
      };
      offset: number;
    };
  };
}
export interface AskBidItem {
  btc_volume: string;
  idr_volume: string;
  price: string;
}

const useOrderBookIndodax = () => {
  const [data, setData] = useState<{
    ask: AskBidItem[];
    bid: AskBidItem[];
  } | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("wss://ws3.indodax.com/ws/");

    newSocket.onopen = () => {
      console.log("Connected to WebSocket server");
      sendRequest(newSocket);
    };

    newSocket.onmessage = (event) => {
      const newData = JSON.parse(event.data) as unknown as OrderBookData;
      setData({
        ask: newData?.result?.data?.data?.ask || [],
        bid: newData?.result?.data?.data?.bid || []
      });
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket closed:", event);
    };

    return () => {
      newSocket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendRequest = (newSocket: WebSocket) => {
    const authRequest = {
      params: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5NDY2MTg0MTV9.UR1lBM6Eqh0yWz-PVirw1uPCxe60FdchR8eNVdsskeo",
      },
      id: 1,
    };

    if (newSocket.readyState === WebSocket.OPEN) {
      newSocket.send(JSON.stringify(authRequest));
      subscribeToOrderBookChannel(newSocket);
    }
  };

  const subscribeToOrderBookChannel = (newSocket: WebSocket) => {
    const subscribeRequest = {
      method: 1,
      params: {
        channel: "market:order-book-btcidr",
      },
      id: 3,
    };

    if (newSocket.readyState === WebSocket.OPEN) {
      newSocket.send(JSON.stringify(subscribeRequest));
    }
  };

  return data;
};

export default useOrderBookIndodax;
