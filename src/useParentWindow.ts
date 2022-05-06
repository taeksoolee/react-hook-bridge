import { useEffect, useRef } from 'react';
import { MESSAGE_KEY, TYPE_KEY } from './constaints';

interface UseParentWindowParams<T> {
  bridgeKey: string;
  childUrl: string;
  getData: () => T;
  logging: boolean;
};

export function useParentwindow<T>({
  bridgeKey, // requirement
  childUrl, // requirement
  getData, 
  logging,
}: UseParentWindowParams<T>) {
  // !getData && console.warn('useParentWindow : getData in params is undefeined');
  // !connectUrl && console.warn('useParentWindow : connectUrl in params is undefeined');

  // bridgeKey = bridgeKey || 'bridgeKey';

  const _window = useRef<Window | null>(null);

  const open = () => {
    _window.current = window.open(childUrl);
  }

  const close = () => {
    _window.current?.close();
  }

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      logging && console.log('useParentWindow', e);
      e.origin === childUrl 
        && e.data[TYPE_KEY] === bridgeKey
          && getData && _window.current?.postMessage({[MESSAGE_KEY]: getData()}, childUrl);
    };

    window.addEventListener('message', handler);
    return () => {
      window.removeEventListener('message', handler);
    }
  }, []);

  return [ open, close ];
}