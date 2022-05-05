interface UseChildWindowParams<T> {
    bridgeKey: string;
    connectUrl: string;
    callback: (data: T) => void;
}
interface Log<T> {
    date: Date;
    message: T;
}
export declare function useChildWindow<T>({ bridgeKey, // requirement
connectUrl, // requirement
callback, }: UseChildWindowParams<T>): Log<T>[][];
export {};
//# sourceMappingURL=useChildWindow.d.ts.map