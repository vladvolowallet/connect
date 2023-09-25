import { StacksProvider, WalletProviders } from "./types";

export function getStacksProvider() {
  return getStoredWalletProvider() || getDefaultProvider();
}

export function getBlockStackProvider() {
  return window.BlockstackProvider;
}

export function getHiroProvider() {
  return window.HiroWalletProvider;
}

export function getAsignaSafeProvider() {
  return window.AsignaSafeProvider;
}

export function getDefaultProvider() {
  return window.StacksProvider;
}

export function isStacksWalletInstalled() {
  return !!(getHiroProvider() || getAsignaSafeProvider() || getBlockStackProvider() || getDefaultProvider());
}

export const walletProviderToEnum = (provider: StacksProvider) => {
  if (provider === getAsignaSafeProvider())
    return WalletProviders.AsignSafe;
  if (provider === getBlockStackProvider())
    return WalletProviders.Blockstack;
  return WalletProviders.Hiro;
}

export const getStoredWalletProvider = () => {
  const provider = Number(localStorage.getItem('wallet_key')||0);
  switch (provider)
  {
    case WalletProviders.Hiro:
      return getHiroProvider();
    case WalletProviders.AsignSafe:
      return getAsignaSafeProvider();
    case WalletProviders.Blockstack:
      return getBlockStackProvider();
    default:
      return getDefaultProvider();
  }
}
