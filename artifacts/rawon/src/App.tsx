import { Switch, Route, Router as WouterRouter } from "wouter";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { NavigationBar } from "@/components/NavigationBar";
import { LocaleProvider } from "@/contexts/LocaleContext";
import HomePage from "@/pages/index";
import PermissionCalculatorPage from "@/pages/permission-calculator";
import GettingStartedPage from "@/pages/docs/getting-started";
import ConfigurationPage from "@/pages/docs/configuration";
import CookiesSetupPage from "@/pages/docs/cookies-setup";
import DisclaimersPage from "@/pages/docs/disclaimers";
import NotFound from "@/pages/not-found";
import "@/styles/index.scss";

const theme = createTheme({
    palette: {
        background: {
            default: "#FFF3D1"
        }
    }
});

function Router() {
    return (
        <Switch>
            <Route path="/" component={HomePage} />
            <Route
                path="/permission-calculator"
                component={PermissionCalculatorPage}
            />
            <Route
                path="/docs/getting-started"
                component={GettingStartedPage}
            />
            <Route path="/docs/configuration" component={ConfigurationPage} />
            <Route path="/docs/cookies-setup" component={CookiesSetupPage} />
            <Route path="/docs/disclaimers" component={DisclaimersPage} />
            <Route component={NotFound} />
        </Switch>
    );
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LocaleProvider>
                <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                    <NavigationBar />
                    <Router />
                </WouterRouter>
            </LocaleProvider>
        </ThemeProvider>
    );
}

export default App;
