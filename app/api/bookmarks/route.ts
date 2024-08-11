import { addDoc, collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../firebase.config";
import { Bookmark } from "@/app/types";

export async function GET() {
  let bookmarks: Bookmark[] = [];

  await getDocs(collection(db, "bookmarks")).then(({ docs }) => {
    docs.map((item: { id: string; data: any }) =>
      bookmarks.push({ id: item.id, ...item.data() })
    );
  });

  return NextResponse.json(bookmarks);
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { id } = await addDoc(collection(db, "bookmarks"), data);

  return NextResponse.json({ id, ...data });
}
