import { useState, useEffect, createContext, useContext } from "react";

const MetaMaskAccountContext = createContext();

export default function MetaMaskAccountProvider({ children }) {
  const [ethereum, setEthereum] = useState(undefined);
  const [connectedAccount, setConnectedAccount] = useState(undefined);

  const setEthereumFromWindow = async () => {
    if (window.ethereum) {
      // Reload if chain changes, see <https://docs.metamask.io/guide/ethereum-provider.html#chainchanged>
      window.ethereum.on("chainChanged", (_chainId) =>
        window.location.reload()
      );
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const sepoliaId = "0xaa36a7"; // See <https://docs.metamask.io/guide/ethereum-provider.html#chain-ids>
      if (chainId === sepoliaId) {
        setEthereum(window.ethereum);
      } else {
        alert("Please use the Sepolia test network");
      }
    }
  };

  useEffect(() => setEthereumFromWindow(), []);

  const handleAccounts = (accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log("We have an authorized account: ", account);
      setConnectedAccount(account);
    } else {
      console.log("No authorized accounts yet");
    }
  };

  const getConnectedAccount = async () => {
    if (ethereum) {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      handleAccounts(accounts);
    }
  };
  useEffect(() => getConnectedAccount());

  const connectAccount = async () => {
    if (!ethereum) {
      console.error("Ethereum object is required to connect an account");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    handleAccounts(accounts);
  };

  const value = { ethereum, connectedAccount, connectAccount };

  return (
    <MetaMaskAccountContext.Provider value={value}>
      {children}
    </MetaMaskAccountContext.Provider>
  );
}

export function useMetaMaskAccount() {
  return useContext(MetaMaskAccountContext);
}
