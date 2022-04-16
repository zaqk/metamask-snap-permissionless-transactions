import { useWeb3React } from '@web3-react/core';
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

export function Approve(): ReactElement {
  const context = useWeb3React<Provider>();
  const { account, active, library } = context;

  function onClick(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    if (!library || !account) {
      window.alert('Wallet not connected');
      return;
    }

    async function approve(
      library: Provider,
    ): Promise<void> {
      
      // approve the meta mask snap. this could be handled during install.
      try {

        library.send('wallet_enable', [{
          eth_accounts: {},
          wallet_snap: {
            'local:http://localhost:8080/': {}
          }
        }]).then((result) => {
          console.log(result);
        });

        library.send('wallet_getSnaps', []).then( result =>
          console.log(result)
        );
      } catch (error: any) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }

    approve(library);
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
      Approve wallet
    </StyledButton>
  );
}