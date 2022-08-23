import { Tonic } from '@tonic-foundation/tonic';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { TONIC_CONTRACT_ID } from '~/config';
import { nobody } from '~/services/near';
import { useWalletSelector } from './WalletSelectorContainer';

export const UNAUTHENTICATED_TONIC = new Tonic(nobody, TONIC_CONTRACT_ID);

function useTonicInternal() {
  const [tonic, setTonic] = useState(UNAUTHENTICATED_TONIC);
  const { activeAccount } = useWalletSelector();

  useEffect(() => {
    console.log(
      `Initializing Tonic contract (wallet account: ${activeAccount?.accountId})`
    );
    if (activeAccount) {
      setTonic(new Tonic(activeAccount, TONIC_CONTRACT_ID));
    } else {
      setTonic(UNAUTHENTICATED_TONIC);
    }
  }, [activeAccount, setTonic]);

  return {
    tonic,
  };
}

export const TonicClientContainer = createContainer(useTonicInternal);

export function useTonic() {
  return TonicClientContainer.useContainer();
}