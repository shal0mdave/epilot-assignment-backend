import axios from "axios";

export class GeckoHelper {
  async getPrices(
    cryptoCurrency: string,
    targetCurrency: string
  ): Promise<void> {
    try {
      const secretKey = process.env.COINGECKO_SECRET;
      if (!secretKey) {
        throw new Error("COINGECKO_SECRET is not defined in the .env file");
      }

      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCurrency}&vs_currencies=${targetCurrency}`,
        {
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
        }
      );

      const price = response.data[cryptoCurrency][targetCurrency];
      return price;
    } catch (error: any) {
      console.error("Error fetching the price:", error.message);
    }
  }
}
