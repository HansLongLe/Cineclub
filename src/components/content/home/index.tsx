import "./style.scss";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { fetchMoviesForCategory } from "../../../api";
import { Movie } from "../../../types";
import { AiFillFire, AiTwotoneStar } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdFiberNew } from "react-icons/md";
import { IconButton } from "@mui/material";
import { Swiper as SwiperType } from "swiper/types";
import { categories, categoryTitles } from "../../../types/enums";
import MovieCategories from "./movieCategories";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>();
  const [swiper, setSwiper] = useState<SwiperType>();

  useEffect(() => {
    const getPopularMovies = async () => {
      const responseMovies = await fetchMoviesForCategory(categories.popular);
      if (responseMovies.data) {
        setPopularMovies(responseMovies.data);
      }
    };
    getPopularMovies();
  }, []);

  return (
    <div className="home">
      <div className="home-popular">
        <div className="home-popular__title">
          {categoryTitles.popular} <AiFillFire />
        </div>
        {popularMovies && (
          <Swiper
            className="home-popular-carousel"
            slidesPerView={1}
            loop
            onSwiper={(swiper) => {
              setSwiper(swiper);
            }}>
            {popularMovies.map((movie) => {
              return (
                <SwiperSlide key={movie.id}>
                  <div className="movie-item">
                    <img src={process.env.REACT_APP_IMG_URL + movie.backdropPath} className="img" />
                    <div className="movie-title">{movie.title}</div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        <div className="home-popular-buttons">
          <IconButton onClick={() => swiper?.slidePrev()}>
            <GrFormPrevious />
          </IconButton>
          <IconButton onClick={() => swiper?.slideNext()}>
            <GrFormNext />
          </IconButton>
        </div>
      </div>
      <MovieCategories
        category={categories.topRated}
        categoryTitle={categoryTitles.topRated}
        categoryIcon={AiTwotoneStar}
      />
      <MovieCategories
        category={categories.upcoming}
        categoryTitle={categoryTitles.upcoming}
        categoryIcon={MdFiberNew}
      />
    </div>
  );
};

export default Home;
