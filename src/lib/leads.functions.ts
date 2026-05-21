import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1Me2z4x-tamTk93orR9UuUdTG0tVOD3NZkAYBT9gg3IE";
const SHEET_NAME = "Página1";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

const leadSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(25),
});

export const saveLead = createServerFn({ method: "POST" })
  .inputValidator((input) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
    if (!GOOGLE_SHEETS_API_KEY) throw new Error("GOOGLE_SHEETS_API_KEY is not configured");

    const headers = {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
      "Content-Type": "application/json",
    };

    // Ensure header row exists
    const range = `${SHEET_NAME}!A1:D1`;
    const headerCheck = await fetch(
      `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${range}`,
      { headers },
    );
    if (!headerCheck.ok) {
      throw new Error(`Sheets read failed [${headerCheck.status}]: ${await headerCheck.text()}`);
    }
    const headerData = (await headerCheck.json()) as { values?: string[][] };
    if (!headerData.values || headerData.values.length === 0) {
      const initRes = await fetch(
        `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=RAW`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            values: [["Timestamp", "Full Name", "Email", "Phone"]],
          }),
        },
      );
      if (!initRes.ok) {
        throw new Error(`Sheets header init failed [${initRes.status}]: ${await initRes.text()}`);
      }
    }

    const appendRange = `${SHEET_NAME}!A:D`;
    const res = await fetch(
      `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${appendRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          values: [[new Date().toISOString(), data.fullName, data.email, data.phone]],
        }),
      },
    );
    if (!res.ok) {
      throw new Error(`Sheets append failed [${res.status}]: ${await res.text()}`);
    }
    return { ok: true };
  });
