import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { ReactLenis } from "@studio-freight/react-lenis";

const App = () => (
  <ReactLenis root>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </ReactLenis>
);

export default App;
