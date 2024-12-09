import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/RegisterInicio/Login/Login';
import Register from './Components/RegisterInicio/Register/Register';
import ForgotPassword from './Components/RegisterInicio/ForgotPassword/ForgotPassword';
import RecoveryPassword from './Components/RegisterInicio/RecoveryPassword/RecoveryPassword';
import ContactScreen from './Screens/ContactScreen/ContactScreen';
import ChatScreen from './Screens/ChatScreen/ChatScreen';
import { InfoScreen } from './Screens';
import VerifyEmail from './Components/VerifyEmail/VerifyEmail';



const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email/:validation_token" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-password/:reset_token" element={<RecoveryPassword />} />
            <Route path="/inicio" element={<ContactScreen />} />
            <Route path="/mensaje/:id" element={<ChatScreen />} />
            <Route path="/info" element={<InfoScreen />} />
        </Routes>
    );
}

export default App;
