import React from "react";
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import './App.css'
export default function App() {
    return (
        <div className="App" >
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
