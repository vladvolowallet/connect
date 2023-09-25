import React from "react";
import {AppConfig, showConnect, UserSession, getAsignaSafeProvider, getLeatherProvider } from "@stacks/connect";
const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

function authenticate(provider) {
  showConnect({
    appDetails: {
      name: "Stacks React Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  }, provider);
}

function disconnect() {
  userSession.signUserOut("/");
}

const ConnectWallet = () => {
  if (userSession.isUserSignedIn()) {
    return (
      <div>
        <button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </button>
        <p>mainnet: {userSession.loadUserData().profile.stxAddress.mainnet}</p>
        <p>testnet: {userSession.loadUserData().profile.stxAddress.testnet}</p>
      </div>
    );
  }

  return (
    <>
    <button className="Connect" onClick={() => authenticate(getLeatherProvider())}>
      Connect Ledger
    </button>
    <button className="Connect" onClick={() => authenticate(getAsignaSafeProvider())}>
      Connect Asigna Safe
    </button>
    </>
  );
};

export default ConnectWallet;
