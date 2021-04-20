import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { theme } from "./constants/themeConstant";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SignupPage from "./pages/SignupPage";
import OrderPage from "./pages/OrderPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import UserListPage from "./pages/UserListPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <main className="pb-2">
          <Route path="/" component={HomePage} exact />
          <Route path="/page/:pageNumber" component={HomePage} exact />
          <Route path="/search/:keyword" component={HomePage} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomePage}
            exact
          />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/order/:id" component={OrderPage} exact />
          <Route path="/order/:id/success" component={OrderSuccessPage} />
          <Route path="/register/:email" component={SignupPage} exact />
          <Route path="/orderhistory" component={OrderHistoryPage} />
          <Route path="/admin/orderlist" component={OrderListPage} />
          <Route path="/admin/userlist" component={UserListPage} />
          <Route path="/admin/productlist" component={ProductListPage} exact />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListPage}
            exact
          />
          <Route path="/admin/product/:id/edit" component={ProductEditPage} />
        </main>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
