import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { fetchMoviesForCategoryApi } from "../../../api";
import { Movie } from "../../../types";
import { AiFillFire, AiTwotoneStar } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdFiberNew } from "react-icons/md";
import { HiTrendingUp } from "react-icons/hi";
import { IconButton, Snackbar } from "@mui/material";
import { categories, categoryTitles } from "../../../types/enums";
import { Swiper as SwiperType } from "swiper";
import MovieCategories from "./movieCategories";
import { useDispatch } from "react-redux";
import { setBackgroundImage } from "../../../redux/slices/backgroundImageSlice";
import CarouselMovieItem from "./carouselMovieItem";

const Home = () => {
  const dispatch = useDispatch();

  const [popularMovies, setPopularMovies] = useState<Movie[]>();
  const [swiper, setSwiper] = useState<SwiperType>();
  const [successfullyAdded, setSuccessfullyAdded] = useState<boolean>(false);
  const [successfullyRemoved, setSuccessfullyRemoved] = useState<boolean>(false);

  useEffect(() => {
    const getPopularMovies = async () => {
      const responseMovies = await fetchMoviesForCategoryApi(categories.popular);
      if (responseMovies.status === 200) {
        setPopularMovies(responseMovies.data.movies);
      }
    };
    getPopularMovies();
  }, []);

  useEffect(() => {
    dispatch(setBackgroundImage(undefined));
  }, []);

  return (
    <>
      <div className="home">
        {popularMovies && (
          <div className="home-popular">
            <div className="home-popular__title">
              {categoryTitles.popular} <AiFillFire />
            </div>

            <Swiper
              onInit={(swiper) => setSwiper(swiper)}
              className="home-popular-carousel"
              slidesPerView={1}
              loop
              autoplay={{ delay: 8000 }}
              pagination>
              {popularMovies.map((movie) => {
                return (
                  <SwiperSlide key={movie.id}>
                    <CarouselMovieItem
                      movie={movie}
                      setSuccessfullyAdded={setSuccessfullyAdded}
                      setSuccessfullyRemoved={setSuccessfullyRemoved}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="home-popular-buttons">
              <IconButton onClick={() => swiper?.slidePrev()}>
                <GrFormPrevious />
              </IconButton>
              <IconButton onClick={() => swiper?.slideNext()}>
                <GrFormNext />
              </IconButton>
            </div>
          </div>
        )}
        <MovieCategories
          category={categories.topRated}
          categoryTitle={categoryTitles.topRated}
          categoryIcon={AiTwotoneStar}
        />
        <MovieCategories
          category={categories.trending}
          categoryTitle={categoryTitles.trending}
          categoryIcon={HiTrendingUp}
          period={1}
        />
        <MovieCategories
          category={categories.upcoming}
          categoryTitle={categoryTitles.upcoming}
          categoryIcon={MdFiberNew}
        />
      </div>
      <Snackbar
        open={successfullyAdded}
        autoHideDuration={3000}
        onClose={() => setSuccessfullyAdded(false)}
        message="Movie successfully added"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ borderRadius: "30px" }}
      />
      <Snackbar
        open={successfullyRemoved}
        autoHideDuration={3000}
        onClose={() => setSuccessfullyRemoved(false)}
        message="Movie successfully removed"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ borderRadius: "30px" }}
      />
    </>
  );
};

export default Home;
