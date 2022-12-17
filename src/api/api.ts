import axios from "axios";

const URL = "https://api.coinpaprika.com/v1";

export const ConinInfoAPI = async (coinId: string) => {
  try {
    return (await axios.get(`${URL}/coins/${coinId}`)).data;
  } catch (error) {
    return console.error(error);
  }
};

export const ConinPriceAPI = async (coinId: string) => {
  try {
    return (await axios.get(`${URL}/tickers/${coinId}`)).data;
  } catch (error) {
    return console.error(error);
  }
};

export const ConinHistory = async (coinId: string) => {
  try {
    return (
      await axios.get(
        `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
      )
    ).data;
  } catch (error) {
    return console.error(error);
  }
};
