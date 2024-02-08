import React from "react";
import {Routes, Route} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import './assets/global.css'
export default function App() {
    return (
        <div className="App" >
            <Toaster position="top-center" reverseOrder={false} /> 
            <Routes>
                <Route path="/"
                    element={
                        < HomePage />
                }></Route>
                <Route path="/chat"
                    element={<ChatPage/>}></Route>
            </Routes>
            
        </div>

    );
}
