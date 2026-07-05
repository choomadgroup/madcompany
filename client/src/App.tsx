import "@/lib/i18n"; // initialize i18next before anything else
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { NavigationBar } from "@/components/public/NavigationBar";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { AdminProvider } from "@/contexts/AdminContext";
import HomePage from "@/pages/public/Home";
import AboutPage from "@/pages/public/About";
import ContactPage from "@/pages/public/Contact";
import BlogPage from "@/pages/explore/Blog";
import BlogDetail from "@/pages/explore/BlogDetail";
import PortfolioPage from "@/pages/explore/Portfolio";
import PortfolioDetail from "@/pages/explore/PortfolioDetail";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import NotFound from "@/pages/public/Not-Found";
import "@/styles/index.scss";

const theme = createTheme({
    palette: {
        background: {
            default: "#FFF3D1"
        }
    }
});

function AppLayout() {
    const [location] = useLocation();
    const isAdmin = location.startsWith("/admin");
    return (
        <>
            {!isAdmin && <NavigationBar />}
            <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/explore/blog" component={BlogPage} />
                <Route path="/explore/blog/:id" component={BlogDetail} />
                <Route path="/explore/portfolio" component={PortfolioPage} />
                <Route path="/explore/portfolio/:id" component={PortfolioDetail} />
                <Route path="/admin/login" component={AdminLogin} />
                <Route path="/admin" component={AdminDashboard} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AdminProvider>
                <LocaleProvider>
                    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                        <AppLayout />
                    </WouterRouter>
                </LocaleProvider>
            </AdminProvider>
        </ThemeProvider>
    );
}

export default App;
