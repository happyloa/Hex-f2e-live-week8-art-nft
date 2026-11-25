import { queryText, walletProviders } from "~/data/catalog";

export function useWallet() {
  const route = useRoute();
  const router = useRouter();
  const wallet = useState<string | null>("demo-wallet", () => null);
  const isWalletOpen = computed(() => queryText(route.query.wallet) === "1");

  function openWallet() {
    return router.push({
      query: { ...route.query, wallet: "1" },
      hash: route.hash,
    });
  }

  function closeWallet() {
    return router.replace({
      query: { ...route.query, wallet: undefined },
      hash: route.hash,
    });
  }

  function connectWallet(provider: string | null) {
    wallet.value = provider;
    try {
      if (provider) sessionStorage.setItem("art-nft-demo-wallet", provider);
      else sessionStorage.removeItem("art-nft-demo-wallet");
    } catch {
      // The demo wallet can still be used until the page is reloaded.
    }
  }

  function restoreWallet() {
    try {
      const saved = sessionStorage.getItem("art-nft-demo-wallet");
      if (saved && walletProviders.includes(saved)) wallet.value = saved;
    } catch {
      // Keep the in-memory wallet when the browser blocks storage.
    }
  }

  return {
    wallet,
    isWalletOpen,
    openWallet,
    closeWallet,
    connectWallet,
    restoreWallet,
  };
}
