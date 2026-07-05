import "@/lib/i18n"; // initialize i18next before anything else
import { Switch, Route, Router as WouterRouter } from "wouter";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { NavigationBar } from "@/components/public/NavigationBar";
import { LocaleProvider } from "@/contexts/LocaleContext";
import HomePage from "@/pages/public/Home";
import AboutPage from "@/pages/public/About";
import ContactPage from "@/pages/public/Contact";
import BlogPage from "@/pages/explore/Blog";
import PortfolioPage from "@/pages/explore/Portfolio";
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
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/explore/blog" component={BlogPage} />
            <Route path="/explore/portfolio" component={PortfolioPage} />
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
