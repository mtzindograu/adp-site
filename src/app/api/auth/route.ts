import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { hashSync, compareSync } from "bcryptjs";
import { cookies } from "next/headers";

const ADMIN_SESSION = "adp_admin_session";

// Simple session-based auth using cookies
function createToken(): string {
  return crypto.randomUUID() + "-" + Date.now().toString(36);
}

// GET - Check auth status
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION)?.value;

  if (token) {
    const stored = process.env.ADMIN_SESSIONS?.split(",").includes(token);
    if (stored) {
      return NextResponse.json({ authenticated: true });
    }
  }
  return NextResponse.json({ authenticated: false });
}

// POST - Login
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    if (!compareSync(password, user.password)) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const token = createToken();
    // Store token in env (simple approach for single-admin)
    const sessions = process.env.ADMIN_SESSIONS
      ? process.env.ADMIN_SESSIONS + "," + token
      : token;
    process.env.ADMIN_SESSIONS = sessions;

    const response = NextResponse.json({
      message: "Login realizado com sucesso",
      user: { id: user.id, email: user.email, name: user.name },
    });

    response.cookies.set(ADMIN_SESSION, token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// DELETE - Logout
export async function DELETE() {
  const response = NextResponse.json({ message: "Logout realizado" });
  response.cookies.set(ADMIN_SESSION, "", { maxAge: 0, path: "/" });
  return response;
}

// Helper: Check if request is authenticated (for other API routes)
export async function checkAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_SESSION)?.value;
  if (!token) return false;
  return process.env.ADMIN_SESSIONS?.split(",").includes(token) ?? false;
}

// Helper: Hash password
export function hashPassword(password: string): string {
  return hashSync(password, 10);
}
