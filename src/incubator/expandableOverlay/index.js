import React, { useCallback, useState, forwardRef, useImperativeHandle } from 'react';
import TouchableOpacity from "../../components/touchableOpacity";
import View from "../../components/view";
import Modal from "../../components/modal";
import Dialog from "../../components/dialog";

const ExpandableOverlay = (props, ref) => {
  const {
    children,
    expandableContent,
    useDialog,
    modalProps,
    dialogProps,
    showTopBar,
    topBarProps,
    ...others
  } = props;
  const [expandableVisible, setExpandableVisible] = useState(false);
  const showExpandable = useCallback(() => setExpandableVisible(true), []);
  const hideExpandable = useCallback(() => setExpandableVisible(false), []);
  useImperativeHandle(ref, () => ({
    openExpandable: () => {
      showExpandable();
    },
    closeExpandable: () => {
      hideExpandable();
    }
  }));

  const renderModal = () => {
    return <Modal {...modalProps} visible={expandableVisible} onDismiss={hideExpandable}>
        {showTopBar && <Modal.TopBar onDone={hideExpandable} {...topBarProps} />}
        {expandableContent}
      </Modal>;
  };

  const renderDialog = () => {
    return <Dialog {...dialogProps} visible={expandableVisible} onDismiss={hideExpandable}>
        {expandableContent}
      </Dialog>;
  };

  return <TouchableOpacity {...others} onPress={showExpandable}>
      <View pointerEvents="none">{children}</View>
      {useDialog ? renderDialog() : renderModal()}
    </TouchableOpacity>;
};

export default forwardRef(ExpandableOverlay);