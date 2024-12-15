// import 'antd/dist/antd.css';
import './resources/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
// import Main from './pages/Main';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import UserHome from './pages/User/UserHome';
import UserBookings from './pages/User/UserBookings';
import UserPayments from './pages/User/UserPayments';
import UserProfile from './pages/User/UserProfile';
import AdminHome from './pages/Admin/AdminHome';
import Bookings from './pages/Admin/Bookings';
import chart from './pages/Admin/chart';
import ManageSlots from './pages/Admin/ManageSlots';
import Prices from './pages/Admin/Prices';
import Users from './pages/Admin/Users';
import Reports from './pages/Admin/Reports';
import Transactions from './pages/Admin/Transactions';
import BookNow from './pages/User/BookNow';
import Landing from './pages/Landing';
function App() {
  const loading = useSelector(state => state.alerts.loading);
  return (
    <div>
      {loading && <Loader/>}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Main/>}/> */}
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          {/* <Route path="/" element={<PublicRoute><Landing/></PublicRoute>} /> */}
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

          <Route path="/User/UserHome" element={<ProtectedRoute><UserHome/></ProtectedRoute>}/>
          <Route path="/User/UserBookings" element={<ProtectedRoute><UserBookings/></ProtectedRoute>}/>
          <Route path="/User/UserPayments" element={<ProtectedRoute><UserPayments/></ProtectedRoute>}/>
          <Route path="/User/UserProfile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
          <Route path="/BookNow" element={<ProtectedRoute><BookNow/></ProtectedRoute>}/>


          <Route path="/Admin/AdminHome" element={<ProtectedRoute adminOnly={true}><AdminHome/></ProtectedRoute>}/>
          <Route path="/Admin/Bookings" element={<ProtectedRoute adminOnly={true}><Bookings/></ProtectedRoute>}/>
          <Route path="/Admin/ManageSlot" element={<ProtectedRoute adminOnly={true}><ManageSlots/></ProtectedRoute>}/>
          <Route path="/Admin/Prices" element={<ProtectedRoute adminOnly={true}><Prices/></ProtectedRoute>}/>
          <Route path="/Admin/Reports" element={<ProtectedRoute adminOnly={true}><Reports/></ProtectedRoute>}/>
          <Route path="/Admin/Users" element={<ProtectedRoute adminOnly={true}><Users/></ProtectedRoute>}/>
          <Route path="/Admin/Transactions" element={<ProtectedRoute adminOnly={true}><Transactions/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
   
  );
}

export default App;
