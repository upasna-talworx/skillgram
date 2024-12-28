import { formatPrice } from "@calcom/lib/price";

import type { EventPrice } from "../../types";

export const Price = ({ price, currency, displayAlternateSymbol = true }: EventPrice) => {
  if (price === 0) return null;

  const formattedPrice = formatPrice(price, currency);

  return currency !== "BTC" ? <>{formattedPrice}</> : <></>;
};
