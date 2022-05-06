import { useEffect, useRef } from 'react';
import { MESSAGE_KEY, TYPE_KEY } from './constaints';

interface UseParentWindowParams<T> {
  bridgeKey: string;
  childUrl: string;
  getData: () => T;
  logging: boolean;
};

/**
 * @description
 * regist parent window
 * 
 * @param props - bridgeKey, childUrl, getData, logging
 * bridgeKey - If child and parent are applied with the same value, 
 *             the return value of getData function is transmitted to the child window
 *             when the child window is opened.
 * childUrl - set child
 * getData - factory function for transmited data
 * loggin - logging enable flag
 * 
 * @return [open, close]
 * open - open child window
 * close - close child window
 */
export function useParentwindow<T>({
  bridgeKey,
  childUrl,
  getData, 
  logging,
}: UseParentWindowParams<T>) {
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