import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMovies, IgetMoviesResult } from "../api";

const Wrapper = styled.div``;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const { data, isLoading } = useQuery<IgetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  console.log(data, isLoading);
  return <Wrapper>{isLoading ? <Loader>Loading...</Loader> : null}</Wrapper>;
}
export default Home;
