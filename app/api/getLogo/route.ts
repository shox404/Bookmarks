import { NextRequest, NextResponse } from "next/server";

const GETTER = require("get-website-favicon");

interface Icons {
  src: string;
  sizes: string;
  type: string;
  origin: string;
  rank: number;
}

type WebData = {
  url: string;
  baseUrl: string;
  originUrl: string;
  icons: Icons[];
};

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { icons }: WebData = await GETTER(data.url);

  const icon = icons[0].src;

  return NextResponse.json(icon ? icon : "", {
    status: icon ? 200 : 500,
  });
}
