import { useEffect, useRef } from 'react';
import { MESSAGE_KEY, TYPE_KEY } from './constaints';

interface UseParentWindowParams<T> {
  bridgeKey: string;
  connectUrl: string;
  getData: () => T;
};

export function useParentWindow<T>({
  bridgeKey, // requirement
  connectUrl, // requirement
  getData, 
}: UseParentWindowParams<T>) {
  // !getData && console.warn('useParentWindow : getData in params is undefeined');
  // !connectUrl && console.warn('useParentWindow : connectUrl in params is undefeined');

  // bridgeKey = bridgeKey || 'bridgeKey';

  const _window = useRef<Window | null>(null);

  const open = () => {
    _window.current = window.open(connectUrl);
  }

  const close = () => {
    _window.current?.close();
  }

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      e.origin === connectUrl 
        && e.data[TYPE_KEY] === bridgeKey
          && getData && _window.current?.postMessage({[MESSAGE_KEY]: getData()}, connectUrl);
    };

    window.addEventListener('message', handler);
    return () => {
      window.removeEventListener('message', handler);
    }
  }, []);

  return [ open, close ];
}