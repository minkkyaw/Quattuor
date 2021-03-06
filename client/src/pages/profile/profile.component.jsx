import React, { useState, useEffect, useContext } from 'react';

import PostsContainer from '../../components/posts-container/posts-container.component';
import PostFormContainer from '../../components/post-form-container/post-form-container.component';
import PostsContext from '../../contexts/posts/posts.context';
import AdsContainer from '../../components/ads-container/ads-container.component';
import UserProfileContainer from '../../components/user-profile-container/user-profile-container.component';
import PostsProvider from '../../provider/posts.provider';
import ReloadPostContext from '../../contexts/reload-post/reload-post.context';
import CurrentUserContext from "../../contexts/current-user/current-user.context";

import './profile.styles.scss';
import API from '../../utils/API';

const Profile = props => {
  const currentUser = useContext(CurrentUserContext);
  const [posts, setPosts] = useState([]);
  const [reloadPostCheck, setReloadPostCheck] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    zipCode: '',
    posts: [],
  });

  useEffect(() => {
    API.getUser(props.match.params.id)
      .then(response => {
        let user = response.data.data.data;
        setUserData(user);
        let query = {userId: user._id, firstName:user.firstName};
        if(user.photoUrl) query.photoUrl = user.photoUrl;
        API.getAllPostsForProfile(query)
          .then(response => setPosts(response.data.data.data))
      })
  },[reloadPostCheck]);

  useEffect(() => {
    if(posts) console.log(posts);
  },[posts]);

  const reloadPost = () => setReloadPostCheck(!reloadPostCheck);

  return (
    <ReloadPostContext.Provider value={reloadPost}>
      <div className="profile-page-container">
        <div className="profile-left-container">
          <UserProfileContainer userData={userData} />
        </div>
        <div className="main-center-container">
          <PostsProvider>
            {
              currentUser && currentUser.user._id == userData._id ?
                <PostFormContainer />
              : null
            }
            <PostsContext.Provider value={posts}>
              <PostsContainer />
            </PostsContext.Provider>
          </PostsProvider>
        </div>
        <AdsContainer />
      </div>
    </ReloadPostContext.Provider>
  );
}

export default Profile;