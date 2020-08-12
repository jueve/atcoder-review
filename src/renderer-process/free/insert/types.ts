import { List } from "immutable";
import { FQCandidate } from "../wrapper/types";

export type Mode = "ADD" | "CLEAR";
export type Kinds =
  | "ABC"
  | "ARC"
  | "AGC"
  | "JOI"
  | "PAST"
  | "JAG"
  | "OTHER_RATED"
  | "OTHER_UNRATED";

export interface ActionOnInsertManipulation {
  mode: Mode;
  kind?: Kinds;
  candidates?: List<FQCandidate>;
}

export interface ClassifiedCandidates {
  abc: List<FQCandidate>;
  arc: List<FQCandidate>;
  agc: List<FQCandidate>;
  joi: List<FQCandidate>;
  past: List<FQCandidate>;
  jag: List<FQCandidate>;
  other_rated: List<FQCandidate>;
  other_unrated: List<FQCandidate>;
}
