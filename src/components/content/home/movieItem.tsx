import { FC, Fragment, useEffect, useState } from "react";
import { Genre, List, Movie } from "../../../types";
import AvgRating from "../../avgRating";
import {
  deleteMovieFromListApi,
  fetchGenresApi,
  fetchListApi,
  movieInListsApi,
  movieInWatchedOrLikedApi,
  saveMovieToListApi
} from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { routePaths } from "../../../types/enums";
import { CircularProgress, IconButton, Snackbar } from "@mui/material";
import { FiEye } from "react-icons/fi";
import { AiFillEye, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { RiDeleteBin6Line } from "react-icons/ri";

type Props = {
  movie: Movie;
  canDelete?: boolean;
};

const MovieItem: FC<Props> = (props) => {
  const navigate = useNavigate();

  const { listId } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.currentUser);

  const [genres, setGenres] = useState<Genre[]>();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [watched, setWatched] = useState<boolean>(false);
  const [successfullyAdded, setSuccessfullyAdded] = useState<boolean>(false);
  const [successfullyRemoved, setSuccessfullyRemoved] = useState<boolean>(false);

  const userLang = navigator.language;

  useEffect(() => {
    const getGenres = async () => {
      const response = await fetchGenresApi();
      if (response.status === 200) {
        const data: Genre[] = response.data;
        const filteredData = data.filter((d) => {
          return props.movie.genreIds.includes(d.id);
        });
        setGenres(filteredData);
      }
    };
    getGenres();
  }, []);

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

  const handleClick = () => {
    navigate("/" + routePaths.specificMovie + props.movie.id);
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
        setSuccessfullyAdded(true);
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
        setSuccessfullyRemoved(true);
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
        setSuccessfullyAdded(true);
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
        setSuccessfullyRemoved(true);
      }
    }
  };

  const deleteFromList = async () => {
    if (currentUser.userId && currentUser.token && listId) {
      const response = await deleteMovieFromListApi(
        "/list/movie",
        props.movie.id,
        currentUser.userId,
        currentUser.token,
        listId
      );
      if (response.status === 200) {
        setSuccessfullyRemoved(true);
      }
    }
  };

  return (
    <>
      <div className="movie-item">
        <div className="movie-item-content">
          <div className="movie-item-content-left-sidebar">
            {isHovering && (
              <div
                className="button-group"
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}>
                {currentUser.userId ? (
                  <>
                    {props.canDelete ? (
                      <IconButton title="Delete from list" onClick={deleteFromList}>
                        <RiDeleteBin6Line color="red" />
                      </IconButton>
                    ) : (
                      <>
                        <IconButton
                          title={watched ? "Remove from watched" : "Add to watched"}
                          onClick={watched ? deleteFromWatched : saveToWatched}>
                          {watched ? <AiFillEye /> : <FiEye />}
                        </IconButton>
                        <IconButton
                          title={liked ? "Remove from watched" : "Add to liked"}
                          onClick={liked ? deleteFromLiked : saveToLiked}>
                          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                        </IconButton>
                      </>
                    )}
                  </>
                ) : (
                  <CircularProgress sx={{ color: "grey" }} />
                )}
              </div>
            )}
            <img
              title="Click to see more..."
              className={`${isHovering ? "hovered" : ""}`}
              src={process.env.REACT_APP_IMG_URL + props.movie.posterPath}
              loading="lazy"
              alt={`Missing poster picture for "${props.movie.title}"`}
              onClick={handleClick}
              onMouseOver={() => setIsHovering(true)}
              onMouseOut={() => setIsHovering(false)}
            />
          </div>
          <div className="movie-item-content-right-sidebar">
            <div className="movie-title">{props.movie.title}</div>
            <div className="movie-description">
              {props.movie.voteAverage ? (
                <AvgRating ratingNumber={Math.round(props.movie.voteAverage * 10) / 10} size="32" />
              ) : (
                <div className="row">
                  <div className="value">NaN</div>
                </div>
              )}
              {genres ? (
                <div className="row">
                  Genre:
                  <div className="value">
                    {genres.map((genre) => {
                      return `${genre.name} `;
                    })}
                  </div>
                </div>
              ) : (
                <div className="row">
                  <CircularProgress sx={{ color: "grey" }} size="24px" />
                </div>
              )}
              <div className="row">
                Release date:
                <div className="value">
                  {new Date(props.movie.releaseDate).toLocaleDateString(userLang)}
                </div>
              </div>
              <div className="row">
                Original language:
                <div className="value">{props.movie.originalLanguage}</div>
              </div>
              <div className="row">
                Popularity:
                <div className="value">{Math.round(props.movie.popularity)}</div>
              </div>
              <div className="row">
                Vote count:
                <div className="value">{props.movie.voteCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={successfullyAdded}
        autoHideDuration={3000}
        onClose={() => setSuccessfullyAdded(false)}
        message="Movie successfully added"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ borderRadius: "30px" }}
      />
      {!props.canDelete && (
        <Snackbar
          open={successfullyRemoved}
          autoHideDuration={3000}
          onClose={() => setSuccessfullyRemoved(false)}
          message="Movie successfully removed"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{ borderRadius: "30px" }}
        />
      )}
    </>
  );
};

export default MovieItem;
