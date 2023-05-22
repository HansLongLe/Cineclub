import "./style.scss";
import { CircularProgress } from "@mui/material";
import { FC } from "react";

type Props = {
  ratingNumber: number;
  size: string;
};

const AvgRating: FC<Props> = (props) => {
  return (
    <div className="avg-rating">
      <p
        className="avg-rating__number"
        style={{
          marginRight: `${props.ratingNumber.toString().length > 1 ? "-24.5px" : "-19px"}`
        }}>
        {props.ratingNumber}
      </p>
      <CircularProgress
        variant="determinate"
        value={props.ratingNumber * 10}
        size={props.size}
        sx={{
          color: `${
            props.ratingNumber > 8
              ? "rgba(96, 255, 121, 0.87)"
              : props.ratingNumber > 6
              ? "rgba(246, 178, 45, 0.87)"
              : props.ratingNumber > 3
              ? "rgba(244, 67, 54, 0.87)"
              : "rgba(153, 0, 0, 0.87)"
          }`
        }}
      />
    </div>
  );
};

export default AvgRating;
