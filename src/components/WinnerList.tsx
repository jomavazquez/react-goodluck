import jesus from "../assets/jesusok.png";

interface WinnerListProps {
  winners: string[];
  isLoading: boolean;
}

export const WinnerList = ({ winners, isLoading }: WinnerListProps) => (
  <div className="col-md-4 text-center">
    <h4>The choosen one:</h4>
    <ul className="winners">
      {
        winners.map((winner, index) => (
            <li key={winner} className="list-item">
                { index === winners.length - 1 && <span>👑 </span> }
                { winner }
            </li>
        ))
    }
    </ul>
    {
        winners.length > 0 && !isLoading && (
        <img
            src={ jesus }
            alt="Jesus"
            width={ 400 }
            className="animate__animated animate__shakeX animate__delay-1s"
        />
        )
    }
  </div>
);