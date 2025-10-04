"use server";

import * as fs from "node:fs";
import { Highscore } from "@/app/types/highscore";

export async function GET() {
  let scores: Highscore[] = [{ name: "", score: 0 }];

  try {
    scores = JSON.parse(fs.readFileSync("./scores.json", "utf-8"));
  } catch (e) {}

  return new Response(
    JSON.stringify(scores.sort((a, b) => b.score - a.score)[0]),
    { status: 200 },
  );
}
