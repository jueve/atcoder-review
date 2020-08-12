import { FQCandidate } from "../wrapper/types";
import { List } from "immutable";
import { ActionOnInsertManipulation, ClassifiedCandidates } from "./types";

export const reducer = (
  state: ClassifiedCandidates,
  action: ActionOnInsertManipulation
): ClassifiedCandidates => {
  switch (action.mode) {
    case "ADD":
      switch (action.kind) {
        case "ABC":
          state.abc = action.candidates;
          return state;
        case "ARC":
          state.arc = action.candidates;
          return state;
        case "AGC":
          state.agc = action.candidates;
          return state;
        case "JOI":
          state.joi = action.candidates;
          return state;
        case "PAST":
          state.past = action.candidates;
          return state;
        case "JAG":
          state.jag = action.candidates;
          return state;
        case "OTHER_RATED":
          state.other_rated = action.candidates;
          return state;
        case "OTHER_UNRATED":
          state.other_unrated = action.candidates;
          return state;
        default:
          return state;
      }
    case "CLEAR":
      return {
        abc: List<FQCandidate>(),
        arc: List<FQCandidate>(),
        agc: List<FQCandidate>(),
        joi: List<FQCandidate>(),
        past: List<FQCandidate>(),
        jag: List<FQCandidate>(),
        other_rated: List<FQCandidate>(),
        other_unrated: List<FQCandidate>(),
      };
  }
};
