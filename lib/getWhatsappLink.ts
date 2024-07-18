export function getWhatsAppLink(
  phoneNumber: string,
  text: string = ""
): string {
  if (!phoneNumber) {
    return "no-link";
  }
  // Remove any non-digit characters from the phone number
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  // Encode the text for use in a URL
  const encodedText = encodeURIComponent(text);

  // Construct the WhatsApp link with the text
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}
