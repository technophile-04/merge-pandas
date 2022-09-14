/* eslint-disable react/jsx-pascal-case */
import { Button, Card, List, Skeleton, Space } from "antd";
import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Address, AddressInput } from "../components";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home2({
  userSigner,
  readContracts,
  writeContracts,
  tx,
  loadWeb3Modal,
  blockExplorer,
  mainnetProvider,
  contractName,
  address,
}) {
  console.log("readContracts", readContracts);
  console.log("writeContracts", writeContracts);
  console.log("Address in home", address);
  const balanceContract = useContractReader(readContracts, contractName, "balanceOf", [address]);
  const price = ethers.utils.parseEther("0.00042");

  const [balance, setBalance] = useState();

  useEffect(() => {
    if (balanceContract) {
      console.log("Balance", balanceContract);
      setBalance(balanceContract);
    }
  }, [balanceContract]);

  console.log("Home2: " + address + ", Balance: " + balance);

  return (
    <div>
      <div style={{ maxWidth: 820, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
        {userSigner ? (
          <Button
            size="large"
            type={"primary"}
            onClick={() => {
              tx(writeContracts["mint()"]({ value: price }));
            }}
          >
            MINT
          </Button>
        ) : (
          <Button type={"primary"} onClick={loadWeb3Modal}>
            CONNECT WALLET
          </Button>
        )}
      </div>

      {userSigner && (
        <div style={{ width: 820, margin: "auto", paddingBottom: 256 }}>
          <p style={{ fontSize: "2rem", margin: "0" }}>Your Total Balance</p>
          <p style={{ fontSize: "2rem", marginTop: "1rem" }}>{balance?.toString()}</p>
        </div>
      )}
    </div>
  );
}

export default Home2;
