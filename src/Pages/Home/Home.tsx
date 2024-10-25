import { useSelector } from 'react-redux';
import { TRootState } from '../../Store/BigPie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TCard } from '../../Types/TCard';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Home = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  const nav = useNavigate();
  const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);
  const user = useSelector((state: TRootState) => state.UserSlice);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
    setCards(res.data);
  };

  const searchCards = () =>
    cards.filter((item) => item.title.toLowerCase().includes(searchWord.toLowerCase()));

  const toggleLike = async (card: TCard) => {
    try {
      const res = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`
      );

      if (res.status === 200) {
        const updatedCard = res.data;
        setCards(cards.map((c) => (c._id === updatedCard._id ? updatedCard : c)));
        toast.success('Card liked/unliked successfully');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to toggle like');
    }
  };

  return (
    <>
      <main className='bg-blue-300'
        style={{ padding: '10px', textAlign: 'center' }}>
        <h1 style={{ textAlign: 'left', fontSize: '100px' }}>Cards Page</h1>
        <p style={{ textAlign: 'left', fontSize: '40px' }}>Here you can find busines cards from all categories</p>
        <hr className='my-6 border-t-2 border-black ' />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '5px' }}>
          {searchCards().map((card, index) => (
            <div
              key={index}
              style={{ border: '1px solid black', padding: '5px', width: '465px', background: 'white' }}
            >
              <img
                src={card.image.url}
                alt={card.image.alt}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                onClick={() => nav(`/card/${card._id}`)}
                onError={(e) => {
                  e.currentTarget.src = require('../../Media/IDK.png');
                }}
              />
              <h1>{card.title}</h1>
              <p>{card.subtitle}</p>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                {user?.user && (
                  <>
                    <FaHeart
                      size={20}
                      style={{ cursor: 'pointer', color: card.likes.includes(user.user._id) ? 'red' : 'black' }}
                      onClick={() => toggleLike(card)}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
