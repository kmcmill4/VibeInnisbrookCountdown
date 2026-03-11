import { NextResponse } from 'next/server';

const WEATHER_API_KEY = '55b781e9b05a45d3b73235951261003';
const LOCATION = '36750 US Highway 19 North, Palm Harbor, FL 34684';

// Map WeatherAPI condition codes to emojis
const getWeatherEmoji = (condition: string): string => {
  const lower = condition.toLowerCase();
  
  if (lower.includes('sunny') || lower.includes('clear')) return '☀️';
  if (lower.includes('partly cloudy')) return '⛅';
  if (lower.includes('cloudy') || lower.includes('overcast')) return '☁️';
  if (lower.includes('rain') || lower.includes('drizzle')) return '🌧️';
  if (lower.includes('thunder') || lower.includes('storm')) return '⛈️';
  if (lower.includes('snow')) return '❄️';
  if (lower.includes('mist') || lower.includes('fog')) return '🌫️';
  
  return '🌤️'; // Default
};

// Format date to "5/15" format
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

// Get day name abbreviation
const getDayName = (dateStr: string): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(dateStr);
  return days[date.getDay()];
};

export async function GET() {
  try {
    // Fetch 3-day forecast from WeatherAPI.com
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(LOCATION)}&days=3&aqi=no`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data = await response.json();

    // Transform the data into our format
    const forecast = data.forecast.forecastday.map((day: any) => ({
      date: formatDate(day.date),
      day: getDayName(day.date),
      high: Math.round(day.day.maxtemp_f),
      low: Math.round(day.day.mintemp_f),
      condition: day.day.condition.text,
      icon: getWeatherEmoji(day.day.condition.text),
      wind_mph: Math.round(day.day.maxwind_mph),
      wind_dir: day.hour[12]?.wind_dir || 'N/A', // Use noon wind direction
      precip_chance: Math.round(day.day.daily_chance_of_rain),
      humidity: Math.round(day.day.avghumidity),
    }));

    return NextResponse.json({ forecast });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
