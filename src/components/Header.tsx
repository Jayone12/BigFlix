import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 1px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const logoVariants = {
  nomal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("tv");
  const { scrollY } = useScroll();
  const history = useNavigate();

  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY]);
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log(data);
    history(`/search/?keyword=${data.keyword}`);
  };

  return (
    <Nav variants={navVariants} animate={navAnimation} initial="top">
      <Col>
        <Logo
          variants={logoVariants}
          initial="nomal"
          whileHover="active"
          width="81"
          height="20"
          viewBox="0 0 81 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path d="M5.07779 18.5226C5.75345 18.4719 6.44937 18.3456 7.1649 18.146C7.90828 17.9431 8.53357 17.664 9.01681 17.2923L9.01892 17.2907C9.52395 16.8979 9.9211 16.3666 10.22 15.7178C10.5465 15.0444 10.6999 14.2639 10.6999 13.392C10.6999 12.1163 10.3852 11.0624 9.67692 10.3142C9.29788 9.90488 8.89413 9.57877 8.46488 9.34875C8.78371 9.04191 9.05305 8.68401 9.27218 8.27706C9.64418 7.58622 9.83595 6.86532 9.83595 6.12001C9.83595 4.93806 9.38383 3.92689 8.50204 3.11533C7.61532 2.2678 6.39762 1.87601 4.91995 1.87601C3.4899 1.87601 2.23383 2.04834 1.16183 2.40567L0.815926 2.52097L0.819977 2.88557L0.987977 18.0056L0.992661 18.4271L1.40895 18.4937C1.84647 18.5637 2.41229 18.596 3.09595 18.596C3.77963 18.596 4.44029 18.5716 5.07779 18.5226ZM5.07779 18.5226C5.07796 18.5226 5.07812 18.5226 5.07829 18.5225L5.03995 18.024L5.07734 18.5226C5.07749 18.5226 5.07764 18.5226 5.07779 18.5226ZM8.04802 9.70013C7.84848 9.60955 7.64579 9.54418 7.43995 9.50401C7.62743 9.39253 7.80208 9.26741 7.9639 9.12865L8.04802 9.70013ZM6.90469 15.1725L6.90467 15.1725L6.89995 15.176C6.35835 15.5822 5.69158 15.796 4.87195 15.796C4.54842 15.796 4.25014 15.7756 3.97617 15.7361L3.93557 11.29C4.31203 11.2185 4.76635 11.18 5.30395 11.18C5.94391 11.18 6.49675 11.3743 6.98228 11.7654L6.98818 11.7701L6.99423 11.7747C7.42821 12.1031 7.68395 12.6298 7.68395 13.464C7.68395 14.2585 7.41244 14.801 6.90469 15.1725ZM6.23524 4.99796L6.23519 4.99801L6.24146 5.00366C6.57845 5.30695 6.79595 5.81764 6.79595 6.64801C6.79595 7.43556 6.54121 7.97325 6.07737 8.341C5.65615 8.66094 4.95188 8.90084 3.90313 9.01067L3.8635 4.57189C4.16411 4.51253 4.44397 4.48401 4.70395 4.48401C5.39289 4.48401 5.88443 4.67134 6.23524 4.99796ZM14.31 1.97266L13.831 1.9971L13.8355 2.47665L13.9795 18.0047L13.9842 18.5187L14.498 18.4997L16.442 18.4277L16.9153 18.4101L16.9234 17.9365L17.1874 2.36049L17.1964 1.82539L16.662 1.85266L14.31 1.97266ZM26.8774 9.6762L26.3636 9.66201V10.176V11.88V12.3752L26.8588 12.38L28.834 12.3992C28.812 13.4359 28.5745 14.2662 28.1503 14.9166C27.7021 15.5881 27.2252 15.844 26.7196 15.844C26.1222 15.844 25.6276 15.6705 25.2109 15.332C24.7656 14.9701 24.4217 14.5096 24.1798 13.9404C23.6579 12.7126 23.4036 11.539 23.4036 10.416C23.4036 8.82376 23.7399 7.483 24.3905 6.37364C25.0317 5.29137 25.8778 4.79601 26.9596 4.79601C27.6156 4.79601 28.2527 5.1156 28.8754 5.88303L29.1669 6.24232L29.5476 5.97953L31.2516 4.80353L31.6751 4.51126L31.3708 4.09633C30.8158 3.33948 30.2125 2.768 29.5524 2.41771C28.8908 2.04202 28.0453 1.87601 27.0556 1.87601C26.0446 1.87601 25.0844 2.12069 24.1819 2.60598C23.2829 3.07343 22.5489 3.70984 21.9892 4.51447L21.987 4.51767C20.8816 6.13322 20.3396 8.05937 20.3396 10.272C20.3396 12.5888 20.791 14.5341 21.7316 16.0745C22.2301 16.9101 22.9335 17.5572 23.8285 18.0135L23.8285 18.0135L23.8356 18.017C24.7227 18.4519 25.6784 18.668 26.6956 18.668C27.7057 18.668 28.5743 18.4544 29.2582 17.9805C29.9203 17.5326 30.4329 16.9474 30.7909 16.2316L30.793 16.2272C31.1296 15.5372 31.375 14.8279 31.5279 14.0999C31.6941 13.3836 31.7796 12.707 31.7796 12.072C31.7796 11.4509 31.7551 10.845 31.7059 10.2545L31.6687 9.80856L31.2214 9.7962L26.8774 9.6762ZM37.4109 18.428L37.9001 18.4224L37.9052 17.9332L37.972 11.5459L41.5514 11.588L42.035 11.5937L42.0568 11.1105L42.1528 8.97446L42.1772 8.43015L41.6328 8.45243L38.0493 8.59913V4.7863L42.6472 4.91581L43.1613 4.9303V4.41601V2.42401V1.90874L42.6462 1.92424L35.4702 2.14024L34.9913 2.15465L34.9853 2.63374L34.7933 17.9457L34.7869 18.4578L35.2989 18.452L37.4109 18.428ZM45.8257 17.9373L45.8345 18.412L46.309 18.4277L54.973 18.7157L55.4664 18.7321L55.489 18.239L55.585 16.151L55.6096 15.6164L55.0746 15.6281L49.0017 15.7611L48.7935 2.29628L48.7852 1.76036L48.2512 1.80581L45.9952 1.99781L45.5289 2.03749L45.5377 2.50534L45.8257 17.9373ZM59.2425 1.97266L58.7635 1.9971L58.768 2.47665L58.912 18.0047L58.9167 18.5187L59.4305 18.4997L61.3745 18.4277L61.8479 18.4101L61.8559 17.9365L62.1199 2.36049L62.1289 1.82539L61.5945 1.85266L59.2425 1.97266ZM65.7359 2.60561L65.1551 2.83004L65.4997 3.34871L70.029 10.1658L65.7033 17.383L65.4022 17.8852L65.9455 18.1039L67.9135 18.8959L68.3145 19.0573L68.5321 18.6837L71.9275 12.8568L76.0187 18.695L76.2413 19.0126L76.6043 18.876L78.6443 18.108L79.2469 17.8811L78.8779 17.3535L73.9343 10.2846L78.4084 3.34289L78.7105 2.87418L78.2117 2.6248L76.2437 1.6408L75.8202 1.42902L75.5857 1.84045L72.0754 8.00014L68.4563 1.99784L68.2395 1.63831L67.8479 1.78961L65.7359 2.60561Z" />
        </Logo>
        <Items>
          <Item>
            <Link to="/">Home {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="tv">
              Tv Shows {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -180 : 0 }}
            transition={{ type: "liner" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "liner" }}
            placeholder="Search for movie or tv show"
          />
        </Search>
      </Col>
    </Nav>
  );
}
export default Header;
