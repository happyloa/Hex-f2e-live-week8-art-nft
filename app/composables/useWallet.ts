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
    if (provider) sessionStorage.setItem("art-nft-demo-wallet", provider);
    else sessionStorage.removeItem("art-nft-demo-wallet");
  }

  function restoreWallet() {
    const saved = sessionStorage.getItem("art-nft-demo-wallet");
    if (saved && walletProviders.includes(saved)) wallet.value = saved;
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
