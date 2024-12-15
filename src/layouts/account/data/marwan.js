import React from 'react';
import styled from 'styled-components';
import { Card, Statistic } from 'antd';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { UserOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';

// Data for charts
const OverViewData = [
  { name: 'Finished', value: 68, color: '#00C49F' },
  { name: 'In Progress', value: 11, color: '#FFBB28' },
  { name: 'Unstarted', value: 21, color: '#FF8042' }
];

const WeekAdvancementData = [
  { day: 'Mon', value: 1000 },
  { day: 'Tue', value: 600 },
  { day: 'Wed', value: 450 },
  { day: 'Thu', value: 800 },
  { day: 'Fri', value: 550 },
  { day: 'Sat', value: 600 },
  { day: 'Sun', value: 250 }
];

// Container with responsive grid layout
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  gap: 20px;
  padding: 24px;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

// Row Container for Collaborators and Daily Average
const TopRowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

// Styled Card with enhanced styles
const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  background: #fff;
  min-height: 200px; // Consistent height

  .ant-card-head-title {
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }
`;

// Overview Chart Wrapper with enhancements
const PieChartWrapper = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  margin: 0 auto; // Center the pie chart
`;

// Statistic Overlay for Pie Chart
const StatisticOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

// Label Styles for better readability
const LabelsWrapper = styled.div`
  margin-top: 10px;
  text-align: center;

  p {
    margin: 5px 0; // Adjust margin for better spacing
  }
`;

// Daily Average and Estimated Remaining Time Icon Container
const IconContainer = styled.div`
  font-size: 36px; // Increased font size for icons
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

// Main Dashboard Component
const Marwan = () => {
  return (
    <Container>
      {/* Overview and Week Advancement Cards */}
      <StyledCard title="Overview" style={{ gridColumn: '1' }}>
        <PieChartWrapper>
          <PieChart width={130} height={130}>
            <Pie
              data={OverViewData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={65}
              paddingAngle={5}
              stroke="none"
            >
              {OverViewData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <StatisticOverlay>{OverViewData[0].value}%</StatisticOverlay>
        </PieChartWrapper>
        <LabelsWrapper>
          {OverViewData.map(item => (
            <p key={item.name} style={{ color: item.color }}>
              {item.name} - {item.value}%
            </p>
          ))}
        </LabelsWrapper>
      </StyledCard>

      <StyledCard title="Week Advancement" style={{ gridColumn: '1' }}>
        <Statistic
          value={4732}
          suffix=" this week"
          valueStyle={{ fontSize: '24px', color: '#333', fontWeight: 'bold' }}
        />
        <p style={{ color: '#4caf50', fontWeight: 'bold' }}>+14%</p>
        <BarChart width={280} height={150} data={WeekAdvancementData}>
          <XAxis dataKey="day" />
          <Tooltip />
          <Bar dataKey="value" fill="#00C49F" />
        </BarChart>
      </StyledCard>

      {/* Row for Collaborators and Daily Average */}
      <TopRowContainer>
        {/* Collaborators Card */}
        <StyledCard title="Collaborators">
          <IconContainer>
            <UserOutlined />
          </IconContainer>
          <Statistic value={4} valueStyle={{ fontSize: '26px', color: '#333' }} />
          <p style={{ color: '#f44336', fontWeight: 'bold' }}>-70%</p>
          <p>Working today</p>
        </StyledCard>

        {/* Daily Average Card */}
        <StyledCard title="Daily Average">
          <IconContainer>
            <ClockCircleOutlined />
          </IconContainer>
          <Statistic value={53} valueStyle={{ fontSize: '26px', color: '#333' }} />
          <p style={{ color: '#4caf50', fontWeight: 'bold' }}>+8%</p>
          <p>Duplicates processed per collaborator</p>
        </StyledCard>
      </TopRowContainer>

      {/* Estimated Remaining Time Card */}
      <StyledCard title="Estimated Remaining Time">
        <IconContainer>
          <CalendarOutlined />
        </IconContainer>
        <Statistic
          value="96"
          suffix="Days left"
          valueStyle={{ fontSize: '24px', color: '#f44336' }}
        />
        <p style={{ fontSize: '16px', color: '#333' }}>26th Nov 2024</p>
        <p style={{ color: '#555' }}>
          Based on monthly averages of collaborators and duplicates processed per collaborator
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UserOutlined style={{ marginRight: 5 }} /> <span>12</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ClockCircleOutlined style={{ marginRight: 5 }} /> <span>48</span>
          </div>
        </div>
      </StyledCard>
    </Container>
  );
};

export default Marwan;
