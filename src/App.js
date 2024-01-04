
import Authentication from './Mycomponents/Authentication/authentication';
import Sidebar from './Mycomponents/CRM/sidebar';
import Dashboard from "./Mycomponents/pages/dashboard";
import Consumer_data from "./Mycomponents/pages/consumer_data";
import Fraud_alert from "./Mycomponents/pages/fraud_alert";
import Real_time_logs from "./Mycomponents/pages/real_time_logs";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
  
  <>
  <Router>
        <Routes>
        <Route path="/" element={<Authentication />} />
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Dashboard />
            </Sidebar>
          }
        />
        <Route
          path="/consumer_data"
          element={
            <Sidebar>
              <Consumer_data />
            </Sidebar>
          }
        />
        <Route
          path="/fraud_alert"
          element={
            <Sidebar>
              <Fraud_alert />
            </Sidebar>
          }
        />
        <Route
          path="/real_time_logs"
          element={
            <Sidebar>
              <Real_time_logs />
            </Sidebar>
          }
        />
        <Route path="*" element={<> not found</>} />
        </Routes>
    </Router>
  </>
   
  );
}

export default App;
