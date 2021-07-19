/* eslint-disable react/prop-types */
import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactDice from 'react-dice-complete';
import { Message } from 'rsuite';
import { Player } from './GameModel';

interface IDiceRollProps {
  onDiceRollComplete: (num: number) => void;
  player: Player;
}

const DiceRoll: React.FunctionComponent<IDiceRollProps> = ({
  onDiceRollComplete,
  player,
}) => {
  const [num, setNum] = React.useState<number>(0);

  React.useEffect(() => {
    if (num !== 6) setNum(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  const rollDoneCallback = (score: number) => {
    setNum(score);
    onDiceRollComplete(score);
  };

  return (
    <div
      style={{
        textAlign: 'center',
        margin: '2rem',
      }}
    >
      {player && player.skip ? (
        <Message
          title="😬 Oops!"
          type="warning"
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
          }}
          description=" You rolled 1 twice so you are penalised 1 roll. Loading next user."
        />
      ) : (
        <>
          <div
            style={{
              overflow: 'hidden',
            }}
          >
            <ReactDice
              numDice={1}
              faceColor="#00fffb"
              dotColor="#196c39"
              rollDone={rollDoneCallback}
              disableIndividual={num > 0 && num < 6}
              rollTime={2}
              defaultRoll={3}
            />
          </div>
          {num === 6 ? (
            <Message
              title="🎉 Yay !"
              type="success"
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
              }}
              description=" You rolled a six. You get an additional roll."
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default DiceRoll;
