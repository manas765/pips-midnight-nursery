import sharp from "sharp";
import { readdirSync } from "fs";

for (const f of readdirSync("public").filter((n) => n.endsWith(".png"))) {
    const out = "public/" + f.replace(".png", ".webp");
    await sharp("public/" + f)
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
    console.log("made", out);
}