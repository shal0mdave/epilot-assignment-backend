import { Request, Response } from "express";
import { Prediction } from "@models";
import { GeckoHelper } from "@helpers";

export class PredictionController {
  static async getCurrentPrice(req: Request, res: Response) {
    try {
      const { cryptoCurrency, targetCurrency }: any = req.query;

      const geckoHelper = new GeckoHelper();
      const price = await geckoHelper.getPrices(cryptoCurrency, targetCurrency);

      return res.status(200).json({
        data: price,
        message: "Current price.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    }
  }

  static async addPrediction(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const { cryptoCurrency, targetCurrency, prediction, oldValue } = req.body;

      const geckoHelper = new GeckoHelper();
      const newValue = await geckoHelper.getPrices(
        cryptoCurrency,
        targetCurrency
      );

      const newPrediction = new Prediction({
        user: userId,
        prediction,
        oldValue,
        newValue,
      });
      await newPrediction.save();

      return res.status(200).json({
        data: newPrediction,
        message: "Prediction saved.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    }
  }

  static async getUserPredictions(req: Request, res: Response, err: any) {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const predictions = await Prediction.find({ user: userId });

      res.status(200).json({
        data: predictions,
        message: "User predictions",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    }
  }
}
