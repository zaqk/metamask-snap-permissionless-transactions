import { ReactElement } from 'react';
import styled from 'styled-components';
import { ActivateDeactivate } from './components/ActivateDeactivate';
import { SectionDivider } from './components/SectionDivider';
import { SendPermissionless } from './components/SendPermissionless';
import { Approve } from './components/Approve';
import { WalletStatus } from './components/WalletStatus';

const StyledAppDiv = styled.div`
  display: grid;
  grid-gap: 20px;
`;

export function App(): ReactElement {
  return (
    <StyledAppDiv>
      <ActivateDeactivate />
      <SectionDivider />
      <WalletStatus />
      <SectionDivider />
      <Approve />
      <SectionDivider />
      <SendPermissionless />
      <SectionDivider />
      <SectionDivider />
    </StyledAppDiv>
  );
}
