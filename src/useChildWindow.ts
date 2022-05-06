import { useEffect, useState } from 'react';
import { MESSAGE_KEY, TYPE_KEY } from './constaints';

interface UseChildWindowParams<T> {
  bridgeKey: string;
  parentUrl: string;
  callback: (data: T) => void;
  logging: boolean,
}

interface Log<T> {
  date : Date;
  message: T;
}

/**
 * @description
 * regist child window
 * 
 * @param props - bridgeKey, childUrl, getData, logging
 * bridgeKey - If child and parent are applied with the same value, 
 *             callback is called when a value is received
 * childUrl - set parent
 * callback - callback with the received value as param
 * loggin - logging enable flag
 * 
 * @return [open, close]
 * open - open child window
 * close - close child window
 */
export function useChildwindow<T>({
  bridgeKey,
  parentUrl,
  callback,
  logging,
}: UseChildWindowParams<T>) {
  const [logs, setLogs] = useState<Log<T>[]>([]);

  useEffect(() => {
    const opener = window.opener;
    opener?.postMessage({[TYPE_KEY]: bridgeKey}, parentUrl);

    const handler = (e: MessageEvent) => {
      logging && console.log('useChildWindow', e);
      if(e.origin === parentUrl && e.data) {
        const data = e.data[MESSAGE_KEY];
        if(!data) return;
        callback && callback(data);

        setLogs([
          ...logs, {date: new Date(), message: data},
        ]);
      }
    };

    window.addEventListener('message', handler);
    return () => {
      window.removeEventListener('message', handler);
    }
  }, []);

  return [ logs ];
}