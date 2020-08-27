import React, { useCallback, useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router";
import { ipcRenderer, shell } from "electron";
import {
  Button,
  FormControlLabel,
  Grid,
  Checkbox,
  Theme,
  Typography,
} from "@material-ui/core";
import { FQItem } from "../wrapper/types";
import { createStyles, makeStyles } from "@material-ui/styles";
import { updateDoneStatus } from "./updateDoneStatus";
import { getItem } from "./getItem";
import { Context as FreeQueueContext } from "../wrapper/Context";
import moment from "moment";
import {
  GET_SINGLE_ITEM_FAILED,
  GET_SINGLE_ITEM_SUCCEEDED,
} from "../../../main/database/free-queue/getSingleItem";
import { Parameters } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    link: {
      textDecoration: "underline",
      cursor: "pointer",
    },
    info: {
      marginTop: theme.spacing(3),
      textAlign: "center",
    },
    actions: {
      marginTop: theme.spacing(5),
    },
  })
);

export function ItemDetail(): JSX.Element {
  const classes = useStyles();
  const { resetPage } = useContext(FreeQueueContext);
  const { itemId } = useParams<Parameters>();
  const [detail, setDetail] = useState<null | FQItem>(null);
  const [counter, setCounter] = useState(0);
  const history = useHistory();

  const showDifficulty = (difficulty: number): string => {
    if (difficulty === Number.MIN_SAFE_INTEGER) {
      return "?";
    } else {
      return difficulty.toString();
    }
  };

  const showExperimentalStatus = (isExperimental: boolean | number): string => {
    return Boolean(isExperimental || isExperimental === 1).toString();
  };

  const showLocalTime = (startEpochSecond: number): string => {
    return moment.unix(startEpochSecond).local().format("YYYY-MM-DD HH:mm:ss");
  };

  const handleLinkClick = (fqi: FQItem): void => {
    shell.openExternal(fqi.url).then((_res) => _res);
  };

  const handleBackClick = (): void => {
    history.goBack();
  };

  const handleChangeDone = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, fqi: FQItem) => {
      event.stopPropagation();
      updateDoneStatus(event.target.checked, fqi);
      getItem(itemId as string);
      setCounter((c) => c + 1);
      resetPage();
    },
    [itemId, setCounter, resetPage]
  );

  useEffect(() => {
    let mounted = true;
    getItem(itemId);

    ipcRenderer.on(GET_SINGLE_ITEM_SUCCEEDED, (_event, fqis) => {
      if (mounted) {
        if (fqis === []) {
          setDetail(null);
        } else {
          setDetail(fqis[0]);
        }
      }
    });

    ipcRenderer.on(GET_SINGLE_ITEM_FAILED, (_event, fqis) => {
      if (mounted) {
        setDetail(null);
      }
    });

    return () => {
      mounted = false;
    };
  }, [itemId]);

  return itemId === undefined || detail === null ? (
    <div />
  ) : (
    <div key={`${detail.id}-detail-${counter}`}>
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          {detail.problem_title}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          onClick={(): void => handleLinkClick(detail)}
          className={classes.link}
        >
          {detail.url}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              name={detail.id + "-switch"}
              checked={detail.is_done === 1}
              onChange={(event): void => handleChangeDone(event, detail)}
            />
          }
          label="Task done"
        />
        <Grid container>
          <Grid item xs={4} className={classes.info}>
            <Typography variant="body1">Inserted</Typography>
            <Typography variant="body1" color="textSecondary">
              {showLocalTime(detail.date)}
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.info}>
            <Typography variant="body1">Contest</Typography>
            <Typography variant="body1" color="textSecondary">
              {detail.contest_title}
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.info}>
            <Typography variant="body1">Contest date</Typography>
            <Typography variant="body1" color="textSecondary">
              {showLocalTime(detail.start_epoch_second)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4} className={classes.info}>
            <Typography variant="body1">Difficulty</Typography>
            <Typography variant="body1" color="textSecondary">
              {showDifficulty(detail.difficulty)}
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.info}>
            <Typography variant="body1">Is experimental</Typography>
            <Typography variant="body1" color="textSecondary">
              {showExperimentalStatus(detail.is_experimental)}
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.info} />
        </Grid>
        <Grid container justify="space-between" className={classes.actions}>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <Grid container justify="flex-end" spacing={0}>
              <Grid item xs={8}>
                <Button variant="outlined" onClick={handleBackClick}>
                  BACK TO LIST
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
