import { requireNativeView } from 'expo';
import * as React from 'react';

import { RobinUxNativeViewProps } from './RobinUxNative.types';

const NativeView: React.ComponentType<RobinUxNativeViewProps> =
  requireNativeView('RobinUxNative');

export default function RobinUxNativeView(props: RobinUxNativeViewProps) {
  return <NativeView {...props} />;
}
