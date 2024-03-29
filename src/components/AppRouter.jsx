// import React, {useContext} from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom'
// import {privateRoutes, publicRoutes} from "../router";
// import {AuthContext} from "../context";
// import Loader from "./UI/Loader/Loader";
// import About from '../pages/About';
// import Posts from '../pages/Posts';
// import Error from '../pages/Error';
// import PostIdPage from '../pages/PostIdPage';

// const AppRouter = () => {
//     const {isAuth, isLoading} = useContext(AuthContext);
//     console.log(isAuth)

//     if (isLoading) {
//         return <Loader/>
//     }

//     return (
//         isAuth
//             ?
//             <Routes>
//                 {privateRoutes.map(route =>
//                     <Route
//                         component={route.component}
//                         path={route.path}
//                         exact={route.exact}
//                         key={route.path}
//                     />
//                 )}
//                 <Route path="*" element={<Navigate to="/posts" />} />
//             </Routes>
//             :
//             <Routes>
//                 {publicRoutes.map(route =>
//                     <Route
//                         component={route.component}
//                         path={route.path}
//                         exact={route.exact}
//                         key={route.path}
//                     />
//                 )}
//                 <Route path="*" element={<Navigate to="/posts" />} />
//             </Routes>
//     );
// };


import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/about" element={<About />} />
        <Route exact path="/posts" element={<Posts />} />
        <Route exact path="/posts/:id" element={<PostIdPage />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/posts" />} />
        <Route path="**" element={<Navigate to="/error" />} />
    </Routes>
  )
}

export default AppRouter;