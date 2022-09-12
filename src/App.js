import {useEffect, useState} from 'react';
import './App.css';
import Card from './components/Card';

const cardImages = [
    {
        "src": "/img/helmet-1.png",
        matched: false
    }, {
        "src": "/img/potion-1.png",
        matched: false
    }, {
        "src": "/img/ring-1.png",
        matched: false
    }, {
        "src": "/img/scroll-1.png",
        matched: false
    }, {
        "src": "/img/shield-1.png",
        matched: false
    }, {
        "src": "/img/sword-1.png",
        matched: false
    }
];
function App() {

    const [cards,
        setCards] = useState([]);
    const [turns,
        setTurns] = useState(0);
    const [choiseOne,
        setchoiseOne] = useState(null);
    const [choiseTwo,
        setchoiseTwo] = useState(null);
    const [disabled,
        setDisabled] = useState(false);

    //duplicate card function
    const shuffleCards = () => {

        const shuffledCards = [
            ...cardImages,
            ...cardImages
        ].sort(() => Math.random() - 0.5).map((card) => ({
            ...card,
            id: Math.random()
        }));

        setCards(shuffledCards);
        setTurns(0);
        console.log(cards, turns);

    }

    
    const handleChoice = (card) => {

        choiseOne ? setchoiseTwo(card) : setchoiseOne(card)

    }
 
    useEffect(() => {

        if (choiseOne && choiseTwo) {
            setDisabled(true);

            if (choiseOne.src === choiseTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiseOne.src) {
                            return {
                                ...card,
                                matched: true
                            }
                        } else {
                            return card
                        }
                    })
                })
                resetTurn();
            } else {
                // console.log('Try again!');
                setTimeout(() => resetTurn(), 500);
            }
        }
    }, [choiseOne, choiseTwo])

    const resetTurn = () => {
        setchoiseOne(null);
        setchoiseTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);

    }
    return (
        <div className="App">
            <h1>Memory Cards
                <br/>
                <span>👁 👁</span>
            </h1>
            <button onClick={shuffleCards}>New Game</button>
            <div className="card-grid">
                {cards.map(card => (< Card card = {card}
                    key = {card.id}
                    handleChoice = {handleChoice}
                    flipped = {card === choiseOne || card === choiseTwo || card.matched}
                    disabled = {disabled} />
                    ))}
            </div>
        </div>
    );
}

export default App;