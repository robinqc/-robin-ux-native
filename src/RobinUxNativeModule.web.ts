import { registerWebModule, NativeModule } from 'expo';

import { RobinUxNativeModuleEvents } from './RobinUxNative.types';

class RobinUxNativeModule extends NativeModule<RobinUxNativeModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(RobinUxNativeModule, 'RobinUxNativeModule');
