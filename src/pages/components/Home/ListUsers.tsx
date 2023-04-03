import React from 'react'

const ListUsers = (user: any) => {
  console.log(user, 'userq');
  const {avatar_url, login, id} = user?.user;

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