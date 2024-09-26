import Destinations from "@/models/Destinations";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const destination = await Destinations.findById(id);
      if (!destination) {
        return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
      }
      return NextResponse.json(destination);
    } else {
      const destinations = await Destinations.find(); // Fetch all destinations
      return NextResponse.json(destinations); // Return destinations list
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}