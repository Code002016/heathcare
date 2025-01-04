import { NextResponse } from "next/server";
import { encryptKey } from "@/lib/utils";

const validPasskey = process.env.NEXT_PUBLIC_ADMIN_PASSKEY;

export async function POST(req: Request) {
  try {
    const { passkey } = await req.json();

    if (!passkey) {
      return NextResponse.json({ error: "Passkey is required" }, { status: 400 });
    }

    const encryptedPasskey = encryptKey(passkey);
    const encryptedValidPasskey = encryptKey(validPasskey!);

    if (encryptedPasskey === encryptedValidPasskey) {
      return NextResponse.json({ success: true, passkey: encryptedPasskey });
    } else {
      return NextResponse.json({ error: "Invalid passkey" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error validating passkey:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
