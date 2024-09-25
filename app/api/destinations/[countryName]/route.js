import Destinations from "@/models/Destinations";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET(request, { params }) {
  const { countryName } = params;

  try {
    const destinations = await Destinations.find({ countryName: countryName.toLowerCase() }); // Fetch destinations by countryName
    if (destinations.length > 0) {
      return NextResponse.json(destinations); // Return filtered destinations
    } else {
      return NextResponse.json({ error: 'No destinations found for the specified country' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}