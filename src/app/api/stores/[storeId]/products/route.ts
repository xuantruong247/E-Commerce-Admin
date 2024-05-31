import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { url } from "inspector";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFetured,
      isArchived,
    } = body;
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (
      !name ||
      !price ||
      !categoryId ||
      !colorId ||
      !sizeId ||
      !images ||
      !isArchived ||
      !isFetured
    )
      return new NextResponse("Missing text", { status: 400 });

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

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

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isArchived,
        isFetured,
        colorId,
        sizeId,
        categoryId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((images: { url: string }) => images)],
          },
        },
      },
    });
    return NextResponse.json(product);
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
