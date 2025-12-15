import * as fs from "node:fs";
import * as path from "node:path";
import { validatePizza } from "./pizza";

function readJsonFile(filePath: string): unknown {
  const absolute = path.resolve(process.cwd(), filePath);
  const raw = fs.readFileSync(absolute, "utf8");
  return JSON.parse(raw);
}

export function main(): void {
  const args = process.argv.slice(2);
  const file = args[0];

  if (!file) {
    console.error("Usage: pizza-validator <pizza.json>");
    process.exit(1);
    return;
  }

  console.log("Input file:", file);

  let data: unknown;
  try {
    data = readJsonFile(file);
  } catch (err) {
    console.error(`Error reading file "${file}": ${(err as Error).message}`);
    process.exit(1);
    return;
  }

  const result = validatePizza(data);

  if (result.isPizza) {
    console.log("Valid pizza!");
    console.log(JSON.stringify(result.pizza, null, 2));
    process.exit(0);
  } else {
    console.error("Invalid pizza. Reasons:");
    for (const msg of result.errors) {
      console.error(" -", msg);
    }
    process.exit(1);
  }
}

main();
