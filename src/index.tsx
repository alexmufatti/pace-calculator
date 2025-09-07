import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {ModalsProvider} from "@mantine/modals";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import Main from "./components/Main.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider defaultColorScheme="dark">
            <ModalsProvider>
                <Notifications/>
                <Main/>
            </ModalsProvider>
        </MantineProvider>
    </React.StrictMode>,
);
