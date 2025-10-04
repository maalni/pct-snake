"use server";

import * as fs from "node:fs";
import { Highscore } from "@/app/types/highscore";

export async function GET() {
  let scores: Highscore[] = [];

  try {
    scores = JSON.parse(fs.readFileSync("./scores.json", "utf-8"));
  } catch (e) {}

  return new Response(
    JSON.stringify(scores.sort((a, b) => b.score - a.score).slice(0, 10)),
    { status: 200 },
  );
}

export async function PUT(request: Request) {
  let scores: Highscore[] = [];
  const newScore: Highscore = await request.json();

  try {
    scores = JSON.parse(fs.readFileSync("./scores.json", "utf-8"));
  } catch (e) {}

  scores.push(newScore);
  fs.writeFileSync("./scores.json", JSON.stringify(scores));

  return new Response("", { status: 200 });
}
