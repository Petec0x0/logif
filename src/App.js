import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './navpages/about/About';
import Donate from './navpages/donate/Donate';
import Give from './navpages/give/Give';
import Membership from 'navpages/membership/Membership';
import DashboardLayout from 'navpages/DashboardLayout';
import Overview from 'navpages/Overview';
import NotFound from 'navpages/NotFound';
import MembersList from 'navpages/MembersList';
import AdminLogin from 'navpages/AdminLogin';
import MemberLogin from 'navpages/MemberLogin';
import Profile from 'navpages/Profile';
import MemberPaymentList from 'navpages/MemberPaymentList';
import MakePayment from 'navpages/MakePayment';
import UnconfirmedPayments from 'navpages/UnconfirmedPayments';
import GlobalPayReceipt from 'navpages/GlobalPayReceipt';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/donate" exact element={<Donate />} />
        <Route path="/give" exact element={<Give />} />
        <Route path="/membership" exact element={<Membership />} />
        <Route path="/member/login" exact element={<MemberLogin />} />
        <Route path="/admin/login" exact element={<AdminLogin />} />
        <Route path="dashboard/" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="members-list" element={<MembersList />} />
          <Route path="unconfirmed-payments" element={<UnconfirmedPayments />} />
          <Route path="profile" element={<Profile />} />
          <Route path="payment-list/:memberId" element={<MemberPaymentList />} />
          <Route path="make-payment" element={<MakePayment />} />
        </Route>
        <Route path="/verify-globalpay" exact element={<GlobalPayReceipt />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
