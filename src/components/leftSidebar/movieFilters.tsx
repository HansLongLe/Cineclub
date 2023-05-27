import {
  Dispatch,
  FC,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle
} from "react";
import { Genre, Language, Movie } from "../../types";
import "./style.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { fetchFilteredMovies, fetchGenresApi, fetchLanguagesApi } from "../../api";
import { MdOutlineExpandMore } from "react-icons/md";
import { textfieldSx } from "../content/createAccount/textfieldGroup";
import { IoClose } from "react-icons/io5";

type Props = {
  applyFiltersToMovies?: Dispatch<SetStateAction<Movie[] | undefined>>;
  changePaginationMaxPage?: Dispatch<SetStateAction<number | undefined>>;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
};

export type MovieFiltersRef = {
  changePage: (page: number) => void;
};

const MovieFilters = forwardRef<MovieFiltersRef, Props>((props, ref) => {
  const [genres, setGenres] = useState<Genre[]>();
  const [languages, setLanguages] = useState<Language[]>();

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [year, setYear] = useState<number>(0);
  const [dateAfter, setDateAfter] = useState<string>("");
  const [dateBefore, setDateBefore] = useState<string>("");
  const [minimumAverageRating, setMinimumAverageRating] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [includeAdultMovies, setIncludeAdultMovies] = useState<boolean>(false);

  useEffect(() => {
    const getGenres = async () => {
      const response = await fetchGenresApi();
      if (response.status === 200) {
        setGenres(response.data);
      }
    };
    getGenres();
  }, []);

  useEffect(() => {
    const getLanguages = async () => {
      const response = await fetchLanguagesApi();
      if (response.status === 200) {
        setLanguages(response.data);
      }
    };
    getLanguages();
  }, []);

  const changePage = async (page: number) => {
    const responseMovies = await fetchFilteredMovies(
      page,
      1,
      20,
      selectedGenres,
      year,
      dateAfter,
      dateBefore,
      minimumAverageRating,
      selectedLanguage,
      undefined,
      includeAdultMovies
    );
    if (
      responseMovies &&
      responseMovies.data &&
      props.applyFiltersToMovies &&
      props.changePaginationMaxPage &&
      props.setCurrentPage
    ) {
      props.applyFiltersToMovies(responseMovies.data.movies);
      props.changePaginationMaxPage(responseMovies.data.numberOfPages);
      props.setCurrentPage(page);
    }
  };

  useImperativeHandle(ref, () => ({
    changePage: changePage
  }));

  const handleCheckboxChange = (genreId: number) => {
    const updatedGenres = [...selectedGenres];
    const index = updatedGenres.findIndex((selectedGenreId) => selectedGenreId === genreId);

    if (index > -1) {
      updatedGenres.splice(index, 1);
    } else {
      updatedGenres.push(genreId);
    }
    setSelectedGenres(updatedGenres);
  };

  const saveFilters = async () => {
    const response = await fetchFilteredMovies(
      1,
      1,
      20,
      selectedGenres,
      year,
      dateAfter,
      dateBefore,
      minimumAverageRating,
      selectedLanguage,
      undefined,
      includeAdultMovies
    );
    if (
      response.status === 200 &&
      props.applyFiltersToMovies &&
      props.changePaginationMaxPage &&
      props.setCurrentPage
    ) {
      props.applyFiltersToMovies(response.data.movies);
      props.changePaginationMaxPage(response.data.numberOfPages);
      props.setCurrentPage(1);
    }
  };

  const clearFilters = async () => {
    setSelectedGenres([]);
    setYear(0);
    setDateAfter("");
    setDateBefore("");
    setMinimumAverageRating(0);
    setSelectedLanguage("");
    setIncludeAdultMovies(false);
    const response = await fetchFilteredMovies(1, 1, 20);
    if (
      response.status === 200 &&
      props.applyFiltersToMovies &&
      props.changePaginationMaxPage &&
      props.setCurrentPage
    ) {
      props.applyFiltersToMovies(response.data.movies);
      props.changePaginationMaxPage(response.data.numberOfPages);
      props.setCurrentPage(1);
    }
  };

  return (
    <div className="movie-filters">
      <div className="container">
        <>
          <Accordion sx={{ backgroundColor: "black", overflow: "auto" }}>
            <AccordionSummary expandIcon={<MdOutlineExpandMore color="white" size="24px" />}>
              <div className="title">Genres</div>
            </AccordionSummary>

            <AccordionDetails>
              {genres ? (
                genres.map((genre) => {
                  return (
                    <div className="genre-item" key={genre.id}>
                      <FormControlLabel
                        checked={selectedGenres.some(
                          (selectedGenreId) => selectedGenreId === genre.id
                        )}
                        onChange={() => handleCheckboxChange(genre.id)}
                        control={<Checkbox />}
                        label={<div className="name">{genre.name}</div>}
                      />
                    </div>
                  );
                })
              ) : (
                <CircularProgress sx={{ color: "grey" }} />
              )}
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ borderColor: "white", margin: "16px 0" }} />
        </>

        <Accordion sx={{ backgroundColor: "black", overflow: "auto" }}>
          <AccordionSummary expandIcon={<MdOutlineExpandMore color="white" size="24px" />}>
            <div className="title">More</div>
          </AccordionSummary>
          <AccordionDetails sx={{ display: "grid", gap: "64px" }}>
            <div className="filter-row">
              <TextField
                type="number"
                label="Year of release:"
                value={year}
                onChange={(event) => setYear(Number(event.target.value))}
                InputLabelProps={{ shrink: true }}
                sx={{ ...textfieldSx, width: "80%", marginTop: "8px" }}
              />
            </div>
            <div className="filter-row">
              <TextField
                type="date"
                label="Released after:"
                value={dateAfter}
                onChange={(event) => setDateAfter(event.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{
                  ...textfieldSx,
                  width: "80%",
                  "& svg": {
                    color: "#adadad"
                  }
                }}
              />
            </div>
            <div className="filter-row">
              <TextField
                type="date"
                label="Released before:"
                value={dateBefore}
                onChange={(event) => setDateBefore(event.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{
                  ...textfieldSx,
                  width: "80%",
                  "& svg": {
                    color: "#adadad"
                  }
                }}
              />
            </div>
            <div className="filter-row">
              <TextField
                type="number"
                label="Minimum average rating:"
                value={minimumAverageRating}
                onChange={(event) => setMinimumAverageRating(Number(event.target.value))}
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                sx={{ ...textfieldSx, width: "80%" }}
              />
            </div>
            {languages && (
              <div className="filter-row">
                <FormControl fullWidth>
                  <InputLabel
                    shrink
                    sx={{
                      color: "#adadad !important",
                      top: "-8px"
                    }}>
                    Select movie language
                  </InputLabel>
                  <Select
                    value={selectedLanguage}
                    onChange={(event) => setSelectedLanguage(event.target.value)}
                    notched
                    MenuProps={{
                      style: {
                        maxHeight: "200px",
                        borderRadius: "20px"
                      }
                    }}
                    sx={{
                      backgroundColor: "rgba(227, 227, 227, 0.2)",
                      borderRadius: "20px",
                      width: "80%",
                      color: "white",
                      "& svg": {
                        color: "#adadad"
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none"
                      }
                    }}>
                    {languages.map((language) => {
                      return (
                        <MenuItem key={language.iso_639_1} value={language.iso_639_1}>
                          {language.englishName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            )}
            <div className="filter-row">
              <FormControlLabel
                checked={includeAdultMovies}
                onChange={() => setIncludeAdultMovies(!includeAdultMovies)}
                control={<Checkbox />}
                label={<div className="name">Include Adult Movies</div>}
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Divider sx={{ borderColor: "white", margin: "16px 0" }} />
        <div className="button-container">
          <Button
            variant="contained"
            onClick={saveFilters}
            sx={{
              fontSize: "small",
              borderRadius: "20px",
              color: "white",
              maxHeight: "40px",
              height: "40px",
              maxWidth: "128px",
              width: "128px",
              backgroundColor: "#8685ef",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#6665b5"
              }
            }}>
            Save filters
          </Button>
          <Button
            onClick={clearFilters}
            sx={{
              fontSize: "small",
              borderRadius: "20px",
              color: "#8685ef",
              marginTop: "8px"
            }}>
            <IoClose style={{ marginRight: "8px" }} />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
});

MovieFilters.displayName = "MovieFilters";

export default MovieFilters;
