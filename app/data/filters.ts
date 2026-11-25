import {
  birdColors,
  birdTypes,
  networks,
  queryText,
  statuses,
} from "./catalog";
import type { Artwork } from "./catalog";

// Catalog prices are in ETH. The BNB conversion is only for the demo.
export const priceCurrencies = ["ETH", "BNB"] as const;
export type PriceCurrency = (typeof priceCurrencies)[number];
export const demoBnbPerEth = 4;

export function priceInCurrency(price: number, currency: PriceCurrency) {
  return currency === "BNB" ? price * demoBnbPerEth : price;
}

export interface Filters {
  network: string[];
  status: string[];
  species: string[];
  currency: PriceCurrency;
  min: number | "";
  max: number | "";
  birds: string;
  flowers: string;
  color: string;
}

function choices(value: unknown, options: readonly string[]) {
  return queryText(value)
    .split(",")
    .filter((item) => options.includes(item));
}

function number(value: unknown) {
  const text = queryText(value).trim();
  const parsed = Number(text);
  return text && Number.isFinite(parsed) && parsed >= 0 ? parsed : "";
}

export function readFilters(
  query: Record<string, unknown>,
  showBirdTraits = true,
): Filters {
  return {
    network: choices(query.network, networks),
    status: choices(query.status, statuses),
    species: showBirdTraits ? choices(query.species, birdTypes) : [],
    currency: queryText(query.currency) === "BNB" ? "BNB" : "ETH",
    min: number(query.min),
    max: number(query.max),
    birds: showBirdTraits
      ? (choices(query.birds, ["1", "2", "3", "4"])[0] ?? "")
      : "",
    flowers: showBirdTraits
      ? (choices(query.flowers, ["yes", "no"])[0] ?? "")
      : "",
    color: showBirdTraits ? (choices(query.color, birdColors)[0] ?? "") : "",
  };
}

export function filterQuery(filters: Filters) {
  return {
    network: filters.network.join(",") || undefined,
    status: filters.status.join(",") || undefined,
    species: filters.species.join(",") || undefined,
    currency: filters.currency === "ETH" ? undefined : filters.currency,
    min: filters.min === "" ? undefined : String(filters.min),
    max: filters.max === "" ? undefined : String(filters.max),
    birds: filters.birds || undefined,
    flowers: filters.flowers || undefined,
    color: filters.color || undefined,
  };
}

export function matchesFilters(art: Artwork, filters: Filters) {
  const price = priceInCurrency(art.price, filters.currency);
  return (
    (!filters.network.length || filters.network.includes(art.network)) &&
    (!filters.status.length || filters.status.includes(art.status)) &&
    (!filters.species.length || filters.species.includes(art.species)) &&
    (filters.min === "" || price >= filters.min) &&
    (filters.max === "" || price <= filters.max) &&
    (!filters.birds || String(art.birds) === filters.birds) &&
    (!filters.flowers || art.flowers === (filters.flowers === "yes")) &&
    (!filters.color || art.color === filters.color)
  );
}
