import "@/lib/i18n"; // initialize i18next before anything else
import { Switch, Route, Router as WouterRouter } from "wouter";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { NavigationBar } from "@/components/public/NavigationBar";
import { LocaleProvider } from "@/contexts/LocaleContext";
import HomePage from "@/pages/public/Home";
import PermissionCalculatorPage from "@/pages/public/Permission-Calculator";
import GettingStartedPage from "@/pages/docs/Getting-Started";
import ConfigurationPage from "@/pages/docs/Configuration";
import NotFound from "@/pages/public/Not-Found";
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
