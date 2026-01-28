import { NativeModule, requireNativeModule } from 'expo';

import { RobinUxNativeModuleEvents } from './RobinUxNative.types';

declare class RobinUxNativeModule extends NativeModule<RobinUxNativeModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<RobinUxNativeModule>('RobinUxNative');
