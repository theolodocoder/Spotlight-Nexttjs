import { Attachment } from "./Attachment";
import { Currency } from "./enums";
import { Store } from "./Store";

/**
 * `Product` represents the model of a product
 *  */
export interface IProduct {
  readonly id: string;
  /**
   * `name` describes the name of the product
   * @example
   * Kate's Chilly Chicken Pies
   *  */
  readonly name: string;
  /**
   * `price` desribe the price of the product
   * @description The `price` can have a fixed numeric format of 2 decimal places
   * @example "1000.00"
   *  */
  readonly price: string;
  /**
   * `currency` describes the currency used based on the location of the store
   * @default NGN
   */
  readonly currency: Currency;
  /**
   * `description` describes the details about the product
   */
  readonly description: string;
  /**
   * `attachments` describes the assets related to a product
   */
  readonly attachments: Attachment[];
  /**
   * `categories` describes the category of the product
   * @description Only a max of three categories are allowed
   * @example
   * ['food-and-snacks']
   */
  readonly categories: string[];
  /**
   * `stocked` describes the quantity of the product currently in stock
   * @example
   * 50
   */
  readonly stocked: number;
  readonly card: string;

  readonly store: Store;
}
