
import Navbar, { Topnavbar } from "./components/Navbar";
import { AllRoutes } from "./AllRoutes";

const App = () => {
  return (
    <div className="nav-container">
      <Topnavbar />
      <Navbar />
      {/* <Table/> */}
      <AllRoutes />
    </div>

  );
}

export default App;
