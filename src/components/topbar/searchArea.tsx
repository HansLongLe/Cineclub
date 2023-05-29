import "./style.scss";
import { BiSearchAlt } from "react-icons/bi";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { fetchMoviesByKeywords } from "../../api";
import { Movie } from "../../types";
import { routePaths } from "../../types/enums";

const SearchArea = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState<string>();
  const [options, setOptions] = useState<Movie[]>();

  const handleChange = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value.length !== 0) {
      setValue(event.target.value);
      const response = await fetchMoviesByKeywords(event.target.value);
      if (response.status === 200) {
        setOptions(response.data.length !== 0 ? (response.data as Movie[]) : response.data);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onSelect();
    }
  };

  const onSelect = () => {
    if (value !== undefined) {
      navigate(routePaths.browseMovies + "/" + value);
    }
  };

  return (
    <div className="search-area">
      <Autocomplete
        onChange={(_event, movie) => {
          setValue(movie?.title);
          onSelect();
        }}
        renderInput={(params) => {
          return (
            <>
              <TextField
                {...params}
                size="medium"
                InputLabelProps={{ className: "" }}
                placeholder="Search..."
                value={value}
                onKeyDown={(event) => handleKeyDown(event)}
                onChange={(event) => handleChange(event)}
                sx={{
                  "& input": { color: "white", textAlign: "end", marginRight: "32px" },
                  "& input::placeholder": {
                    color: "#E3E3E3"
                  }
                }}
              />
              <BiSearchAlt
                color="#E3E3E3"
                fontSize="32"
                className="search-area__icon"
                onClick={onSelect}
              />
            </>
          );
        }}
        options={options ? options : []}
        getOptionLabel={(option) => option.title}
        sx={{
          background: "linear-gradient(#292828, rgba(48, 48, 48, 0.5))",
          width: "70%",
          borderRadius: "32px",
          marginRight: "10%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          boxShadow: "8px 8px rgba(0,0,0,0.3)"
        }}
      />
    </div>
  );
};

export default SearchArea;
