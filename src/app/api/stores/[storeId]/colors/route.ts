import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("Label is required", { status: 400 });

    if (!value)
      return new NextResponse("Image URL  is required", { status: 400 });

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      if (!userId) return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_POST]", error);
    return new NextResponse("Interal Error Server", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Interal Error Server", { status: 500 });
  }
};
