import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";


const Favorites = () => {
  const [cards, setCards] = useState<TCard[]>([])
  const nav = useNavigate()
  const searchWord = useSelector((state: TRootState) => state.SearchSlice.search)
  console.log(searchWord);

  const searchCards = () => {
    return cards.filter((item) => item.likes.includes(user.user!._id)).filter((item: TCard) => item.title.includes(searchWord))
  }


  const isLikedCard = (card: TCard) => {
    if (user && user.user) {
      return card.likes.includes(user.user?._id)
    } else return false
  }
  const navToCard = (id: string) => {
    nav('/card/' + id)
  }

  const getData = async () => {
    const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards')
    setCards(res.data)
  }

  const likeUnlikeCard = async (card: TCard) => {
    const res = await axios.patch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/' + card._id)
    if (res.status = 200) {
      toast.success('card liked/unliked')

      const index = cards.indexOf(card)
      const ifLiked = cards[index].likes.includes(user.user!._id)
      const newCards = [...cards]
      if (ifLiked) {
        newCards[index].likes.splice(index)
      } else {
        newCards[index].likes.push(user.user!._id)
      }
      setCards(newCards)
    }
  }

  useEffect(() => {
    getData()

    return () => { }
  }, [])

  const user = useSelector(
    (state: TRootState) => state.UserSlice,
  );


  return (
    <div
      className="flex flex-col items-center bg-blue-300">
      <h1 className="text-7xl">Favorites</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '5px', textAlign: 'center' }}>
        {searchCards()!.map((item: TCard) => {
          return (
            <Card key={item._id}
              style={{ border: '1px solid black', width: '465px', background: 'white', borderRadius: '0' }}>
              <div onClick={() => navToCard(item._id)} >
                <img src={item.image.url} alt={item.image.alt}
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                <h1>{item.title}</h1>
                <h3>{item.subtitle}</h3>
                <p>{item.description}</p>
              </div>
              <hr />
              {user && user.user && (
                <FaHeart className="m-auto cursor-pointer size-5"
                  color={isLikedCard(item) ? 'red' : 'black'}
                  onClick={() => likeUnlikeCard(item)}
                />)}

            </Card>
          )
        })}
      </div>
    </div>
  );
};

export default Favorites;
