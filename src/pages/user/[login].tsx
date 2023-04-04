import React, {useState, useEffect, useRef} from 'react'
import site from "../../assets/site.png"
import github from "../../assets/github.png"
import location from "../../assets/location.png"
import user from "../../assets/user.png"
import { useRouter } from 'next/router'
import axios from '../../axios'
import Repo from '../components/Repo'

// type UInfo = {
//   name: string;
//   bio?: string;
// }

const User = () => {
  interface UInfo {
    avatar_url: string;
    name: string;
    location: string;
    blog: string;
    html_url: string;
    [key:string]: string;
  }
  const router = useRouter();
  const login = router?.query?.login;
  console.log(login, 'lognq')
  
  const [userInfo, setUserInfo] = useState<Array<UInfo>>([]);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUserInformation = async() => {
      try {
          const response = await Promise.all([
            axios.get(`/users/${login}`),
            axios.get(`/users/${login}/repos`),
          ]);
          setUserInfo(response[0].data);
          setRepos(response[1].data);
      } catch (error) {
        console.log(error);
      }
    };
      fetchUserInformation();
  }, [login]);

  return (
    <div className='container'>
      <a href="/"><button className='back'>Back</button></a>
      <div className="user-information">
        <div className="image">
          <img src={userInfo[0].avatar_url} />
        </div>
        <div className="user-content">
          <h3>{userInfo[0].name}</h3>
          <p>{userInfo[0].bio}</p>
          <div className="more-data">
            <p><img className='logo-icon' src={user.src} alt="user" />{userInfo[0].followers} Followers | Following {userInfo[0].following}</p>
            {userInfo[0].location && (
            <p>
              <img className='logo-icon' src={location.src} alt="" />
              {userInfo[0].location}
            </p>
            )}
            {userInfo[0].blog && (
            <p>
              <img className='logo-icon' src={site.src} alt="" />{userInfo[0].blog}
            </p>
            )}
            <p>
              <img className='logo-icon' src={github.src} alt="" />
              <a style={{cursor: 'pointer', textDecoration: 'underline'}} href={userInfo[0].html_url} target="_blank">View Github Profile</a>
            </p>
          </div>
        </div>
      </div>
      <div className="user-repos">
        {repos ? (repos.map((repo: any) => {
         return <Repo repo={repo} key={repo.id} />
})) : (
  <h2>No repository for this user...</h2>
)
      }
      </div>
    </div>
  )
}

export default User