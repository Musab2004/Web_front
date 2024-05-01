import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar3 from "components/Sidebar/Sidebar3.js";

import routes from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo2.png";
import { themeState } from "states/themeState";

let ps;

const switchRoutes = (routes) => (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  const [theme, setTheme] = themeState.use()
  React.useEffect(() => {
    // edit the attribute data-theme of html tag
    const html = document.getElementsByTagName("html")[0];
    // set the data-theme attribute to the current theme
    html.setAttribute("data-theme", theme);
  }, [theme])
  return (
    <div className="drawer drawer-mobile"><input id="main-menu" type="checkbox" className="drawer-toggle" />
      <main class="flex-grow block overflow-x-hidden bg-base-100 text-base-content drawer-content">
        <Navbar
          routes={routes()}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div class="p-4 lg:p-10">
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes(routes())}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes(routes())}</div>
          )}
          {getRoute() ? <Footer /> : null}
        </div>
      </main>
      <Sidebar3
        routes={routes().filter(route => route.invisible === undefined)}
        // logoText={"Getx"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
    </div>
  );
}
