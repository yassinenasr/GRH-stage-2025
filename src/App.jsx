import { Route, Routes, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import CheckoutPage from "./pages/CheckoutPage";
import DetailPage from "./pages/DetailPage";
import ProductsProvider from "./contexts/ProductsProvider";
import CartProvider from "./contexts/CartProvider";
import AuthenticateProvider from "./contexts/AuthenticateProvider";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Protected from "./components/Protected";
import Dashbord from "./pages/Dashbord";
import MyAccount from "./components/dashboard/MyAccount";
import AdminDashboard from "./components/dashboard/admin";
import EmployeeDashboard from "./components/dashboard/employ";
import Congeform from "./components/dashboard/congeform";
import MyOrders from "./components/dashboard/MyOrders";
import AuthProtected from "./components/AuthProtected";
import About from "./pages/About";
import Demandes from "./components/dashboard/demandes";
import DemandesT from "./components/dashboard/demandesT";
import PerfDashboard from "./components/dashboard/perf";
import DemandesE from "./components/dashboard/demandesE";
import CongeformE from "./components/dashboard/congeformE";
import ResponsableDashboard from "./components/dashboard/responsable";
import EmployeeTDashboard from "./components/dashboard/employeeT";
import Aform from "./components/dashboard/Aform";
import DemandesR from "./components/dashboard/demandesR";
import DemandesTR from "./components/dashboard/demandesTR";
import PerfRDashboard from "./components/dashboard/perfR";
import Menu from "./pages/Menu";
import AutomatiqueInformatiqueIndustrielle from "./pages/programmes/AutomatiqueInformatiqueIndustrielle";
import ConceptionProductionIntegree from "./pages/programmes/ConceptionProductionIntegree";

function App() {
  return (
    <>
      <AuthenticateProvider>
        <CartProvider>
          <ProductsProvider>
            <Layout>
              <Routes>
                <Route
                  index
                  path="/home"
                  element={<Navigate to="/" replace />}
                />
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/programmes/automatique-informatique-industrielle" element={<AutomatiqueInformatiqueIndustrielle />} />
                <Route path="/programmes/conception-production-integree" element={<ConceptionProductionIntegree />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<DetailPage />} />
                <Route path="/*" element={<NotFound />} />
                {/* preventing user to navigate to auth routes if has loged in already */}
                <Route element={<AuthProtected />}>
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/login" element={<Navigate to={'/auth/login'} />} />
                </Route>
                {/* protected Routes go here if user is not loged in */}
                <Route >
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/dashboard" element={<Dashbord />} >
                    <Route path={'perf'} element={<PerfDashboard />} />
                    <Route path={'perfR'} element={<PerfRDashboard />} />

                    <Route path={'demandesE'} element={<DemandesE />} />
                    <Route path={'congeformE'} element={<CongeformE />} />
                    <Route path={'employeeT'} element={<EmployeeTDashboard />} />
                    <Route path={'employee'} element={<EmployeeDashboard />} />
                    <Route path={'responsable'} element={<ResponsableDashboard />} />
                    <Route path={'admin'} element={<AdminDashboard />} />
                    <Route path={'demandesT'} element={<DemandesT />} />
                    <Route path={'demandesR'} element={<DemandesR />} />
                    <Route path={'demandesTR'} element={<DemandesTR />} />
                    <Route path={'demandes'} element={<Demandes />} />
                    <Route path={'congeform'} element={<Congeform />} />
                    <Route path={'my-account'} element={<MyAccount />} />
                    <Route path={'my-orders'} element={<MyOrders />} />
                    <Route path={'add-employee'} element={<Aform />} />
                  </Route>
                </Route>
              </Routes>
            </Layout>
          </ProductsProvider>
        </CartProvider>
      </AuthenticateProvider>
      <Toaster
        toastOptions={{
          style: { color: "#ffffff", backgroundColor: "#262626" },
          position: "bottom-left"
        }}
      />
    </>
  );
}

export default App;
