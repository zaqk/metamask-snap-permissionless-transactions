import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { MouseEvent, ReactElement } from 'react';
import styled from 'styled-components';
import { Provider } from '../utils/provider';

const StyledButton = styled.button`
  width: 150px;
  height: 2.2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
  place-self: center;
`;

export function SendPermissionless(): ReactElement {
  const context = useWeb3React<Provider>();
  const { account, active, library } = context;

  function onClick(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    if (!library || !account) {
      window.alert('Wallet not connected');
      return;
    }

    async function send(
      library: Provider
    ): Promise<void> {
      try {

        // create an unsigned tx
        const tx = await library.getSigner().populateTransaction({
          to: '0x0000000000000000000000000000000000000000', // send to zero address
          value: ethers.utils.parseEther("0.1").toHexString(), // send a small amount of eth
        });


        console.log(`unsigned tx === ${JSON.stringify(tx)}`);


        // forward the unsigned tx to metamask snap to be signed
        // then submit signed transaction returned from metamask to RPC.
        library.send(
          'wallet_invokeSnap',
          [
            'local:http://localhost:8080/', 
            { method: 'sign', params: [tx] }
          ]).then(async (signedTx) => {
            // signed tx is returned
            console.log(`signedTx === ${JSON.stringify(signedTx)}`);

            // send the signed tx
            const transactionResp = await library.sendTransaction(signedTx);
            console.log(`success. transaction response === ${JSON.stringify(transactionResp)}`);
          });


      } catch (error: any) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }

    send(library);
  }

  return (
    <StyledButton
      disabled={!active ? true : false}
      style={{
        cursor: !active ? 'not-allowed' : 'pointer',
        borderColor: !active ? 'unset' : 'blue'
      }}
      onClick={onClick}
    >
      Send ETH to zero address
    </StyledButton>
  );
}