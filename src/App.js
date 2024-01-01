// import Authentication from './Mycomponents/Authentication/authentication';
import Sidebar from './Mycomponents/CRM/sidebar';
import Dashboard from "./Mycomponents/pages/dashboard";
import Consumer_data from "./Mycomponents/pages/consumer_data";
import Fraud_alert from "./Mycomponents/pages/fraud_alert";
import Real_time_logs from "./Mycomponents/pages/real_time_logs";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
  //  <div>
  //     {/* <Authentication /> */}
  //  </div>
  <>
  <Router>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/consumer_data" element={<Consumer_data />} />
          <Route path="/fraud_alert" element={<Fraud_alert />} />
          <Route path="/real_time_logs" element={<Real_time_logs />} />

          <Route path="*" element={<> not found</>} />
        </Routes>
      </Sidebar>
    </Router>
  </>
   
  );
}

export default App;
