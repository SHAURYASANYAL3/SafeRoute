import { signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/firebase/config";
import type { Escalation, Trip, TrustedContact, User } from "@/types";

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function endSession() {
  return signOut(auth);
}

export async function upsertUserProfile(user: User) {
  return setDoc(doc(db, "users", user.uid), user, { merge: true });
}

export async function createTripRecord(userId: string, trip: Trip) {
  return setDoc(doc(db, "users", userId, "trips", trip.tripId), {
    ...trip,
    startedAt: serverTimestamp(),
  });
}

export async function storeTrustedContact(userId: string, contact: TrustedContact) {
  return setDoc(doc(db, "users", userId, "trustedContacts", contact.id), contact, { merge: true });
}

export async function logEscalation(userId: string, escalation: Escalation) {
  return addDoc(collection(db, "users", userId, "escalations"), {
    ...escalation,
    triggeredAt: serverTimestamp(),
  });
}
