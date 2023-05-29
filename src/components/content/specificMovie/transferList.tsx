import "./style.scss";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { fetchPotentialLists } from "../../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useParams } from "react-router-dom";
import { List as ListType } from "../../../types";

const not = (a: ListType[], b: ListType[]) => {
  return a.filter((value) => b.indexOf(value) === -1);
};

const intersection = (a: ListType[], b: ListType[]) => {
  return a.filter((value) => b.indexOf(value) !== -1);
};

const union = (a: ListType[], b: ListType[]) => {
  return [...a, ...not(b, a)];
};

type Props = {
  left: ListType[];
  right: ListType[];
  setLeft: Dispatch<SetStateAction<ListType[]>>;
  setRight: Dispatch<SetStateAction<ListType[]>>;
};

const TransferList: FC<Props> = (props) => {
  const { movieId } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const [checked, setChecked] = useState<ListType[]>([]);

  const leftChecked = intersection(checked, props.left);
  const rightChecked = intersection(checked, props.right);

  useEffect(() => {
    const potentialLists = async () => {
      if (currentUser.userId && currentUser.token && movieId) {
        const responseRight = await fetchPotentialLists(
          Number(movieId),
          currentUser.userId,
          currentUser.token
        );
        if (responseRight.status === 200) {
          props.setLeft(responseRight.data);
        }
      }
    };
    potentialLists();
  }, []);

  const handleToggle = (value: ListType) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: ListType[]) => intersection(checked, items).length;

  const handleToggleAll = (items: ListType[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    props.setRight(props.right.concat(leftChecked));
    props.setLeft(not(props.left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    props.setLeft(props.left.concat(rightChecked));
    props.setRight(not(props.right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: ListType[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1, backgroundColor: "#292828" }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected"
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          backgroundColor: "#474646",
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent"
          },
          "&::-webkit-scrollbar": {
            width: "6px"
          },
          overflow: "auto"
        }}
        dense
        component="div"
        role="list">
        {items.map((list: ListType) => {
          const labelId = `transfer-list-all-item-${list}-label`;

          return (
            <ListItem key={list.id} role="listitem" button onClick={handleToggle(list)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(list) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={list.name} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList("Available lists", props.left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{
              my: 1,
              color: "#8685ef",
              border: "2px solid #8685ef",
              fontSize: "large",
              borderRadius: "20px",
              "&:hover": {
                border: "2px solid #8685ef"
              },
              "&.Mui-disabled": {
                color: "grey",
                border: "2px solid grey"
              }
            }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right">
            &gt;
          </Button>
          <Button
            sx={{
              my: 1,
              color: "#8685ef",
              border: "2px solid #8685ef",
              fontSize: "large",
              borderRadius: "20px",
              "&:hover": {
                border: "2px solid #8685ef"
              },
              "&.Mui-disabled": {
                color: "grey",
                border: "2px solid grey"
              }
            }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left">
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList("Chosen Lists", props.right)}</Grid>
    </Grid>
  );
};

export default TransferList;
