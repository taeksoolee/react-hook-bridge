interface UseParentWindowParams<T> {
    bridgeKey: string;
    connectUrl: string;
    getData: () => T;
}
export declare function useParentWindow<T>({ bridgeKey, // requirement
connectUrl, // requirement
getData, }: UseParentWindowParams<T>): (() => void)[];
export {};
//# sourceMappingURL=useParentWindow.d.ts.map