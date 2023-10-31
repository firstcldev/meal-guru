import { Redirect, Route } from "react-router-dom";
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

import { defaultTheme } from "./theme";
import Welcome from "./pages/Auth/Welcome";
import Register from "./pages/Auth/Register";
import Pantry from "./pages/Pantry";
import AddToPantry from "./pages/AddToPantry";
import StorageGuru from "./pages/StorageGuru";
import Login from "./pages/Auth/Login";
import ConfirmEmail from "./pages/Auth/ConfirmMail";
import { useMemo } from "react";
import { getCurrentCognitoUser } from "./Cognito";
import Profile from "./pages/Profile";

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

const App: React.FC = () => {
    const currentUser = useMemo(() => {
        return getCurrentCognitoUser();
    }, []);
    return (
        <IonApp>
            <ThemeProvider theme={defaultTheme}>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="en-gb"
                >
                    <QueryClientProvider client={queryClient}>
                        <IonReactRouter>
                            <IonRouterOutlet>
                                {/* if user is logged in */}
                                {currentUser ? (
                                    <>
                                        {/* redirect to pantry page if user is logged in  */}
                                        <Route exact path="/pantry">
                                            <Pantry />
                                        </Route>
                                        <Route exact path="/add-to-pantry">
                                            <AddToPantry />
                                        </Route>
                                        <Route exact path="/storage-guru">
                                            <StorageGuru />
                                        </Route>
                                        <Route exact path="/profile">
                                            <Profile />
                                        </Route>
                                        {/* <Route exact path="/*">
                                            <Redirect to="/pantry" />
                                        </Route> */}
                                    </>
                                ) : (
                                    <>
                                        <Route exact path="/">
                                            <Welcome />
                                        </Route>
                                        <Route exact path="/register">
                                            <Register />
                                        </Route>
                                        <Route exact path="/login">
                                            <Login />
                                        </Route>
                                        <Route exact path="/confirm-email">
                                            <ConfirmEmail />
                                        </Route>
                                        <Route exact path="/*">
                                            <Redirect to="/" />
                                        </Route>
                                    </>
                                )}
                            </IonRouterOutlet>
                        </IonReactRouter>
                    </QueryClientProvider>
                </LocalizationProvider>
            </ThemeProvider>
        </IonApp>
    );
};

export default App;
