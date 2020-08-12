import { FQCandidate } from "../wrapper/types";
import { ClassifiedCandidates } from "./types";
import { List } from "immutable";

const searchKey = (fqc: FQCandidate): string => {
  const abc = RegExp("AtCoder Beginner Contest").test(fqc.contest_title);
  const arc = RegExp("AtCoder Regular Contest").test(fqc.contest_title);
  const agc = RegExp("AtCoder Grand Contest").test(fqc.contest_title);
  const joi = RegExp("joi").test(fqc.contest_id);
  const past = RegExp("past").test(fqc.contest_id);
  const jag = RegExp("jag").test(fqc.contest_id);
  const otherUnrated = RegExp("-").test(fqc.rate_change);

  if (abc) {
    return "abc";
  } else if (arc) {
    return "arc";
  } else if (agc) {
    return "agc";
  } else if (joi) {
    return "joi";
  } else if (past) {
    return "past";
  } else if (jag) {
    return "jag";
  } else if (otherUnrated) {
    return "other_unrated";
  } else {
    return "other_rated";
  }
};

export const createClassifiedCandidates = (
  candidates: Array<FQCandidate>
): ClassifiedCandidates => {
  candidates.sort((a, b) => b.start_epoch_second - a.start_epoch_second);
  const tmp: ClassifiedCandidates = {
    abc: List<FQCandidate>(),
    arc: List<FQCandidate>(),
    agc: List<FQCandidate>(),
    joi: List<FQCandidate>(),
    past: List<FQCandidate>(),
    jag: List<FQCandidate>(),
    other_rated: List<FQCandidate>(),
    other_unrated: List<FQCandidate>(),
  };

  candidates.forEach((c: FQCandidate) => {
    const key: string = searchKey(c);
    switch (key) {
      case "abc":
        tmp.abc = tmp.abc.push(c);
        break;
      case "arc":
        tmp.arc = tmp.arc.push(c);
        break;
      case "agc":
        tmp.agc = tmp.agc.push(c);
        break;
      case "joi":
        tmp.joi = tmp.joi.push(c);
        break;
      case "past":
        tmp.past = tmp.past.push(c);
        break;
      case "jag":
        tmp.jag = tmp.jag.push(c);
        break;
      case "other_unrated":
        tmp.other_unrated = tmp.other_unrated.push(c);
        break;
      case "other_rated":
        tmp.other_rated = tmp.other_rated.push(c);
        break;
      default:
        tmp.other_rated = tmp.other_rated.push(c);
        break;
    }
  });

  return tmp;
};
