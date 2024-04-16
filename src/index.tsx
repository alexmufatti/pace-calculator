import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {ModalsProvider} from "@mantine/modals";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider  defaultColorScheme="dark">
            <ModalsProvider>
                <Notifications />
            <App />
            </ModalsProvider>
        </MantineProvider>
    </React.StrictMode>,
);
