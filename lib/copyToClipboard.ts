import { toast } from "@/components/ui/use-toast";

export function copyToClipboard(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  toast({
    description: `Copied to clipboard`,
  });
}
