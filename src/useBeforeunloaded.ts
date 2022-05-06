import { useEffect } from "react";

interface UseBeforeunloadedParams {
  handler: () => void;
}

/**
 * @description
 * regist beforeunload(before clsoe windows event)
 * 
 * @param props - handler
 * 
 * @return null
 */
export function useBeforeunloaded({
  handler
}: UseBeforeunloadedParams) {
  useEffect(() => {
    window.addEventListener('beforeunload', handler);
  }, []);
}