import "./style.scss";
import { Grid } from "@mui/material";
import LeftSidebar from "../../leftSidebar";
import { useLocation, useParams } from "react-router-dom";
import { ListInfo } from "../../../types";
import { useEffect, useState } from "react";
import { fetchListInfoApi } from "../../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import MovieItem from "../home/movieItem";
import { routePaths } from "../../../types/enums";

const SpecificList = () => {
  const { listId } = useParams();
  const location = useLocation();

  const { currentUser } = useSelector((state: RootState) => state.currentUser);

  const [list, setList] = useState<ListInfo>();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const getListInfo = async () => {
      if (listId && currentUser.token) {
        const response = await fetchListInfoApi(listId, currentUser.token);
        if (response.status === 200) {
          setList(response.data);
          setVisible(response.data.public);
        }
      }
    };
    getListInfo();
  }, []);

  return (
    <div className="specific-list">
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={3}>
          <LeftSidebar listVisibility={visible} />
        </Grid>
        <Grid item xs={9}>
          <div className="movies">
            <div className="movies-container">
              <Grid
                container
                sx={{ "& .MuiGrid-item": { display: "flex", justifyContent: "center" } }}>
                {list &&
                  list.movieDtos.map((movie) => {
                    return (
                      <Grid item key={movie.id} xl={6} lg={12}>
                        <MovieItem
                          movie={movie}
                          canDelete={location.pathname.includes(routePaths.specificList)}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SpecificList;
