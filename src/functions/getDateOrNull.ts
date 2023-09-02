import { Timestamp } from "firebase/firestore";

export default function getDateOrNull(date: Timestamp) {
  return date ? date.toDate() : null;
}
