import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/Store'
import Landing from './pages/Landing';
import UserLanding from './pages/user/UserLanding';
import OrganizerLanding from './pages/organizer/OrganizerLanding';
import UserLogin from './pages/user/UserLogin';
import UserSignup from './pages/user/UserSignup';
import OrgLogin from './pages/organizer/OrgLogin';
import OrgSignup from './pages/organizer/OrgSignup';
import UserProfile from './pages/user/UserProfile';
import Events from './pages/user/Events';
import UserTickets from './pages/user/UserTickets'
import OrgProfile from './pages/organizer/OrgProfile';
import OrgDashboard from './pages/organizer/OrgDashboard';
import OrgAnalytics from './pages/organizer/OrgAnalytics'
import AddEvents from './pages/organizer/AddEvents';
import EventDescription from './pages/user/EventDescription';
import Footerr from './components/Footerr';
import TicketSelection from './pages/user/TicketSelection';
import PersonalInfo from './pages/user/PersonalInfo';

const App = () => {

  return (
    <div style={{width:"100%",height:"100%"}}>
        <BrowserRouter>
         <Provider store={store}>
         <Routes>
              <Route path='/' element={<Landing />}></Route>
              <Route path='/user' element={<UserLanding/>}></Route>
              <Route path='/organizer' element={<OrganizerLanding/>}></Route>
              <Route path='/userLogin' element={<UserLogin/>}></Route>
              <Route path='/userSignup' element={<UserSignup/>}></Route>
              <Route path='/orgLogin' element={<OrgLogin/>}></Route>
              <Route path='/orgSignup' element={<OrgSignup/>}></Route>
              <Route path='/account' element={<UserProfile/>}></Route>
              <Route path='/orgAccount' element={<OrgProfile/>}></Route>
              <Route path='/events' element={<Events/>}></Route>
              <Route path='/dashboard' element={<OrgDashboard/>}></Route>
              <Route path='/analytics' element={<OrgAnalytics/>}></Route>
              <Route path='/addEvents' element={<AddEvents/>}></Route>
              <Route path='/tickets' element={<UserTickets/>}></Route>
              <Route path='/eventDescription/:value' element={<EventDescription/>}></Route>
              <Route path='/ticketSelection/:value' element={<TicketSelection/>}></Route>
              <Route path='/personalInfo/:eventId' element={<PersonalInfo/>}></Route>
           </Routes>
         </Provider>
         <Footerr/>
        </BrowserRouter>
    </div>
  )
}

export default App