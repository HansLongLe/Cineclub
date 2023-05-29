import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import AvgRating from "./index";

describe("AvgRating", () => {
  test("renders the average rating", () => {
    const ratingNumber = 7.5;
    const size = "32";

    const { getByText } = render(<AvgRating ratingNumber={ratingNumber} size={size} />);

    const avgRatingElement = getByText(/7.5/i);
    expect(avgRatingElement).toBeInTheDocument();
  });

  test("renders the CircularProgress component with correct size and color", () => {
    const ratingNumber = 7.5;
    const size = "32";

    const { getByRole } = render(<AvgRating ratingNumber={ratingNumber} size={size} />);

    const circularProgressElement = getByRole("progressbar");
    expect(circularProgressElement).toHaveStyle(`width: ${size}px`);
    expect(circularProgressElement).toHaveStyle("color: rgba(246, 178, 45, 0.87)");
  });
});
