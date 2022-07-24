import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { IgetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Slide = styled.div`
  position: relative;
  top: -100px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  position: relative;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Button = styled(motion.button)`
  position: absolute;
  height: 200px;
  font-size: 32px;
  padding: 0 15px;
  top: 49px;
  border: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  cursor: pointer;
  &:first-child {
    left: 0;
  }
  &:last-child {
    right: 0;
  }
`;

const rowVariants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth + 5 : window.outerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: !isBack ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
};

const boxVariants = {
  nomal: {
    scale: 1,
  },
  hover: {
    zIndex: 99,
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.6,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.6,
      type: "tween",
    },
  },
};

interface IProps {
  data: IgetMoviesResult;
}

const offset = 6;

function Slider({ data }: IProps) {
  const history = useNavigate();
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history(`movies/${movieId}`);
  };

  const incraseIndex = () => {
    if (data) {
      setBack(false);
      if (leaving) return;
      setLeaving(true);
      const totalMoives = data.results.length - 1;
      const maxIndex = Math.floor(totalMoives / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decraseIndex = () => {
    if (data) {
      setBack(true);
      if (leaving) return;
      setLeaving(true);
      const totalMoives = data.results.length - 1;
      const maxIndex = Math.floor(totalMoives / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  return (
    <Slide>
      <Title>최신 영화</Title>
      <AnimatePresence
        initial={false}
        onExitComplete={toggleLeaving}
        custom={back}
      >
        <Row
          variants={rowVariants}
          custom={back}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <Box
                layoutId={movie.id + ""}
                variants={boxVariants}
                whileHover="hover"
                initial="nomal"
                transition={{ type: "tween" }}
                key={movie.id}
                $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                onClick={() => onBoxClicked(movie.id)}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
      <Button onClick={decraseIndex}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </Button>
      <Button onClick={incraseIndex}>
        <FontAwesomeIcon icon={faAngleRight} />
      </Button>
    </Slide>
  );
}
export default Slider;
