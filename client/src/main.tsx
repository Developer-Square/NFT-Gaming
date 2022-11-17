import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  Home,
  CreateBattle,
  JoinBattle,
  Battle,
  BattleGround,
  LandingPage,
} from './page';
import './index.css';
import { GlobalContextProvider } from './context';
import { OnboardModal } from './components';

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <OnboardModal />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/landing-page' element={<LandingPage />} />
        <Route path='/create-battle' element={<CreateBattle />} />
        <Route path='/join-battle' element={<JoinBattle />} />
        <Route path='/battleground' element={<BattleGround />} />
        <Route path='/battle/:battleName' element={<Battle />} />
      </Routes>
    </GlobalContextProvider>
  </BrowserRouter>
);
