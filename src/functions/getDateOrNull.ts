import { Timestamp } from "firebase/firestore";

export default function getDateOrNull(date: Timestamp | null) {
  return date ? date.toDate() : null;
}
