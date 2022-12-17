import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import useAxios from "../util/useAxios";

export default function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useAxios("https://api.coinpaprika.com/v1/coins");

  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
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
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  border: 2px solid ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  transition: color 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Title = styled.h1`
  font-size: 48px;
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
