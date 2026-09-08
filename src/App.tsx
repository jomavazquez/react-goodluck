import { useState, useCallback, useEffect, useRef } from "react";
import { userNames } from "./data/users";
import { ProgressBar, UserList, WinnerList } from "./components";
import "./App.css";

const PICK_DELAY_MS = 2000;

const App = () => {
  const [ remaining, setRemaining ] = useState<string[]>(userNames);
  const [ winners, setWinners ] = useState<string[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const pickTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => clearTimeout(pickTimeoutRef.current), []);

  const pickWinner = useCallback((pool: string[], delay: number) => {
    setIsLoading(true);

    pickTimeoutRef.current = setTimeout(() => {
      const index = Math.floor(Math.random() * pool.length);
      const picked = pool[index];

      setWinners((prev) => [...prev, picked]);
      setRemaining((prev) => prev.filter((u) => u !== picked));
      setIsLoading(false);
    }, delay);
  }, []);

  const handlePick = () => {
    if( isLoading || remaining.length === 0 ) return;
    pickWinner(remaining, PICK_DELAY_MS);
  };

  const handleReset = () => {
    clearTimeout(pickTimeoutRef.current);
    setRemaining(userNames);
    setWinners([]);
    setIsLoading(false);
  };

  return (
    <div className="myapp">
      <div className="container">
        <div className="row">
          <UserList users={ remaining } />
          <div className="col-md-4 text-center">
            <div aria-live="polite">
              { isLoading && <ProgressBar /> }
            </div>
            <div className="button-group">
              <button
                onClick={ handlePick }
                disabled={ isLoading || remaining.length === 0 }
                aria-busy={ isLoading }
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