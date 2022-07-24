import styled from "styled-components";
import { motion, useScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IgetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;

const BigCover = styled.img`
  width: 100%;
`;

const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  font-weight: bold;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  line-height: 1.5;
  word-break: keep-all;
  letter-spacing: 2px;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 60vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

interface IProps {
  movieId?: string;
  data?: IgetMoviesResult;
}

function Modal({ movieId, data }: IProps) {
  const history = useNavigate();
  const { scrollY } = useScroll();
  const onOverlayClick = () => history("/");
  const clickedMovie =
    movieId && data?.results.find((movie) => movie.id + "" === movieId);

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <BigMovie layoutId={movieId} style={{ top: scrollY.get() + 100 }}>
        {clickedMovie && (
          <>
            <BigCover
              src={`${makeImagePath(clickedMovie.backdrop_path, "w500")}`}
            />
            <BigTitle>{clickedMovie.title}</BigTitle>
            <BigOverview>{clickedMovie.overview}</BigOverview>
          </>
        )}
      </BigMovie>
    </>
  );
}
export default Modal;
