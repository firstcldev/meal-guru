import { Route } from "react-router-dom";
import {
    IonApp,
    IonRouterOutlet,
    setupIonicReact,
    //@ts-ignore
} from "@ionic/react";
//@ts-ignore
import { IonReactRouter } from "@ionic/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import Welcome from "./pages/Auth/Welcome";
import Register from "./pages/Auth/Register";
import { defaultTheme } from "./theme";
import Pantry from "./pages/Pantry";
import AddToPantry from "./pages/AddToPantry";
import StorageGuru from "./pages/StorageGuru";

setupIonicReact();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchInterval: Infinity,
            cacheTime: Infinity,
            retry: false,
            retryOnMount: false,
        },
        mutations: {
            retry: false,
        },
    },
});

const App: React.FC = () => (
    <IonApp>
        <ThemeProvider theme={defaultTheme}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
            >
                <QueryClientProvider client={queryClient}>
                    <IonReactRouter>
                        <IonRouterOutlet>
                            <Route exact path="/">
                                <Welcome />
                            </Route>
                            <Route exact path="/register">
                                <Register />
                            </Route>
                            <Route exact path="/pantry">
                                <Pantry />
                            </Route>
                            <Route exact path="/add-to-pantry">
                                <AddToPantry />
                            </Route>
                            <Route exact path="/storage-guru">
                                <StorageGuru />
                            </Route>
                        </IonRouterOutlet>
                    </IonReactRouter>
                </QueryClientProvider>
            </LocalizationProvider>
        </ThemeProvider>
    </IonApp>
);

export default App;
