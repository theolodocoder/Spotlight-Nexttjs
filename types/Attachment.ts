import { AttachmentType } from "./enums";

export interface Attachment {
  id: string;
  /**
   * `url` describes the url of the store logo
   * @description The url of the image and/or video on AWS S3
   *  */
  readonly url: string;
  /**
   * `picture_url` describes picture generated for a video asset
   */
  readonly pictureUrl?: string;
  /**
   * `type` describes the type of attachment uploaded or created
   */
  readonly type: AttachmentType;

  /**
   * 'hash':blurhash
   */
  readonly blurHash: string;
}

/**
 * `AttachmentSignaturePayload` represent the JWT Payload used for sending attachments
 * The expiry time of the token generated should be 5 minutes (300 seconds)
 */
export type AttachmentSignaturePayload = {
  issuer: string; // Defaults to: "Beetle Ltd"
};
