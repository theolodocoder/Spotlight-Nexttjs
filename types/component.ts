import { AttachmentType } from "./enums";

export interface MenuItem {
  id: number;
  title: string;
  href: string;
  isCenter: boolean;
}

export type TTab = "ALL" | AttachmentType;

export type TVideoDetailProps = {
  hash: string;
  src: string;
  alt: string;
};
