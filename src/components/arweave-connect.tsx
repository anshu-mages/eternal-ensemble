import { Button, Chip } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { getBalance } from "arweavekit/wallet";
import { BsGithub } from "react-icons/bs";

const ArweaveConnectButton: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    // Immediately check if ArConnect is available and if already connected
    if (window.arweaveWallet) {
      window.arweaveWallet
        .getActiveAddress()
        .then((address) => setWalletAddress(address))
        .catch(() => {
          // Not connected or ArConnect not installed
          setWalletAddress(null);
        });

    }else{
      alert("ArConnect not installed");
    }
  }, []);

  useEffect(() => {
    if (walletAddress) {
      getBalance({
        address: walletAddress,
        environment: "mainnet",
      }).then((balance) => {
        setBalance(balance);
      });
    }
  }, [walletAddress]);

  const connectWallet = async () => {
    try {
      await window.arweaveWallet.connect([
        "ACCESS_ADDRESS",
        "SIGN_TRANSACTION",
      ]);
      const address = await window.arweaveWallet.getActiveAddress();
      setWalletAddress(address);
    } catch (error) {
      console.error("Could not connect to ArConnect", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await window.arweaveWallet.disconnect();
      setWalletAddress(null);
    } catch (error) {
      console.error("Could not disconnect from ArConnect", error);
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <Button color="default"  variant="light" className="px-0 py-0 -mr-4" onClick={() => {
        // open github repo in new tab
        window.open("https://github.com/symaticvisuals/eternal-ensemble" , "_blank");
      }
    }>
      <BsGithub className="text-2xl" />
      </Button>
      {walletAddress ? (
        <Button color="default" onClick={disconnectWallet}>
          {" "}
          {walletAddress}
          <Chip color="primary">{+balance / Math.pow(10, 12)} AR</Chip>
        </Button>
      ) : (
        <Button color="default" onClick={connectWallet}>
          Connect to ArConnect
        </Button>
      )}
    </div>
  );
};

export default ArweaveConnectButton;
