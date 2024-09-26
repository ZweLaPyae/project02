import Travelers from "@/models/Travelers";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email query parameter is required' }, { status: 400 });
    }

    const traveler = await Travelers.findOne({ email }); // Fetch traveler by email

    if (!traveler) {
      return NextResponse.json({ error: 'Traveler not found' }, { status: 404 });
    }

    return NextResponse.json(traveler); // Return traveler data
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch traveler' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { email, username, country, age, phoneNumber, description, avatarImageUrl } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const traveler = await Travelers.findOne({ email });

    if (!traveler) {
      return NextResponse.json({ error: 'Traveler not found' }, { status: 404 });
    }

    traveler.username = username || traveler.username;
    traveler.country = country || traveler.country;
    traveler.age = age || traveler.age;
    traveler.phoneNumber = phoneNumber || traveler.phoneNumber;
    traveler.description = description || traveler.description;
    traveler.avatarImageUrl = avatarImageUrl || traveler.avatarImageUrl;

    await traveler.save();

    return NextResponse.json(traveler); // Return updated traveler data
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update traveler' }, { status: 500 });
  }
}