import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { isDarkAtom } from "../atoms";
import useAxios from "../util/useAxios";

export default function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);

  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useAxios("https://api.coinpaprika.com/v1/coins");

  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>현석 코인샵</Title>
        <ToggleBtn onClick={toggleDarkAtom} toggle={isDark}>
          <Circle toggle={isDark} />
        </ToggleBtn>
      </Header>
      {isLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Link
              to={`/${coin.id}`}
              state={{ name: coin.name, id: coin.id }}
              key={coin.id}
            >
              <Coin>
                <CoinWrap>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  />
                  {coin.name} &rarr;
                </CoinWrap>
              </Coin>
            </Link>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
const Container = styled.div`
  padding: 0 10px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  /* border: 2px solid ${(props) => props.theme.cardColor}; */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 15px;
  transition: color 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
  cursor: pointer;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const CoinWrap = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;

const ToggleBtn = styled.button<{ toggle: boolean }>`
  width: 130px;
  height: 50px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    !props.toggle ? props.theme.cardColor : props.theme.textColor};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
const Circle = styled.div<{ toggle: boolean }>`
  background-color: ${(props) =>
    !props.toggle ? props.theme.bgColor : props.theme.bgColor};
  width: 38px;
  height: 38px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle &&
    css`
      transform: translate(80px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;
