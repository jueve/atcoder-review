import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField, Grid, Button, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { FQCandidate } from "../wrapper/types";
import { ClassifiedCandidates, Kinds } from "./types";
import { List } from "immutable";
import { createClassifiedCandidates } from "./createClassifiedCandidates";
import { reducer } from "./reducer";
import { insertItems } from "./insertItems";
import { getCandidates } from "./getCandidates";
import { Context as FreeQueueContext } from "../wrapper/Context";
import { ipcRenderer } from "electron";
import { FreeQueue as FQChannel } from "../../../main-process/database/channel-name";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "inherit",
      height: theme.spacing(20),
      padding: theme.spacing(3, 0, 2, 2.2),
    },
    autocomplete: {
      padding: theme.spacing(0, 0.8, 2, 0),
    },
  })
);

const init: ClassifiedCandidates = {
  abc: List<FQCandidate>(),
  arc: List<FQCandidate>(),
  agc: List<FQCandidate>(),
  joi: List<FQCandidate>(),
  past: List<FQCandidate>(),
  jag: List<FQCandidate>(),
  other_rated: List<FQCandidate>(),
  other_unrated: List<FQCandidate>(),
};

export function Form(): JSX.Element {
  const classes = useStyles();
  const [classifiedCandidates, setClassifiedCandidates] = useState<
    ClassifiedCandidates
  >(init);
  const [toInsert, dispatchOnInsert] = useReducer(
    reducer,
    classifiedCandidates
  );
  const [counter, setCounter] = useState(6);
  const [buttonDisable, setButtonDisable] = useState(true);
  const { resetPage } = useContext(FreeQueueContext);

  const handleAutoCompleteOptionsClick = useCallback(
    (kind: Kinds, cs: Array<FQCandidate>) => {
      let tmp = true;
      dispatchOnInsert({ mode: "ADD", kind: kind, candidates: List.of(...cs) });
      for (const [_, v] of Object.entries(toInsert)) {
        tmp = tmp && v.size === 0;
      }
      setButtonDisable(tmp);
    },
    [toInsert, dispatchOnInsert, setButtonDisable]
  );

  const handleCancelClick = useCallback(() => {
    setCounter((c) => c + 10);
    resetPage();
  }, [setCounter, resetPage]);

  const handleSubmitClick = useCallback(() => {
    const list = toInsert.abc.concat(
      toInsert.arc,
      toInsert.agc,
      toInsert.jag,
      toInsert.joi,
      toInsert.past,
      toInsert.other_rated,
      toInsert.other_unrated
    );
    insertItems(list);
    dispatchOnInsert({ mode: "CLEAR" });
    setCounter((c) => c + 10);
    resetPage();
  }, [toInsert, dispatchOnInsert, setCounter, resetPage]);

  useEffect(() => {
    let mounted = true;
    getCandidates();
    ipcRenderer.on(FQChannel.GET_CANDIDATES_SUCCEEDED, (_, fqcs) => {
      if (mounted) {
        setClassifiedCandidates(createClassifiedCandidates(fqcs));
      }
    });
    ipcRenderer.on(FQChannel.GET_CANDIDATES_SUCCEEDED, (_, fqcs) => {
      if (mounted) {
        setClassifiedCandidates(createClassifiedCandidates(fqcs));
      }
    });
    const f = (): void => {
      mounted = false;
    };
    return f;
  }, [setClassifiedCandidates]);

  return (
    <div className={classes.root}>
      <Typography variant="body1">Insert items</Typography>
      <Grid container justify="space-between">
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Grid container justify="flex-end" spacing={1}>
            <Grid item xs={6}>
              <Button variant="outlined" onClick={handleCancelClick}>
                CANCEL
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                disabled={buttonDisable}
                onClick={handleSubmitClick}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Autocomplete
        key={`insert-free-queue-${counter}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="free-queue-candidates-auto-complete-of-ABC"
        options={classifiedCandidates.abc.toArray()}
        groupBy={(option: FQCandidate) => option.contest_title}
        getOptionLabel={(option: FQCandidate) =>
          `${option.problem_title} / ${option.contest_title}`
        }
        onChange={(_event, cs: Array<FQCandidate>): void => {
          handleAutoCompleteOptionsClick("ABC", cs);
        }}
        renderInput={(params): JSX.Element => (
          <TextField
            {...params}
            id="free-queue-candidates-text-field-abc"
            label="ABC"
            variant="standard"
          />
        )}
      />

      <Autocomplete
        key={`insert-free-queue-${counter + 1}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="free-queue-candidates-auto-complete-of-ARC"
        options={classifiedCandidates.arc.toArray()}
        groupBy={(option: FQCandidate) => option.contest_title}
        getOptionLabel={(option: FQCandidate) =>
          `${option.problem_title} / ${option.contest_title}`
        }
        onChange={(_event, cs: Array<FQCandidate>): void => {
          handleAutoCompleteOptionsClick("ARC", cs);
        }}
        renderInput={(params): JSX.Element => (
          <TextField
            {...params}
            id="free-queue-candidates-text-field"
            label="ARC"
            variant="standard"
          />
        )}
      />

      <Autocomplete
        key={`insert-free-queue-${counter + 2}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="free-queue-candidates-auto-complete-of-AGC"
        options={classifiedCandidates.agc.toArray()}
        groupBy={(option: FQCandidate) => option.contest_title}
        getOptionLabel={(option: FQCandidate) =>
          `${option.problem_title} / ${option.contest_title}`
        }
        onChange={(_event, cs: Array<FQCandidate>): void => {
          handleAutoCompleteOptionsClick("AGC", cs);
        }}
        renderInput={(params): JSX.Element => (
          <TextField
            {...params}
            id="free-queue-candidates-text-field"
            label="AGC"
            variant="standard"
          />
        )}
      />

      <Autocomplete
        key={`insert-free-queue-${counter + 3}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="free-queue-candidates-auto-complete-of-JOI"
        options={classifiedCandidates.joi.toArray()}
        groupBy={(option: FQCandidate) => option.contest_title}
        getOptionLabel={(option: FQCandidate) =>
          `${option.problem_title} / ${option.contest_title}`
        }
        onChange={(_event, cs: Array<FQCandidate>): void => {
          handleAutoCompleteOptionsClick("JOI", cs);
        }}
        renderInput={(params): JSX.Element => (
          <TextField
            {...params}
            id="free-queue-candidates-text-field"
            label="JOI"
            variant="standard"
          />
        )}
      />

      <Autocomplete
        key={`insert-free-queue-${counter + 4}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="free-queue-candidates-auto-complete-of-PAST"
        options={classifiedCandidates.past.toArray()}
        groupBy={(option: FQCandidate) => option.contest_title}
        getOptionLabel={(option: FQCandidate) =>
          `${option.problem_title} / ${option.contest_title}`
        }
        onChange={(_event, cs: Array<FQCandidate>): void => {
          handleAutoCompleteOptionsClick("PAST", cs);
        }}
        renderInput={(params): JSX.Element => (
          <TextField
            {...params}
            id="free-queue-candidates-text-field"
            label="PAST"
            variant="standard"
          />
        )}
      />

      <Autocomplete
        key={`insert-free-queue-${counter + 5}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="free-queue-candidates-auto-complete-of-JAG"
        options={classifiedCandidates.jag.toArray()}
        groupBy={(option: FQCandidate) => option.contest_title}
        getOptionLabel={(option: FQCandidate) =>
          `${option.problem_title} / ${option.contest_title}`
        }
        onChange={(_event, cs: Array<FQCandidate>): void => {
          handleAutoCompleteOptionsClick("JAG", cs);
        }}
        renderInput={(params): JSX.Element => (
          <TextField
            {...params}
            id="free-queue-candidates-text-field"
            label="JAG"
            variant="standard"
          />
        )}
      />

      <Autocomplete
        key={`insert-free-queue-${counter + 6}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="free-queue-candidates-auto-complete-of-other-rated"
        options={classifiedCandidates.other_rated.toArray()}
        groupBy={(option: FQCandidate) => option.contest_title}
        getOptionLabel={(option: FQCandidate) =>
          `${option.problem_title} / ${option.contest_title}`
        }
        onChange={(_event, cs: Array<FQCandidate>): void => {
          handleAutoCompleteOptionsClick("OTHER_RATED", cs);
        }}
        renderInput={(params): JSX.Element => (
          <TextField
            {...params}
            id="free-queue-candidates-text-field"
            label="Other rated"
            variant="standard"
          />
        )}
      />

      <Autocomplete
        key={`insert-free-queue-${counter + 7}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="free-queue-candidates-auto-complete-of-other-unrated"
        options={classifiedCandidates.other_unrated.toArray()}
        groupBy={(option: FQCandidate) => option.contest_title}
        getOptionLabel={(option: FQCandidate) =>
          `${option.problem_title} / ${option.contest_title}`
        }
        onChange={(_event, cs: Array<FQCandidate>): void => {
          handleAutoCompleteOptionsClick("OTHER_RATED", cs);
        }}
        renderInput={(params): JSX.Element => (
          <TextField
            {...params}
            id="free-queue-candidates-text-field"
            label="Other unrated"
            variant="standard"
          />
        )}
      />
    </div>
  );
}
