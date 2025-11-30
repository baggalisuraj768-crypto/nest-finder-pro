import { useState, useCallback } from "react";
import { toast } from "sonner";

const MAX_COMPARE = 3;

export function useCompare() {
  const [compareList, setCompareList] = useState<string[]>([]);

  const addToCompare = useCallback((listingId: string) => {
    setCompareList((prev) => {
      if (prev.includes(listingId)) {
        toast.info("Property already in compare list");
        return prev;
      }
      if (prev.length >= MAX_COMPARE) {
        toast.warning(`You can compare up to ${MAX_COMPARE} properties`);
        return prev;
      }
      toast.success("Added to compare");
      return [...prev, listingId];
    });
  }, []);

  const removeFromCompare = useCallback((listingId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== listingId));
    toast.info("Removed from compare");
  }, []);

  const isInCompare = useCallback(
    (listingId: string) => compareList.includes(listingId),
    [compareList]
  );

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare,
    compareCount: compareList.length,
    canAddMore: compareList.length < MAX_COMPARE,
  };
}
