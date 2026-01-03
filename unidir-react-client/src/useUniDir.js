import { useContext } from "react";
import { UniDirContext } from "./context";

// Function 1: The Hook (Move this to src/hooks/useUniDir.js to stop the warning completely)
export const useUniDir = () => {
  const context = useContext(UniDirContext);
  if (!context) {
    throw new Error("useUniDir must be used within a UniDirProvider");
  }
  return context;
};
