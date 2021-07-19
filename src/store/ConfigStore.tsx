/* eslint-disable react/prop-types */
import * as React from 'react';

export const ConfigStore = React.createContext<Config>({});

type Config = { [key: string]: string };

const ConfigProvider: React.FunctionComponent = ({ children }) => {
  const [config, setConfig] = React.useState<Config>({});

  React.useEffect(() => {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.on(
      'get-env-reply',
      (
        _: never,
        arg: {
          parsed: {
            [key: string]: string;
          };
        }
      ) => {
        setConfig(arg.parsed);
      }
    );
    ipcRenderer.send('get-env');
  }, []);

  return <ConfigStore.Provider value={config}>{children}</ConfigStore.Provider>;
};

export default ConfigProvider;
