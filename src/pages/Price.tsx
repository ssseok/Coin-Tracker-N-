import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { IPriceData } from "./Coin";

interface PriceProps {
  tickersData: IPriceData;
}

interface PriceIndicatorProps {
  percentage: number;
  className?: string;
}

const PriceIndicatorStyled = styled(PriceIndicator)<{ percentage: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  font-size: 2rem;
  font-weight: 300;
`;

function PriceIndicator({ percentage, className }: PriceIndicatorProps) {
  return (
    <div className={className}>
      <div>{percentage.toFixed(1)}%</div>
    </div>
  );
}

export default function Price() {
  const { tickersData } = useOutletContext<PriceProps>();

  const quotes = tickersData.quotes.USD;
  const athDate = new Date(quotes.ath_date);
  const athDateString = athDate.toLocaleDateString("ko-KR");
  const athTimeString = athDate.toLocaleTimeString("ko-KR");
  return (
    <GridContainer>
      <BigGridItem>
        <Label>
          {athDateString} {athTimeString}
          <br />
          최고가 달성
        </Label>
        <div>${quotes.ath_price.toFixed(3)}</div>
      </BigGridItem>
      <GridItem>
        <Label>1시간 전보다</Label>
        <PriceIndicatorStyled percentage={quotes.percent_change_1h} />
      </GridItem>
      <GridItem>
        <Label>6시간 전보다</Label>
        <PriceIndicatorStyled percentage={quotes.percent_change_6h} />
      </GridItem>
      <GridItem>
        <Label>12시간 전보다</Label>
        <PriceIndicatorStyled percentage={quotes.percent_change_12h} />
      </GridItem>
      <GridItem>
        <Label>24시간 전보다</Label>
        <PriceIndicatorStyled percentage={quotes.percent_change_24h} />
      </GridItem>
      <GridItem>
        <Label>7일 전보다</Label>
        <PriceIndicatorStyled percentage={quotes.percent_change_7d} />
      </GridItem>
      <GridItem>
        <Label>30일 전보다</Label>
        <PriceIndicatorStyled percentage={quotes.percent_change_30d} />
      </GridItem>
    </GridContainer>
  );
}

const Label = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  opacity: 0.6;
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
`;

const BigGridItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  padding: 1.2rem;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  & > ${Label} {
    line-height: 1.5;
  }
  & > div:last-child {
    font-size: 2rem;
    font-weight: 300;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 6rem;
  gap: 1rem;
`;
