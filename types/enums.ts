/* `ProductAssetType` represents the types of the assets uploaded for a product
 */

export enum AttachmentType {
  /**
   * The Video asset type
   */
  VIDEO = "Video",
  /**
   * The Picture asset type
   */
  PICTURE = "Picture",
}

export enum Tabs {
  ALL = "ALL",
  VIDEO = AttachmentType.VIDEO,
  PICTURE = AttachmentType.PICTURE,
}

/**
    // toas
 * `Currency` describes the represenctation of the currency of the product
 *  */
export enum Currency {
  /**
  United States of America Dollar
  *  */
  USD = "USD",
  /**
   *  European Union Euro
   */
  EUR = "EUR",
  /**
   *   Great Britain Pounds
   */
  GBP = "GBP",
  /**
   * Japanese Yen
   */
  JPY = "JPY",
  /**
   * South African Rand
   */
  ZAR = "ZAR",
  /**
   * Nigeria Naira
   */
  NGN = "NGN",
  /**
   * Egyptian Pound
   */
  EGP = "EGP",
  /**
   * kenyan Shilling
   */
  KES = "KES",
  /**
   * Moroccan Dirham
   */
  MAD = "MAD",
  /**
   * Tunisian Dollar
   */
  TND = "TND",
  /**
   * Central African CFA Franc
   */
  XAF = "XAF",
  /**
   * West African CFA Franc
   */
  XOF = "XOF",
  /**
   * Canadian Dollar
   */
  CAD = "CAD",
}

/**
 * `CurrencyToSymbolMapping` represent the symbol of the currency to be used on the platform
 *  */
export enum CurrencyToSymbolMapping {
  /**
  United States of America Dollar
  *  */
  USD = "$",
  /**
   *  European Union Euro
   */
  EUR = "€",
  /**
   *   Great Britain Pounds
   */
  GBP = "£",
  /**
   * Japanese Yen
   */
  JPY = "¥",
  /**
   * South African Rand
   */
  ZAR = "R",
  /**
   * Nigeria Naira
   */
  NGN = "₦",
  /**
   * Egyptian Pound
   */
  EGP = "E£",
  /**
   * Moroccan Dirham
   */
  KES = "KSh",
  /**
   * Moroccan Dirham
   */
  MAD = "DH",
  /**
   * Tunisian Dollar
   */
  TND = "DT",
  /**
   * Central African CFA Franc
   */
  XAF = "FCFA",
  /**
   * West African CFA Franc
   */
  XOF = "CFA",
  /**
   * Canadian Dollar
   */
  CAD = "C$",
}

export enum TEvent {
  VIEWED = "product.viewed",
  SHARED = "product.shared",
}
