import React from 'react';
import UserList from './components/UserList/UserList';
import TeamPage from './components/TeamPage/TeamPage';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/"  element={<UserList />} />
          <Route exact path="/team" element={<TeamPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
