import * as React from 'react';
import {
  Container,
  Content,
  Message,
  Navbar,
  Button,
  Sidebar,
  Sidenav,
  Panel,
  Animation,
} from 'rsuite';
import { ConfigStore } from '../store/ConfigStore';
import DiceRoll from './DiceRoll';
import RankTable from './RankTable';
import Model, { Player } from './GameModel';

const { CurrentViewEnum } = Model;

const GameContainer: React.FunctionComponent = () => {
  const config = React.useContext(ConfigStore);
  const [playerArr, setPlayerArr] = React.useState<Player[]>([]);
  const [show, setShow] = React.useState(true);
  const [tableArr, setTableArr] = React.useState<Player[]>([]);
  const [currPlayerIndex, setCurrPlayerIndex] = React.useState<number>(0);
  const [pointToAccumulate, setPointToAccumulate] = React.useState<
    number | null
  >(null);
  const [currentView, setCurrentView] = React.useState(CurrentViewEnum.DICE);

  React.useEffect(() => {
    if (config && config.NUMBER_OF_PLAYERS && config.POINTS_TO_ACCUMULATE) {
      const shuffled = Array.from({
        length: parseInt(config.NUMBER_OF_PLAYERS, 10),
      })
        .map((_, index) => ({
          sort: Math.random(),
          value: index + 1,
        }))
        .sort((a, b) => a.sort - b.sort)
        .map((a, index) => ({
          id: index + 1,
          name: `Player-${a.value}`,
          score: 0,
          previousRoll: 0,
          currentRoll: 0,
          rollCount: 0,
          skip: false,
          rank: 0,
          prevRank: 0,
        }));
      setPlayerArr(shuffled);
      setTableArr([...shuffled]);
      setPointToAccumulate(parseInt(config.POINTS_TO_ACCUMULATE, 10));
    }
  }, [config]);

  React.useEffect(() => {
    const player = playerArr[currPlayerIndex];
    if (player && player.skip) {
      setTimeout(() => {
        player.skip = false;
        const newArr = [...playerArr];
        setPlayerArr(newArr);
        setCurrPlayerIndex(currPlayerIndex + 1);
      }, 3000);
    }
  }, [currPlayerIndex, playerArr]);

  const handleDieRoll = (num: number) => {
    const person = playerArr[currPlayerIndex];
    person.score += num;
    if (pointToAccumulate && person.score >= pointToAccumulate) {
      setCurrentView(CurrentViewEnum.GAME_OVER);
      return;
    }
    if (person.previousRoll === 1 && num === 1) {
      person.skip = true;
    } else {
      person.rollCount += 1;
      person.skip = false;
    }
    person.previousRoll = person.currentRoll;
    person.currentRoll = num;
    if (person.rollCount > 1) {
      person.prevRank = person.rank;
    }
    if (num !== 6) {
      const newIndex =
        currPlayerIndex === playerArr.length - 1 ? 0 : currPlayerIndex + 1;
      setTimeout(() => {
        setCurrPlayerIndex(newIndex);
        setShow(false);
      }, 1500);
    }
    const newArr = [...playerArr];
    setPlayerArr(newArr);

    playerArr.sort((a, b) => b.score - a.score);
    playerArr.map((item, index: number) => {
      item.rank = index + 1;
      return item;
    });
    setTableArr(playerArr);
  };

  const currentPlayerMessage = () => (
    <Animation.Fade in={show}>
      {(props, ref) => (
        <Message
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          key={currPlayerIndex}
          ref={ref}
          type="info"
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
          }}
          description={`${playerArr[currPlayerIndex]?.name} its your
turn (To roll click the dice).`}
        />
      )}
    </Animation.Fade>
  );

  return (
    <div className="show-container">
      <Container>
        <Sidebar>
          <Sidenav
            expanded
            appearance="subtle"
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <Sidenav.Header>
              <Navbar appearance="inverse">
                <Navbar.Header>
                  <Button appearance="link" className="navbar-brand">
                    Dice Game
                  </Button>
                </Navbar.Header>
              </Navbar>
            </Sidenav.Header>
            <Sidenav.Body
              style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
            >
              <Panel
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
                shaded
              >
                {currentPlayerMessage()}
                <DiceRoll
                  player={playerArr[currPlayerIndex]}
                  onDiceRollComplete={handleDieRoll}
                />
              </Panel>
            </Sidenav.Body>
          </Sidenav>
        </Sidebar>
        <Container
          style={{
            height: '100vh',
          }}
        >
          <Content>
            {currentView === CurrentViewEnum.DICE ? (
              <div
                style={{
                  margin: '0px 1rem 0px 1rem',
                }}
              >
                <RankTable data={tableArr} sortColumn="score" />
              </div>
            ) : null}
            {currentView === CurrentViewEnum.GAME_OVER ? (
              <Panel
                header={`Congrtulations - ${playerArr[currPlayerIndex]?.name}`}
                shaded
                style={{
                  margin: '0px 1rem 0px 1rem',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    margin: '2rem',
                  }}
                >
                  <Message
                    type="success"
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                    description="You won the game 👏👏👏."
                  />
                </div>
              </Panel>
            ) : null}
          </Content>
        </Container>
      </Container>
    </div>
  );
};

export default GameContainer;
