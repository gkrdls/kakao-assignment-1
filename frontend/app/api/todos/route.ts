import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8000";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const url = new URL(`${backendUrl}/todos`);

  if (date) {
    url.searchParams.set("date", date);
  }

  const response = await fetch(url, {
    cache: "no-store",
  });
  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await fetch(`${backendUrl}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const response = await fetch(`${backendUrl}/todos/${body.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: body.title,
      completed: body.completed,
      date: body.date,
    }),
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const response = await fetch(`${backendUrl}/todos/${id}`, {
    method: "DELETE",
  });

  if (response.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
