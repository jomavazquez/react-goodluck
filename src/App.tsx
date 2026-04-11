import { useState, useCallback } from "react";
import { userNames } from "./data/userList";
import { ProgressBar, Spinner, UserList, WinnerList } from "./components";
import "./App.css";

const PICK_DELAY_MS = 2000;
const RETRY_DELAY_MS = 750;

const App = () => {
  const [ remaining, setRemaining ] = useState<string[]>(userNames);
  const [ winners, setWinners ] = useState<string[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isRetrying, setIsRetrying ] = useState(false);

  const pickWinner = useCallback((pool: string[], delay: number) => {
    setIsLoading(true);

    setTimeout(() => {
      if (pool.length === 0) return;

      const index = Math.floor(Math.random() * pool.length);
      const picked = pool[index];

      if (picked === undefined) {
        setIsRetrying(true);
        pickWinner(pool, RETRY_DELAY_MS);
        return;
      }

      setIsRetrying(false);
      setWinners((prev) => [...prev, picked]);
      setRemaining((prev) => prev.filter((u) => u !== picked));
      setIsLoading(false);
    }, delay);
  }, []);

  const handlePick = () => {
    if (isLoading || remaining.length === 0) return;
    pickWinner(remaining, PICK_DELAY_MS);
  };

  const handleReset = () => {
    setRemaining(userNames);
    setWinners([]);
    setIsLoading(false);
    setIsRetrying(false);
  };

  return (
    <div className="myapp">
      <div className="container">
        <div className="row">
          <UserList users={ remaining } />
          <div className="col-md-4 text-center">
            { isLoading && <ProgressBar /> }
            { isRetrying && <Spinner /> }
            <div className="button-group">
              <button
                onClick={ handlePick }
                disabled={ isLoading || remaining.length === 0 }
                className="btn btn-primary"
              >
                {
                  isLoading ? 'Picking…' : 'Good luck!'
                }
              </button>
              {
                winners.length > 0 && !isLoading && (
                <button className="btn btn-secondary" onClick={handleReset}>
                  Reset
                </button>
              )}
            </div>
          </div>
          <WinnerList winners={ winners } isLoading={ isLoading } />
        </div>
      </div>
    </div>
  );
};

export default App;