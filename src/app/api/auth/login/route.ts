import { NextResponse } from 'next/server';
import {login} from "@/services/login/login";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        await login(username, password);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: `Invalid credentials ${error}`}, { status: 401 });
    }
}
