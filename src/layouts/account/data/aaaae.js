import React from 'react';
import styled from 'styled-components';

// Sample data based on your specifications
const OverView = { Finished: 68, InProgress: 11, UnStarted: 21 };
const Collaborators = 4;
const DailyAverage = 51;
const WeekAdvancement = { Mon: 1200, Tue: 800, Wed: 900, Fri: 600, Sat: 700, Sun: 300 };
const DaysLeft = 96;
const Date = "26th Nov 2024";
const Description = "Based on the monthly average number ........";
const Collaborators2 = 12;
const DailyAverage2 = 48;

// Styled Components
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  background-color: #fafafa;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 1.2em;
  margin-bottom: 15px;
  color: #333;
`;

const ProgressRing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Chart = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: conic-gradient(
    #4caf50 ${OverView.Finished * 3.6}deg,
    #ffc107 ${OverView.Finished * 3.6}deg ${OverView.InProgress * 3.6 + OverView.Finished * 3.6}deg,
    #f44336 ${OverView.InProgress * 3.6 + OverView.Finished * 3.6}deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
`;

const WeekChart = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const Bar = styled.div`
  width: 10%;
  height: ${props => props.height}px;
  background-color: #4caf50;
`;

const Text = styled.p`
  font-size: 0.9em;
  color: #666;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

// React Component
const aaaae = () => {
  return (
    <Container>
      {/* Overview Card */}
      <Card>
        <Title>Overview</Title>
        <ProgressRing>
          <Chart>{OverView.Finished}%</Chart>
          <Text>Finished - {OverView.Finished}%</Text>
          <Text>In Progress - {OverView.InProgress}%</Text>
          <Text>Unstarted - {OverView.UnStarted}%</Text>
        </ProgressRing>
      </Card>

      {/* Collaborators Card */}
      <Card>
        <Title>Collaborators</Title>
        <Text>Working today</Text>
        <Stats>
          <div>
            <h1>{Collaborators}</h1>
          </div>
          <Text style={{ color: '#f44336' }}>-70%</Text>
        </Stats>
      </Card>

      {/* Daily Average Card */}
      <Card>
        <Title>Daily Average</Title>
        <Stats>
          <h1>{DailyAverage}</h1>
          <Text style={{ color: '#4caf50' }}>+8%</Text>
        </Stats>
        <Text>Duplicates processed per collaborator</Text>
      </Card>

      {/* Estimated Remaining Time Card */}
      <Card>
        <Title>Estimated remaining time</Title>
        <h1 style={{ color: '#f44336' }}>{DaysLeft} Days left</h1>
        <Text>{Date}</Text>
        <Text>{Description}</Text>
        <Stats>
          <Text>Monthly average</Text>
          <div>
            <Text>Collaborators: {Collaborators2}</Text>
            <Text>Average: {DailyAverage2}</Text>
          </div>
        </Stats>
      </Card>

      {/* Week Advancement Chart */}
      <Card>
        <Title>Week advancement</Title>
        <h1>+ {Object.values(WeekAdvancement).reduce((a, b) => a + b, 0)}</h1>
        <Text style={{ color: '#4caf50' }}>+14%</Text>
        <WeekChart>
          {Object.entries(WeekAdvancement).map(([day, value]) => (
            <Bar key={day} height={value / 10}>
              <Text>{day}</Text>
            </Bar>
          ))}
        </WeekChart>
      </Card>
    </Container>
  );
};

export default aaaae;
