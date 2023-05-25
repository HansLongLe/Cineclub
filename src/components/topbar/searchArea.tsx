import "./style.scss";
import { BiSearchAlt } from "react-icons/bi";
import { Autocomplete, TextField } from "@mui/material";

const SearchArea = () => {
  return (
    <div className="search-area">
      <Autocomplete
        renderInput={(params) => {
          return (
            <>
              <TextField
                {...params}
                size="medium"
                InputLabelProps={{ className: "" }}
                placeholder="Search..."
                sx={{
                  "& input": { color: "white", textAlign: "end", marginRight: "32px" },
                  "& input::placeholder": {
                    color: "#E3E3E3"
                  }
                }}
              />
              <BiSearchAlt color="#E3E3E3" fontSize="32" className="search-area__icon" />
            </>
          );
        }}
        options={[]}
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
