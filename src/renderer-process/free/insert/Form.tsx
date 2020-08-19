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
import { ClassifiedCandidates, Kind } from "./types";
import { List } from "immutable";
import { createClassifiedCandidates } from "./createClassifiedCandidates";
import { reducer } from "./reducer";
import { insertItems } from "./insertItems";
import { getCandidates } from "./getCandidates";
import { Context as FreeQueueContext } from "../wrapper/Context";
import { ipcRenderer } from "electron";
import {
  GET_ALL_CANDIDATES_SUCCEEDED,
  GET_ALL_CANDIDATES_FAILED,
} from "../../../main-process/database/free-queue/getAllCandidates";

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

/**
 *
 */
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

  const classifyOptions = (option: FQCandidate): string => {
    return option.contest_title;
  };

  const showOptions = (option: FQCandidate): string => {
    return option.problem_title;
  };

  const handleAutoCompleteOptionsClick = useCallback(
    (kind: Kind, cs: Array<FQCandidate>) => {
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
    dispatchOnInsert({ mode: "CLEAR" });
    setButtonDisable(true);
  }, [setCounter, resetPage, setButtonDisable]);

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
    ipcRenderer.on(GET_ALL_CANDIDATES_SUCCEEDED, (_, fqcs) => {
      if (mounted) {
        setClassifiedCandidates(createClassifiedCandidates(fqcs));
      }
    });
    ipcRenderer.on(GET_ALL_CANDIDATES_FAILED, (_, fqcs) => {
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
        key={`insert-free-queue-item-${counter}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="ABC"
        options={classifiedCandidates.abc.toArray()}
        groupBy={classifyOptions}
        getOptionLabel={showOptions}
        onChange={(
          _event: React.ChangeEvent<unknown>,
          cs: Array<FQCandidate>
        ) => handleAutoCompleteOptionsClick("ABC", cs)}
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
        key={`insert-free-queue-item-${counter + 1}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="ARC"
        options={classifiedCandidates.arc.toArray()}
        groupBy={classifyOptions}
        getOptionLabel={showOptions}
        onChange={(
          _event: React.ChangeEvent<unknown>,
          cs: Array<FQCandidate>
        ) => handleAutoCompleteOptionsClick("ARC", cs)}
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
        key={`insert-free-queue-item-${counter + 2}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="AGC"
        options={classifiedCandidates.agc.toArray()}
        groupBy={classifyOptions}
        getOptionLabel={showOptions}
        onChange={(
          _event: React.ChangeEvent<unknown>,
          cs: Array<FQCandidate>
        ) => handleAutoCompleteOptionsClick("AGC", cs)}
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
        key={`insert-free-queue-item-${counter + 3}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="JOI"
        options={classifiedCandidates.joi.toArray()}
        groupBy={classifyOptions}
        getOptionLabel={showOptions}
        onChange={(
          _event: React.ChangeEvent<unknown>,
          cs: Array<FQCandidate>
        ) => handleAutoCompleteOptionsClick("JOI", cs)}
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
        key={`insert-free-queue-item-${counter + 4}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="PAST"
        options={classifiedCandidates.past.toArray()}
        groupBy={classifyOptions}
        getOptionLabel={showOptions}
        onChange={(
          _event: React.ChangeEvent<unknown>,
          cs: Array<FQCandidate>
        ) => handleAutoCompleteOptionsClick("PAST", cs)}
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
        key={`insert-free-queue-item-${counter + 5}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="JAG"
        options={classifiedCandidates.jag.toArray()}
        groupBy={classifyOptions}
        getOptionLabel={showOptions}
        onChange={(
          _event: React.ChangeEvent<unknown>,
          cs: Array<FQCandidate>
        ) => handleAutoCompleteOptionsClick("JAG", cs)}
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
        key={`insert-free-queue-item-${counter + 6}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="OTHER_RATED"
        options={classifiedCandidates.other_rated.toArray()}
        groupBy={classifyOptions}
        getOptionLabel={showOptions}
        onChange={(
          _event: React.ChangeEvent<unknown>,
          cs: Array<FQCandidate>
        ) => handleAutoCompleteOptionsClick("OTHER_RATED", cs)}
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
        key={`insert-free-queue-item-${counter + 7}`}
        multiple
        color="primary"
        className={classes.autocomplete}
        id="OTHER_UNRATED"
        options={classifiedCandidates.other_unrated.toArray()}
        groupBy={classifyOptions}
        getOptionLabel={showOptions}
        onChange={(
          _event: React.ChangeEvent<unknown>,
          cs: Array<FQCandidate>
        ) => handleAutoCompleteOptionsClick("OTHER_UNRATED", cs)}
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
