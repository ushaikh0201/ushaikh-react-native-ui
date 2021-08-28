import _pt from "prop-types";
import React from 'react';
import { View, requireNativeComponent } from 'react-native';
const NativeSafeAreaSpacerView = requireNativeComponent('SafeAreaSpacerView');

const SafeAreaSpacerView = ({
  style
}) => {
  return (// @ts-ignore
    NativeSafeAreaSpacerView ? <NativeSafeAreaSpacerView style={style} /> : <View style={style} />
  );
};

SafeAreaSpacerView.displayName = 'IGNORE';
export default SafeAreaSpacerView;