import Container from "@mui/material/Container";
import {Header} from "./components";
import {Home, FullPost, Registration, AddPost, Login} from "./pages";
import {Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectIsAuth,logout} from "./redux/slices/auth";
import React from 'react';
import {UserDetails} from "./pages/UserDetails";
function App() {
    const dispatch=useDispatch();
    const isAuth=useSelector(selectIsAuth);


    React.useEffect(()=>{
        dispatch(fetchAuthMe());
    },[]);



    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/posts/:id" element={<FullPost/>}/>
                    <Route path="/profile" element={<UserDetails/>}/>
                    <Route path="/posts/:id/edit" element={<AddPost/>}/>
                    <Route path="/add-post" element={<AddPost/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Registration/>}/>
                </Routes>
            </Container>
        </>
    );
}

export default App;
