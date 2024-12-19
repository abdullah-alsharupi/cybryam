export const formatPhoneNumber = (value: any) => {
  const cleaned = ("" + value).replace(/\D/g, "");

  if (cleaned.startsWith("967")) {
    return cleaned.replace(/(\+967)(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
  } else if (cleaned.startsWith("0")) {
    const withoutLeadingZero = cleaned.substring(1);
    return `+967 ${withoutLeadingZero.replace(
      /(\d{3})(\d{3})(\d{3})/,
      "$1 $2 $3"
    )}`;
  } else {
    return `+967 ${cleaned.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}`;
  }
};
