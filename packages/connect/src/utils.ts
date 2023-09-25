import { StacksProvider, WalletProviders } from "./types";

export const STACKS_PROVIDER_KEY = 'stacks-provider';

export function getStacksProvider() {
  return getStoredWalletProvider() || getDefaultProvider();
}

export function getBlockStackProvider() {
  return window.BlockstackProvider;
}

export function getLeatherProvider() {
  return window.HiroWalletProvider;
}

export function getAsignaSafeProvider() {
  return window.AsignaSafeProvider;
}

export function getDefaultProvider() {
  return window.StacksProvider;
}

export function isStacksWalletInstalled() {
  return !!(getLeatherProvider() || getAsignaSafeProvider() || getBlockStackProvider() || getDefaultProvider());
}

export const walletProviderToEnum = (provider: StacksProvider) => {
  if (provider === getAsignaSafeProvider())
    return WalletProviders.AsignaSafeProvider;
  if (provider === getBlockStackProvider())
    return WalletProviders.BlockstackProvider;
  return WalletProviders.LeatherWalletProvider;
}

export const getStoredWalletProvider = () => {
  const provider = localStorage.getItem(STACKS_PROVIDER_KEY);
  console.log('HIER', provider);
  switch (provider)
  {
    case WalletProviders.LeatherWalletProvider:
      return getLeatherProvider();
    case WalletProviders.AsignaSafeProvider:
      return getAsignaSafeProvider();
    case WalletProviders.BlockstackProvider:
      return getBlockStackProvider();
    default:
      return getDefaultProvider();
  }
}
