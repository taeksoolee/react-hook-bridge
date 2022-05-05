import { useEffect, useState } from 'react';
import { MESSAGE_KEY, TYPE_KEY } from './constaints';

interface UseChildWindowParams<T> {
  bridgeKey: string;
  connectUrl: string;
  callback: (data: T) => void;
}

interface Log<T> {
  date : Date;
  message: T;
}

export function useChildWindow<T>({
  bridgeKey, // requirement
  connectUrl, // requirement
  callback, // (data) => void 
}: UseChildWindowParams<T>) {
  // const _window = useRef();
  const [logs, setLogs] = useState<Log<T>[]>([]);

  useEffect(() => {
    const opener = window.opener;
    // _window.current = opener;
    opener?.postMessage({[TYPE_KEY]: bridgeKey}, connectUrl);

    const handler = (e: MessageEvent) => {
      if(e.origin === connectUrl) {
        const data = e.data[MESSAGE_KEY];
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