import "./style.scss";
import { BiSearchAlt } from "react-icons/bi";
import { Autocomplete, TextField } from "@mui/material";

const SearchArea = () => {
  return (
    <div className="seaerch-area">
      <Autocomplete
        renderInput={(params) => {
          return (
            <>
              <TextField
                {...params}
                size="medium"
                InputLabelProps={{ className: "" }}
                placeholder="Search..."
                InputProps={{
                  classes: { notchedOutline: "my-custom-class" },
                  style: { border: "none" },
                }}
                sx={{
                  "& input": { color: "white", textAlign: "end", marginRight: "32px" },
                  "& input::placeholder": {
                    color: "#E3E3E3",
                  },
                }}
              />
              <BiSearchAlt color="#E3E3E3" fontSize="32" className="seaerch-area__icon" />
            </>
          );
        }}
        options={[]}
        sx={{
          background: "linear-gradient(#303030, rgba(48, 48, 48, 0.25))",
          width: "70%",
          borderRadius: "32px",
          marginRight: "10%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      />
    </div>
  );
};

export default SearchArea;
