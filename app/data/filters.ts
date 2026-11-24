import {
  birdColors,
  birdTypes,
  networks,
  queryText,
  statuses,
} from "./catalog";
import type { Artwork } from "./catalog";

export interface Filters {
  network: string[];
  status: string[];
  species: string[];
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
  const parsed = Number(queryText(value));
  return value && Number.isFinite(parsed) && parsed >= 0 ? parsed : "";
}

export function readFilters(query: Record<string, unknown>): Filters {
  return {
    network: choices(query.network, networks),
    status: choices(query.status, statuses),
    species: choices(query.species, birdTypes),
    min: number(query.min),
    max: number(query.max),
    birds: choices(query.birds, ["1", "2", "3", "4"])[0] ?? "",
    flowers: choices(query.flowers, ["yes", "no"])[0] ?? "",
    color: choices(query.color, birdColors)[0] ?? "",
  };
}

export function filterQuery(filters: Filters) {
  return {
    network: filters.network.join(",") || undefined,
    status: filters.status.join(",") || undefined,
    species: filters.species.join(",") || undefined,
    min: filters.min === "" ? undefined : String(filters.min),
    max: filters.max === "" ? undefined : String(filters.max),
    birds: filters.birds || undefined,
    flowers: filters.flowers || undefined,
    color: filters.color || undefined,
  };
}

export function matchesFilters(art: Artwork, filters: Filters) {
  return (
    (!filters.network.length || filters.network.includes(art.network)) &&
    (!filters.status.length || filters.status.includes(art.status)) &&
    (!filters.species.length || filters.species.includes(art.species)) &&
    (filters.min === "" || art.price >= filters.min) &&
    (filters.max === "" || art.price <= filters.max) &&
    (!filters.birds || String(art.birds) === filters.birds) &&
    (!filters.flowers || art.flowers === (filters.flowers === "yes")) &&
    (!filters.color || art.color === filters.color)
  );
}
