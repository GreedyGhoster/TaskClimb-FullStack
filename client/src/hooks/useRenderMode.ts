import constate from "constate";
import { useCallback, useMemo, useState } from "react";
import { RenderMode } from "../types";

interface UseRenderModeProps {
  defaultMode: RenderMode;
}

function useRenderModeFunc(props: UseRenderModeProps) {
  const [renderMode, setRenderMode] = useState(
    props.defaultMode ?? RenderMode.View
  );

  const handleChangeRenderMode = useCallback((newRenderMode: RenderMode) => {
    setRenderMode(newRenderMode);
  }, []);

  return useMemo(
    () => ({
      handleChangeRenderMode,
      renderMode,
    }),
    [renderMode, handleChangeRenderMode]
  );
}

const constateResult = constate(useRenderModeFunc);
export const UseRenderModeProvider = constateResult[0];
export const useRenderMode = constateResult[1];
