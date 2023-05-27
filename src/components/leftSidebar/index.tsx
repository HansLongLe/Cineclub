import { useLocation } from "react-router-dom";
import { routePaths } from "../../types/enums";
import MovieFilters, { MovieFiltersRef } from "./movieFilters";
import ListFilters from "./listFilters";
import { Dispatch, FC, SetStateAction, forwardRef, useImperativeHandle, useRef } from "react";
import { Movie } from "../../types";

type Props = {
  applyFiltersToMovies?: Dispatch<SetStateAction<Movie[] | undefined>>;
  changePaginationMaxPage?: Dispatch<SetStateAction<number | undefined>>;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
};

export type LeftSidebarRef = {
  changePage: (page: number) => void;
};

const LeftSidebar = forwardRef<LeftSidebarRef, Props>((props, ref) => {
  const location = useLocation();
  const childRef = useRef<MovieFiltersRef>(null);

  useImperativeHandle(ref, () => ({
    async changePage(page: number) {
      if (childRef.current) {
        childRef.current.changePage(page);
      }
    }
  }));

  return (
    <div className="left-sidebar">
      {location.pathname.includes(routePaths.browseMovies) ? (
        <MovieFilters
          ref={childRef}
          applyFiltersToMovies={props.applyFiltersToMovies}
          changePaginationMaxPage={props.changePaginationMaxPage}
          setCurrentPage={props.setCurrentPage}
        />
      ) : (
        <ListFilters />
      )}
    </div>
  );
});

LeftSidebar.displayName = "LeftSidebar";

export default LeftSidebar;
