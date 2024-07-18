import { Attachment } from "@/types";
import Image from "./image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

type TImageDetailProps = {
  productName: string;
  attachments: Attachment[];
};
const ImageDetail = ({ productName, attachments }: TImageDetailProps) => {
  const attachmentSize = attachments.length;
  if (attachmentSize <= 1) {
    return (
      <Image
        hash={attachments[0].blurHash}
        src={attachments[0].url}
        alt={productName}
      />
    );
  }

  return (
    <Carousel>
      <CarouselContent className="h-full">
        {attachments.map((attachment) => (
          <CarouselItem key={attachment.id} className="h-full">
            <Image
              hash={attachment.blurHash}
              src={attachment.url}
              alt={productName}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-14 bg-white" />
      <CarouselNext className="mr-14 bg-white" />
    </Carousel>
  );
};

export default ImageDetail;
