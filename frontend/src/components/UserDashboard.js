import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


export default function UserDashboard({a,handleSigning, loggedIn, isAdmin}) {
  // if (!loggedIn || isAdmin) {
  //   return <Navigate to='/'/>
  // }
  return (
    <div>
      <Navbar handleSigning={handleSigning}/>
        <Outlet />
    </div>
  );
}
