/* eslint-disable react/prop-types */
import * as React from 'react';
import { Table, Panel } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

interface IRankTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  sortColumn?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RankCell = ({ rowData, dataKey, rowIndex, ...props }: any) => {
  // const { prevRank, rank } = rowData;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Cell {...props}>
      <span
        style={{
          paddingLeft: '0.5rem',
        }}
      >
        {rowIndex + 1}
      </span>
      {/* {prevRank > rank && prevRank ? (
        <Icon
          icon="arrow-up-line"
          style={{
            color: 'green',
          }}
        />
      ) : null}
      {prevRank < rank && prevRank ? (
        <Icon
          icon="arrow-down-line"
          style={{
            color: 'red',
          }}
        />
      ) : null} */}
    </Cell>
  );
};

const RankTable: React.FunctionComponent<IRankTableProps> = ({
  data,
  sortColumn,
}) => {
  return (
    <Panel header="Leaderboard" shaded>
      <Table virtualized height={400} data={data} sortColumn={sortColumn}>
        <Column flexGrow={1}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Score</HeaderCell>
          <Cell dataKey="score" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Rank</HeaderCell>
          <RankCell dataKey="rank" />
        </Column>
      </Table>
    </Panel>
  );
};

export default RankTable;
