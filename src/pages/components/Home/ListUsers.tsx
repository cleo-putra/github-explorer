import React from 'react'
import {useRouter} from 'next/router';

const ListUsers = (user: any) => {
  console.log(user, 'userq');
  const {avatar_url, login, id} = user?.user || {};
  const router = useRouter();
  if (router.isFallback) {
    <h1>Data is loading</h1>;
  }

  return (
    <div className="user">
      <div className="image">
        <img style={{width: '80px', height: '80px'}} src={avatar_url} alt={login} />
      </div>
      <div className="user-info">
        <h4>{login}</h4>
        <small>{id}</small>
        <a style={{textDecoration: 'underline', color: '#088F8F'}} href={`/user/${login}`}>View Profile</a>
      </div>
    </div>
  )
}

export default ListUsers