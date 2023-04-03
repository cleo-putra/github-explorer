import React, {useState, useEffect} from 'react'
import axios from '../../../axios'
import ListUsers from './ListUsers';

const Home = () => {

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const handleQueryInput = (e: any) => {
    const value = e.target.value;
    setQuery(value);
  }

  const handlePrevPage = () => {
    setPage(page => {
      if(page === 1) return page;
      else return page - 1;
    })
  }

  const handleNextPage = () => {
    setPage(page => page + 1);
  }

  const fetchUsers = async() => {
    try{
      const {data} = await axios.get("/search/users?q=" + query, {
        params: {
          page,
          per_page: limit,
        }
      });
      return data?.items;
    } catch(error){
      return null;
    }
  }

  const handleSearchUsers = async(e: any) => {
    e.preventDefault();
    if(query) {
      const items = await fetchUsers();
      setUsers(items);
    } else {   
      console.log('Your query is empty..')
    }
  }

  const handlePageLimit = (e: any) => {
    const value = e.target.value;
    setLimit(parseInt(value)); 
  }

  useEffect(() => {
    const displayUsersOnChange = async() => {
      if (query) {
        const items = await fetchUsers();
        setUsers(items);
      }
    }
    displayUsersOnChange();
  }, [page, limit]);

  return (
    <div className='container'>
      <div className='search-form'>
        <h2>Github Search User</h2>
        <form>
          <input value={query} onChange={handleQueryInput} type='text' />
          <button onClick={handleSearchUsers}>Search</button>
        </form>
      </div>
      <div className='search-results'>
        <div className="search-results">
          <div className="more-options">
            <label>
              <small>Per Page</small>
              <select onChange={handlePageLimit}>
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </label>
            <div className="pagination">
              <button onClick={handlePrevPage}>{page}</button>
              <button onClick={handleNextPage}>{page + 1}</button>
            </div>
          </div>
          {users ? (
            users.map((user: any) => {
             return <ListUsers user={user} key={user.id} />
            })
          ) : (
            <h2>There is nothing to display..</h2>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home