import React, {FC} from 'react';
import {useRenderMode} from "../../../hooks";
import {RenderMode} from "../../../types";

type ChangeRenderMode = (newRenderMode: RenderMode) => void;

interface Props {
  renderView: (onChangeRenderMode: ChangeRenderMode) => React.ReactNode;
  renderEdit: (onChangeRenderMode: ChangeRenderMode) => React.ReactNode;
}

const RenderModeController: FC<Props> = ({renderView, renderEdit}) => {
  const {renderMode, handleChangeRenderMode} = useRenderMode();

  switch (renderMode) {
    case RenderMode.View:
      return renderView(handleChangeRenderMode);
    case RenderMode.Edit:
      return renderEdit(handleChangeRenderMode);
    default:
      return null;
  }
};

export default RenderModeController;