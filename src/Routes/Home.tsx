import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router";
import styled from "styled-components";
import { getMovies, IgetMoviesResult } from "../api";
import Slider from "../components/Slider";
import Modal from "../components/Modal";
import { makeImagePath } from "../utils";

const Wrapper = styled.div``;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68em;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30em;
  width: 50%;
  line-height: 1.5em;
  text-shadow: 2px 2px 4px gray;
`;

function Home() {
  const bigMovieMatch: PathMatch<string> | null = useMatch("movies/:movieId");
  const { data, isLoading } = useQuery<IgetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          {data && <Slider data={data} />}
          <AnimatePresence>
            {bigMovieMatch && (
              <Modal movieId={bigMovieMatch.params.movieId} data={data} />
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
