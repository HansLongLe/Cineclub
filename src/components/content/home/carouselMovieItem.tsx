import { IconButton, CircularProgress } from "@mui/material";
import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import { AiFillEye, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import { saveMovieToListApi, deleteMovieFromListApi, movieInWatchedOrLikedApi } from "../../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { List, Movie } from "../../../types";
import { routePaths } from "../../../types/enums";

type Props = {
  movie: Movie;
  setSuccessfullyAdded: Dispatch<SetStateAction<boolean>>;
  setSuccessfullyRemoved: Dispatch<SetStateAction<boolean>>;
};

const CarouselMovieItem: FC<Props> = (props) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const [liked, setLiked] = useState<boolean>(false);
  const [watched, setWatched] = useState<boolean>(false);

  useEffect(() => {
    const movieInLists = async () => {
      if (currentUser.userId && currentUser.token) {
        const response = await movieInWatchedOrLikedApi(
          props.movie.id,
          currentUser.userId,
          currentUser.token
        );
        if (response.status === 200) {
          setLiked(response.data.liked);
          setWatched(response.data.watched);
        }
      }
    };

    movieInLists();
  }, []);

  const handleClick = (movieId: number) => {
    navigate("/" + routePaths.specificMovie + movieId);
  };

  const saveToLiked = async () => {
    if (currentUser.userId && currentUser.token) {
      const response = await saveMovieToListApi(
        "/movie/like",
        props.movie.id,
        currentUser.userId,
        currentUser.token
      );
      if (response.status === 200) {
        setLiked(true);
        props.setSuccessfullyAdded(true);
      }
    }
  };

  const deleteFromLiked = async () => {
    if (currentUser.userId && currentUser.token) {
      const response = await deleteMovieFromListApi(
        "/movie/liked",
        props.movie.id,
        currentUser.userId,
        currentUser.token
      );
      if (response.status === 200) {
        setLiked(false);
        props.setSuccessfullyRemoved(true);
      }
    }
  };

  const saveToWatched = async () => {
    if (currentUser.userId && currentUser.token) {
      const response = await saveMovieToListApi(
        "/movie/watched",
        props.movie.id,
        currentUser.userId,
        currentUser.token
      );
      if (response.status === 200) {
        setWatched(true);
        props.setSuccessfullyAdded(true);
      }
    }
  };

  const deleteFromWatched = async () => {
    if (currentUser.userId && currentUser.token) {
      const response = await deleteMovieFromListApi(
        "/movie/watched",
        props.movie.id,
        currentUser.userId,
        currentUser.token
      );
      if (response.status === 200) {
        setWatched(false);
        props.setSuccessfullyRemoved(true);
      }
    }
  };

  return (
    <div className="movie-item">
      <div className="button-group">
        {currentUser.userId ? (
          <>
            <IconButton
              title={watched ? "Remove from watched" : "Add to watched"}
              onClick={watched ? deleteFromWatched : saveToWatched}
              sx={{ gridRow: "1" }}>
              {watched ? <AiFillEye fontSize="48px" /> : <FiEye fontSize="48px" />}
            </IconButton>
            <IconButton
              title={liked ? "Remove from watched" : "Add to liked"}
              onClick={liked ? deleteFromLiked : saveToLiked}
              sx={{ gridRow: "1" }}>
              {liked ? <AiFillHeart fontSize="48px" /> : <AiOutlineHeart fontSize="48px" />}
            </IconButton>
          </>
        ) : (
          <CircularProgress sx={{ color: "grey" }} />
        )}
      </div>
      <img
        src={process.env.REACT_APP_IMG_URL + props.movie.backdropPath}
        className="img"
        onClick={() => handleClick(props.movie.id)}
        loading="lazy"
      />
      <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      <div className="movie-title">{props.movie.title}</div>
    </div>
  );
};

export default CarouselMovieItem;
