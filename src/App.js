import './App.css';
import Score from './components/Score';
import Card from './components/Card';
import {
  dublicateItems,
  duplicatesSelector,
  suffleItems,
  resetGame,
  matchedSelector
} from './redux/cardSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const items = useSelector(duplicatesSelector);
  const matched = useSelector(matchedSelector);

  useEffect(() => {
    dispatch(dublicateItems());
    dispatch(suffleItems());
  }, [dispatch]);

  const handleReset = () => {
    dispatch(resetGame());
    dispatch(dublicateItems());
    dispatch(suffleItems());
  };

  return (
    <div className="App">
      <Score />
      <div className='playground'>
        {
          items.map((item) => (
            <Card key={item.id} item={item} />
          ))
        }
      </div>
      {
        items.length === matched.length &&
        <div className='reset-game'>
          <button
            className='reset-btn'
            onClick={() => handleReset()}
          >Play Again</button>
        </div>
      }
    </div>
  );
}

export default App;
