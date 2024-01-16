import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { FaGithub } from 'react-icons/fa';
import { UserInfo } from './UserInfo';
import { UserNotFound } from './UserNotFound';
import './index.css';
import { HistoryUser } from './HistoryUser';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  useEffect(() => {
    document.title = 'GITHUB USER';
  }, []);

  const [user, setUser] = useState('');
  const [gitUser, setGitUser] = useState({});
  const [searching, setSearching] = useState(null);
  const [searched, setSearched] = useState(false);
  const [userNotFound, setUserNotFound] = useState(true);
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [historyList, setHistoryList] = useState([]); // State to store the list of searched users

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = (e) => {
    e.preventDefault();
    setSearching(true);

    if (user.trim() === '') {
      setSearching(false);
      return;
    }

    axios
      .get(`https://api.github.com/users/${user}`)
      .then((response) => {
        setGitUser(response.data);
        setUserNotFound(true);
        setPass(user);

        // Add the user to the history list
        if (!historyList.some((historyUser) => historyUser.id === response.data.id)) {
          setHistoryList((prevList) => [
            ...prevList,
            { id: response.data.id, login: response.data.login, link: response.data.html_url },
          ]);
        }
      })
      .catch(() => {
        setUserNotFound(false);
      })
      .finally(() => {
        setUser('');
        setSearching(false);
        setSearched(true);
      });
  };

  const deleteFromHistory = (userId) => {
    setHistoryList((prevList) => prevList.filter((user) => user.id !== userId));
  };

  return (
    <>
      <HistoryUser handleClose={handleClose} show={show} historyList={historyList} deleteFromHistory={deleteFromHistory} />
      <UserNotFound userNotFound={userNotFound} />
      <div style={{ display: 'flex', alignContent: 'center' }} className='outter-div'>
        <div className='rht-section'>
          <FaGithub size={50} />
          <h1 style={{ marginLeft: '10px' }} className='header-title'>
            Github
          </h1>
        </div>
        <div className='mdl-section'>
          <form className='my-form' onSubmit={submit}>
            <input
              type='search'
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder='Search user'
              className='search-bar'
            />
            <button>Search</button>
          </form>
        </div>
        <div className='lft-section'>
          <button style={{ height: '50px' }} onClick={handleShow}>
            Search history
          </button>
        </div>
      </div>
      {searching ? (
        <div>LOADING.....</div>
      ) : (
        <UserInfo gitUser={gitUser} searched={searched} userNotFound={userNotFound} />
      )}
    </>
  );
}

export default App;

