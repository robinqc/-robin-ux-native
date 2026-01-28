import * as React from 'react';

import { RobinUxNativeViewProps } from './RobinUxNative.types';

export default function RobinUxNativeView(props: RobinUxNativeViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
