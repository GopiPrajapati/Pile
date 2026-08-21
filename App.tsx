import React from 'react';
import { LogBox } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './src/container/RootNavigator';
import store, { persistor } from './src/redux/store';

LogBox.ignoreLogs([
  '[Reanimated] dependencies should only be used in web implementation.',
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <KeyboardProvider>
            <RootNavigator />
          </KeyboardProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
