import prismadb from "@/lib/prismaDB";
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const body = await req.json();
    const { name } = body;
    if (!name) return new NextResponse("Name is required", { status: 400 });
    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json(store)
  } catch (error) {
    console.log("[STORE _POST]", error);
    return new NextResponse("Interal Error Server", { status: 500 });
  }
};
