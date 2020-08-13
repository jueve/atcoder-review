import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import { Button, Grid, Typography } from "@material-ui/core";
import {
  UPDATE_PROBLEMS,
  UPDATE_PROBLEMS_SUCCEEDED,
  UPDATE_PROBLEMS_FAILED,
} from "../../main-process/database/fetch/updateProblems";
import {
  UPDATE_PROBLEM_MODELS,
  UPDATE_PROBLEM_MODELS_SUCCEEDED,
  UPDATE_PROBLEM_MODELS_FAILED,
} from "../../main-process/database/fetch/updateProblemModels";
import {
  UPDATE_CONTESTS,
  UPDATE_CONTESTS_SUCCEEDED,
  UPDATE_CONTESTS_FAILED,
} from "../../main-process/database/fetch/updateContests";
import {
  UPDATE_USER_SUBMISSIONS,
  UPDATE_USER_SUBMISSIONS_SUCCEEDED,
  UPDATE_USER_SUBMISSIONS_FAILED,
} from "../../main-process/database/fetch/updateUserSubmission";

type UpdateResult = "STAND_BY" | "SUCCEEDED" | "FAILED";

function Home(): JSX.Element {
  const [problems, setProblems] = useState<UpdateResult>("STAND_BY");
  const [problemModels, setProblemModels] = useState<UpdateResult>("STAND_BY");
  const [userSubmissions, setUserSubmissions] = useState<UpdateResult>(
    "STAND_BY"
  );
  const [contests, setContests] = useState<UpdateResult>("STAND_BY");

  const update = (): void => {
    //ipcRenderer.send(UPDATE_PROBLEMS);
    //ipcRenderer.send(UPDATE_CONTESTS);
    ipcRenderer.send(UPDATE_PROBLEM_MODELS);
    //ipcRenderer.send(UPDATE_USER_SUBMISSIONS);
  };

  function Result(result: UpdateResult): JSX.Element {
    switch (result) {
      case "STAND_BY":
        return <p>stand by</p>;
      case "SUCCEEDED":
        return <p>succeeded</p>;
      case "FAILED":
        return <p>failed</p>;
      default:
        return <p>???</p>;
    }
  }

  useEffect(() => {
    let mouted = true;
    ipcRenderer.on(UPDATE_PROBLEMS_SUCCEEDED, (_event) => {
      if (mouted) {
        console.log("update succeeded");
        setProblems("SUCCEEDED");
      }
    });
    ipcRenderer.on(UPDATE_PROBLEMS_FAILED, (_event) => {
      if (mouted) {
        setProblems("FAILED");
      }
    });
    ipcRenderer.on(UPDATE_PROBLEM_MODELS_SUCCEEDED, (_event, res, all) => {
      if (mouted) {
        console.log(`${res},  ${all}`);
        setProblemModels("SUCCEEDED");
      }
    });
    ipcRenderer.on(UPDATE_PROBLEM_MODELS_FAILED, (_event) => {
      if (mouted) {
        setProblemModels("FAILED");
      }
    });
    ipcRenderer.on(UPDATE_USER_SUBMISSIONS_SUCCEEDED, (_event) => {
      if (mouted) {
        setUserSubmissions("SUCCEEDED");
      }
    });
    ipcRenderer.on(UPDATE_USER_SUBMISSIONS_FAILED, (_event) => {
      if (mouted) {
        setUserSubmissions("FAILED");
      }
    });
    ipcRenderer.on(UPDATE_CONTESTS_SUCCEEDED, (_event) => {
      if (mouted) {
        setContests("SUCCEEDED");
      }
    });
    ipcRenderer.on(UPDATE_CONTESTS_FAILED, (_event) => {
      if (mouted) {
        setContests("FAILED");
      }
    });

    return () => {
      mouted = false;
    };
  }, []);

  return (
    <div>
      <div>
        <Typography variant="h2" gutterBottom>
          AtCoder Review
        </Typography>
      </div>
      <div>
        <Typography variant="h6">Update information of problems</Typography>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="body1">Problems</Typography>
          </Grid>
          <Grid item xs={3}>
            {(() => {
              switch (problems) {
                case "SUCCEEDED": return <p>ok</p>
                default: return  <p>???</p>
              }
            })()}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={9}>
            <Typography variant="body1">Problem Models</Typography>
          </Grid>
          <Grid item xs={3}>
            <Result {...problemModels} />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={9}>
            <Typography variant="body1">Contests</Typography>
          </Grid>
          <Grid item xs={3}>
            <Result {...contests} />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={9}>
            <Typography variant="body1">User Submissions</Typography>
          </Grid>
          <Grid item xs={3}>
            <Result {...userSubmissions} />
          </Grid>
        </Grid>
      </div>
      <div>
        <Button variant="outlined">CANCEL</Button>
        <Button variant="contained" color="primary" onClick={update}>
          UPDATE
        </Button>
      </div>
    </div>
  );
}

export default Home;
