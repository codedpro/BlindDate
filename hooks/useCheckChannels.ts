import { useState } from "react";
import { checkJoin } from "@/services/api";

export const useCheckChannels = (appData: string) => {
  const [channels, setChannels] = useState<string[] | null>(null);
  const [checking, setChecking] = useState(false);

  const checkChannels = async () => {
    setChecking(true);
    try {
      const response = await checkJoin(appData);
      if (response.status === false || response.how === "left") {
        setChannels(response.channels);
      }
    } catch (err) {
      console.error("Error checking channels:", err);
    } finally {
      setChecking(false);
    }
  };

  return { channels, checking, checkChannels };
};
