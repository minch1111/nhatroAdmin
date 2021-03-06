import { createContext, useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import Nav from "./components/Nav";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WareHouseManage from "./pages/warehouseManage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Page404 from "./pages/Page404";
import authServices from "./services/authServices";
import MainManage from "./pages/mainManage";
import Media from "./pages/media";
import ListOrder from "./pages/staffPay";
import OrderDetail from "./pages/staffPay/OrderDetail";
import Rate from "./pages/media/Rate";
import RateDetail from "./pages/media/RateDetail";
export const Context = createContext();

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("tokenAdmin"))
  );
  // const [brands,setBrands] = useState(localStorage.getItem('brands'))
  const [loginError, setLoginError] = useState();
  const login = async (form) => {
    try {
      let res = await authServices.login(form);
      // console.log(`token`, res.accessToken)
      if (res?.success) {
        // localStorage.setItem("loginAdmin", JSON.stringify(res.));
        console.log('res', res)
        localStorage.setItem("tokenAdmin", JSON.stringify(res.data));
        setUser(JSON.parse(localStorage.getItem("tokenAdmin")));
        setLoginError();
      } else {
        setLoginError(res?.message);
      }
    } catch (err) {
      console.log(`err`, err);
    }
  };
  // const login=(form)=>{
  //   localStorage.setItem('loginAdmin',JSON.stringify(form))
  //   setUser(form)
  // }
  const logout = () => {
    localStorage.removeItem("loginAdmin");
    localStorage.removeItem("token");
    setUser(localStorage.getItem("loginAdmin"));
    setLoginError();
  };
console.log(`user`, user)

  return (
    <div id="wrapper" className="App">
      {/* <Login /> */}

      {/* user ? (<Register />) : ( */}
      <Context.Provider value={{ user, loginError, login, logout }}>
        <Router>
          {!user ? (
            <Login />
          ) : (
            <>
              <Nav />
              <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <Header />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    {/* <PrivateRoute path="/warehouse-manage" component={WareHouseManage}/> */}
                    <Route path="/main-manager"  component={MainManage} />
                    {/* <PrivateRoute path="/media" component={Media} />
                    <PrivateRoute path="/staff" exact component={ListOrder} />
                    <PrivateRoute path="/staff/:slug" component={OrderDetail} />
                    <PrivateRoute path="/rate" exact component={Rate} />
                    <PrivateRoute path="/rate/:slug" component={RateDetail} /> */}
                    <PrivateRoute>
                      <Page404 />
                    </PrivateRoute>
                  </Switch>
                  {/* <WareHouseManage /> */}
                  <Footer />
                </div>
              </div>
            </>
          )}
        </Router>
      </Context.Provider>

      {/* <Nav />
      <div id="content-wrapper" className="d-flex flex-column">

        <div id="content">
          <Header />

          <Home />
          <Footer />
        </div>
      </div> */}
    </div>
  );
}

export default App;
