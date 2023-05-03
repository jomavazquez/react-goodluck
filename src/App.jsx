import { useState } from 'react';
import ProgressBar from './components/progressBar';
import Spinner from './components/spinner';
import { userNames } from './data/userList';
import jesus from './assets/jesusok.png'
import "./App.css";

const App = () => {

  const [ users, setUsers ] = useState( userNames );
  const [ winners, setWinner ] = useState( [] );
  const [ uiProps, setUiProps ] = useState({
    buttonDisabled: false,
    displayProgressBarr: false,
  });
  const [ error, setError ] = useState({
    processTime: 2000,
    loading: false,
  });

  let randomName;
  const getRandomName = () => {
    return (randomName = users[ Math.floor(Math.random() * userNames.length) ]);
  }

  const handleGetRandomName = () => {

    setUiProps({
      buttonDisabled: true,
      displayProgressBarr: true,
    });

    setTimeout(() => {
      getRandomName();
      if( typeof randomName === "undefined" ){
        setError({ processTime: 750, loading: true });
        handleGetRandomName();
      }else{
        setWinner( [...winners, randomName] );

        const updateNameList = users.filter((user) => user !== randomName);

        setUsers( updateNameList );

        setUiProps({
          buttonDisabled: false,
          displayProgressBarr: false,
        });
        setError({
          processTime: 750,
          loading: false,
        });
      }
    }, error.processTime);
  };

  return (
    <div className="myapp">
      <div className="container">
        <div className="row justify-content-center align-items-center">
        <div className="col-md-4 text-center">
            <ul id="userList">
                {users.map((user, index) => (
                  <li className="list-item" key={index}>
                    {user}
                  </li>
                ))}
              </ul>
          </div>
          <div className="col-md-4 text-center">
            {
              uiProps.displayProgressBarr && <ProgressBar />
            }
            {
              error.loading && <Spinner />
            }
            <button onClick={ handleGetRandomName } disabled={ uiProps.buttonDisabled || users.length === 0 } className="btn btn-primary">
              Good luck!
            </button>
          </div>
          <div className="col-md-4 text-center">
            <h4>The choosen one:</h4>
            <ul className="winners">
                {
                  winners.map( (winner, index) => (
                    <li key={index} className="list-item">
                      { winner }
                    </li>
                  ))
                }
              </ul>
              {
                winners.length > 0 && !uiProps.displayProgressBarr && <img src={ jesus } alt="Jesus" width={ 400 } className="animate__animated animate__shakeX animate__delay-1s" />
              }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;