import { useState, useEffect, useRef } from 'react';

const TYPE_KEY = 'type';
const MESSAGE_KEY = 'bridge';

function useChildWindow({ bridgeKey, // requirement
connectUrl, // requirement
callback, // (data) => void 
 }) {
    // const _window = useRef();
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        const opener = window.opener;
        // _window.current = opener;
        opener.postMessage({ [TYPE_KEY]: bridgeKey }, connectUrl);
        const handler = (e) => {
            if (e.origin === connectUrl) {
                const data = e.data[MESSAGE_KEY];
                callback && callback(data);
                setLogs([
                    ...logs, { date: new Date(), message: data },
                ]);
            }
        };
        window.addEventListener('message', handler);
        return () => {
            window.removeEventListener('message', handler);
        };
    }, []);
    return [logs];
}

function useParentWindow({ bridgeKey, // requirement
connectUrl, // requirement
getData, }) {
    // !getData && console.warn('useParentWindow : getData in params is undefeined');
    // !connectUrl && console.warn('useParentWindow : connectUrl in params is undefeined');
    // bridgeKey = bridgeKey || 'bridgeKey';
    const _window = useRef(null);
    const open = () => {
        _window.current = window.open(connectUrl);
    };
    const close = () => {
        var _a;
        (_a = _window.current) === null || _a === void 0 ? void 0 : _a.close();
    };
    useEffect(() => {
        const handler = (e) => {
            var _a;
            e.origin === connectUrl
                && e.data[TYPE_KEY] === bridgeKey
                && getData && ((_a = _window.current) === null || _a === void 0 ? void 0 : _a.postMessage({ [MESSAGE_KEY]: getData() }, connectUrl));
        };
        window.addEventListener('message', handler);
        return () => {
            window.removeEventListener('message', handler);
        };
    }, []);
    return [open, close];
}

export { useChildWindow, useParentWindow };
//# sourceMappingURL=index.esm.mjs.map
