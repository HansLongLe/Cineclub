import "./style.scss";
import { CircularProgress } from "@mui/material";
import { FC, useRef } from "react";

type Props = {
  ratingNumber: number;
  size: string;
};

const AvgRating: FC<Props> = (props) => {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <div className="avg-rating">
      <p
        className="avg-rating__number"
        style={{
          marginRight: `-${
            (Number(props.size) +
              (Number(props.size) + (props.ratingNumber % 1 !== 0 ? Number(props.size) / 8 : -16)) /
                4) /
            2
          }px`,
          fontSize: `${Number(props.size) / 4}px`
        }}>
        {Math.round(props.ratingNumber * 10) / 10}
      </p>
      <CircularProgress
        ref={ref}
        variant="determinate"
        value={props.ratingNumber * 10}
        size={`${props.size}px`}
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
