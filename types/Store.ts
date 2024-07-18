import { IProduct } from "./Products";

/**
 * `Store` represents the model of a store
 *  */
export interface Store {
  /**
   * `name` describbes the name of a store
   * @example
   * kate confectionaries
   */
  readonly name: string;
  /**
   * `email` describes the email of the store
   *
   * @example
   * kateconfectionaries@gmail.com
   */
  readonly email: string;
  /**
   * `phoneNumber` describes the phone number used to contact the store
   * @description The phone number must be valid with its internatinal dialing code format
   * @example
   * +2348167554639
   */
  readonly phoneNumber?: string;
  /**
   * `bio` describes the description of the store
   * @example
   * kate confectionaries is your all-in-one stop for quality made confectionaries
   */
  readonly bio: string;
  /**
   * `logo` describes the url of the store logo
   * @description The url of the image and/or video on AWS S3
   *  */
  readonly logo: string;
  /**
   * `products` describes the products of the store
   * @description It is optionally included on read, update and delete operation for a store
   */
  readonly username: string;
  readonly products: IProduct[];
  /**
   * `link` describes the unique link generated for store
   * @description
   * It is optionally include on read operation.
   * It is not generated automatically but on request from the store owner.
   * This behaviour might change in the future.
   */

  readonly link?: string;
  readonly categories: string[];
}
