import styled from 'styled-components';
import { achievements } from '../../data/Data';

const Container = styled.div`
  background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 98%, 0 100%);
  padding: 50px 0;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 10px 0px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    font-size: 32px;
    margin-top: 12px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
    margin-top: 12px;
  }
`;

const AchievementCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 32px;
  width: 60%;
  max-width: 1000px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  transition: transform 0.2s ease-in-out;
  margin-top: 40px;
  &:hover {
    transform: scale(1.05);
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
  width: 80%;
  }
`;

const AchievementImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const AchievementTitle = styled.h3`
  font-size: 24px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
  margin-bottom: 10px;
`;

const AchievementDesc = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  max-width: 900px;
`;

const Achievements = () => {
  return (
    <Container id="achievements">
      <Wrapper>
        <Title>Achievements</Title>
        <Desc>
          Here Are Some Of My Proudest Accomplishments.
        </Desc>

        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id}>
            <AchievementImage src={achievement.image} alt={achievement.title} />
            <AchievementTitle>{achievement.title}</AchievementTitle>
            <AchievementDesc>{achievement.description}</AchievementDesc>
          </AchievementCard>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Achievements;