import { useEffect } from "react";

interface UseBeforeunloadedParams {
  handler: () => void;
}

export function useBeforeunloaded({
  handler
}: UseBeforeunloadedParams) {
  useEffect(() => {
    window.addEventListener('beforeunload', handler);
  }, []);
}