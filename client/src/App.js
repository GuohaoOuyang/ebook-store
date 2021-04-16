import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { theme } from "./constants/themeConstant";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomePage";
import ProductScreen from "./screens/ProductPage";
import CartScreen from "./screens/CartPage";
import RegisterScreen from "./screens/SignupPage";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderPage";
import OrderSuccessPage from "./screens/OrderSuccessPage";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <main className="pb-2">
          <Container fluid="true">
            <Route path="/order/:id" component={OrderScreen} exact />
            <Route path="/order/:id/success" component={OrderSuccessPage} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route
              path="/admin/productlist"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
              exact
            />
            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/admin/orderlist" component={OrderListScreen} />
          </Container>
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
