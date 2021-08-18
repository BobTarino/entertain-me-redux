import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Container, Col } from 'react-bootstrap';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import { SAVE_GAME, ADD_POST } from '../../utils/mutations';
import { GAME_API_QUERY, QUERY_SELF }from '../../utils/queries';
import TrailerModal from '../TrailerModal';
import Auth from '../../utils/auth';
import { GiPunchBlast, GiAudioCassette, GiAxeSword, GiChessRook, GiBrain, GiCard2Hearts, GiFamilyHouse, GiVrHeadset, GiSteeringWheel, GiHighKick, GiFloatingPlatforms } from "react-icons/gi";
import { FaDiceD20, FaCrosshairs, FaPuzzlePiece, FaChessBoard, FaHeadset, FaPlaystation, FaXbox, FaMouse } from "react-icons/fa";
import { BiCool, BiGame } from "react-icons/bi";
import { IoAmericanFootballSharp } from "react-icons/io5";
import { SiNintendoswitch } from "react-icons/si";

// will need to change this to match new API
const SearchMedia = () => {
    let imgLink = "https://image.tmdb.org/t/p/w500";
    const [gameTrailerModal, setgameTrailerModal] = useState(false);
    const [trailerModalTitle, setTrailerModalTitle] = useState('');
    const [searchedMedia, setSearchedMedia] = useState([]);
    const [savedMedia, setSavedMedia] = useState({});

    const [getGenre, { loading, data }] = useLazyQuery(GAME_API_QUERY);
    
    const [savegame] = useMutation(SAVE_GAME);
    const [createPost] = useMutation(ADD_POST);
    
    useEffect(() => {
        if (data) {
            let gameData = data.game.map((game) => ({
                gameId: game.id,
                gameName: game.name,
                gameRating: game.rating,
                gamePoster: imgLink + game.background_image
            }));
            setSearchedMedia(gameData) 
        }
    }, [data, imgLink]);

    if (loading) {
        return <div>Loading...</div>
    }

    const handleSaveMedia = async (gameId) => {
        const gameToSave = searchedMedia.find((media) => media.gameId === gameId);
        
        try {
            await savegame({
                variables: {
                    gameId: gameToSave.gameId,
                    gameName: gameToSave.gameName,
                    gamePoster: gameToSave.gamePoster,
                    gameRating: gameToSave.gameRating
                }
            })

            await createPost({
                variables: {
                  postText: ` saved ${gameToSave.gameName} to their favorite games!`  
                }
            })

            setSavedMedia([...savedMedia, gameToSave.gameId])
            } catch (err) {
                console.error(err);
            }
    };

    return (
        <div class="return-data">
            <Container>
                <Row fluid>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { } }) }}
                        ><FaPlaystation />  Playstation</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { } }) }}
                        ><FaXbox />  XBOX </button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { } }) }}
                        ><FaMouse />  PC</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { } }) }}
                        ><SiNintendoswitch />  Nintendo</button>
                    </Col>
                </Row>
            </Container>
            <br />
            <br />
            <Container>
                <Row fluid>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "action" }})}}
                        ><GiPunchBlast /> Action</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "indie"}})}}
                        ><GiAudioCassette/> Indie</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "adventure" }})}}
                         ><GiAxeSword /> Adventure</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "role-playing-games-rpg" }})}}
                         ><FaDiceD20 /> RPG</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "strategy" }})}}
                         ><GiChessRook /> Strategy</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "shooter" }})}}
                         ><FaCrosshairs /> FPS/Shooter</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "casual" }})}}
                         ><BiCool /> Casual</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "simulation" }})}}
                         ><GiVrHeadset /> Simulation</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "puzzle" }})}}
                         ><FaPuzzlePiece /> Puzzle</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "arcade" }})}}
                         ><BiGame/> Arcade</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "platformer" }})}}
                         ><GiFloatingPlatforms /> Platformer</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "racing" }})}}
                         ><GiSteeringWheel /> Racing</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "massively-multiplayer" }})}}
                         ><FaHeadset /> MMO</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "sports" }})}}
                         ><IoAmericanFootballSharp /> Sports</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "fighting" }})}}
                         ><GiHighKick /> Fighting</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "family" }})}}
                         ><GiFamilyHouse /> Family</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "board-games" }})}}
                         ><FaChessBoard/> Board Games</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "educational" }})}}
                         ><GiBrain /> Education</button>
                    </Col>
                    <Col>
                        <button onClick={() => { getGenre({ variables: { genre: "card" }})}}
                         ><GiCard2Hearts /> Card</button>
                    </Col>
                </Row>
                <Row>
                    {searchedMedia.map((games) => {
                        return (
                            <Col sm={3}>
                                <Card key={games.gameId} style={{ width: '18rem' }}>
                                    <Card.Img src={games.gamePoster} alt={`The poster for ${games.gameName}`} variant="top" />
                                    <Card.Body className="card-body">
                                        <Card.Title>{games.gameName}</Card.Title>
                                        <Card.Text>Rating: {games.gameRating}</Card.Text>
                                        {Auth.loggedIn() && (
                                            <Button variant="primary" onClick={() => {handleSaveMedia(games.gameId); }}>Save to your favorites!</Button>
                                        )}
                                        <Button variant="primary" onClick={() => {setgameTrailerModal(true)
                                         setTrailerModalTitle(games.gameName + " game Trailer"); }}
                                        >Watch a trailer!</Button>
                                    </Card.Body>
                                </Card>
                            </Col>   
                        )   
                    })}  
                </Row>
            </Container>
            <TrailerModal
                gameTrailerModal={gameTrailerModal}
                setgameTrailerModal={setgameTrailerModal}
                trailerModalTitle={trailerModalTitle}
                setTrailerModalTitle={setTrailerModalTitle}
            ></TrailerModal>    
        </div>
    );
};

export default SearchMedia;