import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {setCommunities, selectAllCommunities, clearCommunities, addCommunity} from './slices/forumSlice'
import Home from './components/Home/Home'
import Navbar from './components/Nav/Navbar';
import Login from './components/Home/Login';
import Feed from './components/Feed/Feed';
import CreateCommunity from './components/Community/CreateCommunity';
import AllCommunities from './components/Community/AllCommunities';
import JoinedCommunities from './components/Community/JoinedCommunities';
import { joinCommunity } from './api/api';
import CommunityExpanded from './components/Community/CommunityExpanded';
import PostExpanded from './components/Post/PostExpanded';
import Profile from './components/Home/Profile';
import { loadCommunities } from './slices/forumSlice';



function App() {
  const user=JSON.parse(localStorage.getItem('gabprofile'))
  const dispatch=useDispatch()


  

  return (
    <Router>
        <div>
        <Navbar />

        <Switch>

          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/login">
              <Login />
          </Route>

          <Route path='/feed'>
            <Feed />
          </Route>

          <Route path='/create/community'>
              <CreateCommunity />
          </Route>

          <Route path='/communities/all'>
              <AllCommunities />
          </Route>

          <Route path='/communities/joined'>
            <JoinedCommunities />
          </Route>

          <Route path='/community/:id'>
            <CommunityExpanded />
          </Route>

        <Route path='/post/:id'>
          <PostExpanded />
        </Route>

        <Route path='/profile'>
          <Profile />
        </Route>

      
        </Switch>     
        </div>
    </Router>
    
  );
}

export default App;
