import AuthLogin from "./auth/auth-login";
import "./assets/style/app.main.css";
import "./assets/style/components.css";
import "./assets/style/style.css";
import "./assets/style/newstyle.css";
// import "images/favicon.ico";
import Navigator from "./components/navigator";
import { Router } from "react-router-dom";
function App() {
  return (
    <>
      <Navigator />
    </>
  );
}

export default App;
