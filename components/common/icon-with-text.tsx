import { copyToClipboard } from "@/lib/copyToClipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function IconWithText({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className="flex text-center items-center text-[#555] gap-x-3 cursor-pointer"
          onClick={() => {
            copyToClipboard(text);
          }}
        >
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Click to copy</p>
      </TooltipContent>
    </Tooltip>
  );
}
