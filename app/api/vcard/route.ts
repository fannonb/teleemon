import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

/** Serves the vCard with mobile-friendly headers so phones open “Add Contact”. */
export async function GET() {
  const filePath = path.join(process.cwd(), "public", "frank-bashumika.vcf");
  const body = await readFile(filePath, "utf8");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="frank-bashumika.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
