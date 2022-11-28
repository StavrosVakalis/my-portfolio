"use strict"

import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export function getSlugs(target) {
  return fs.readdirSync(join(process.cwd(), `_${target}`));
}

export function getBySlug(target, slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(join(process.cwd(), `_${target}`), `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllRecords(target, fields = []) {
  const slugs = getSlugs(target);
  const records = slugs
    .map((slug) => getBySlug(target, slug, fields))
    // sort posts by date in descending order
    .sort((r1, r2) => (r1.date > r2.date ? -1 : 1));
  return records;
}
