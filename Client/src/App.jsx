import './App.css'
import Website from "./pages/Website";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense, useState } from "react";
import Layout from './components/Layout/Layout';
import Properties from './pages/Properties/Properties';
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { ToastContainer } from 'react-toastify';
import Property from './pages/Property/Property';
import UserDetailsContext from './context/UserDetailsContext';
// import 'react-toastify/dist/inject-style'

function App() {
  const queryClient = new QueryClient()
  const [userDetails, setUserDetails] = useState({
    favourite: [],
    bookings: [],
    token: null
  }
  
  )
  console.log(userDetails.token);
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path='/proporties'>
                  <Route index element={<Properties />} />
                  <Route path=':propertyId' element={<Property />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer style={{width:"100px"}}/>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailsContext.Provider>
  );
}

export default App;
