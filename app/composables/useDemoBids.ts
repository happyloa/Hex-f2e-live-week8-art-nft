interface DemoBid {
  id: string;
  price: number;
  placedAt: number;
}

function readBid(id: string, value: string | null): DemoBid | undefined {
  if (value === null) return;
  try {
    const bid: Partial<DemoBid> | null = JSON.parse(value);
    if (
      typeof bid?.price === "number" &&
      Number.isFinite(bid.price) &&
      bid.price > 0 &&
      typeof bid.placedAt === "number" &&
      Number.isSafeInteger(bid.placedAt) &&
      bid.placedAt > 0 &&
      bid.placedAt <= 8.64e15
    ) {
      return { id, price: bid.price, placedAt: bid.placedAt };
    }
  } catch {
    // A damaged record does not affect the other bids.
  }
}

export function useDemoBids(artworkId: string) {
  const prefix = `art-nft-demo-bid:${artworkId}:`;
  const stored = ref<DemoBid[]>([]);
  const temporary = useState<DemoBid[]>(
    `temporary-bids-${artworkId}`,
    () => [],
  );
  const bids = computed(() =>
    [...stored.value, ...temporary.value].sort(
      (a, b) => b.placedAt - a.placedAt || b.id.localeCompare(a.id),
    ),
  );

  function restore() {
    try {
      const storage = window.localStorage;
      const restored: DemoBid[] = [];
      for (let index = 0; index < storage.length; index += 1) {
        const key = storage.key(index);
        if (!key?.startsWith(prefix)) continue;
        const bid = readBid(key.slice(prefix.length), storage.getItem(key));
        if (bid) restored.push(bid);
      }
      stored.value = restored;
    } catch {
      // Keep already loaded bids visible if storage becomes unavailable.
    }
  }

  function sync(event: StorageEvent) {
    if (event.key === null || event.key.startsWith(prefix)) restore();
  }

  onMounted(() => {
    window.addEventListener("storage", sync);
    restore();
  });
  onBeforeUnmount(() => window.removeEventListener("storage", sync));

  function addBid(price: number) {
    const id = crypto.getRandomValues(new Uint32Array(4)).join("-");
    const bid = { id, price, placedAt: Date.now() };
    try {
      // Each bid has its own key so tabs can add bids without overwriting one another.
      window.localStorage.setItem(prefix + id, JSON.stringify(bid));
      stored.value = [bid, ...stored.value];
      return true;
    } catch {
      temporary.value = [bid, ...temporary.value];
      return false;
    }
  }

  return { bids, addBid };
}
