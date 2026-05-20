# Commute Planner

A mobile-friendly PWA for planning your daily commute with BART and driving options.

## Features

- **BART Day Mode**: Calculate when to wake up based on BART schedule
- **Drive Day Mode**: Plan your drive with real-time traffic data
- **Dynamic Traffic**: Uses Google Maps API for accurate drive times
- **PWA**: Install on your phone's home screen
- **Offline Support**: Works without internet after first load

## Deployment

This app needs to be deployed on Vercel (free) to use the traffic features.

### Quick Deploy

1. **Fork or clone this repo**

2. **Get Google Maps API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a project
   - Enable "Distance Matrix API"
   - Create an API key
   - Restrict it:
     - HTTP referrers: `https://your-app.vercel.app/*`
     - API: Distance Matrix API only

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import this repository
   - Click "Deploy"
   - Done! Your app will be at `https://your-project.vercel.app`

4. **Configure the app**
   - Open your deployed app
   - Click ⚙️ Settings
   - Enter:
     - API Key
     - Home address
     - Office address
     - Buffer preference
   - Save settings

5. **Use Dynamic Mode**
   - Go to Drive Day tab
   - Click "Dynamic (Maps API)"
   - App will fetch real traffic data

## Local Development

Open `index.html` in a browser. Dynamic traffic will only work after deploying to Vercel.

## API Cost

Google Maps Distance Matrix API:
- Free tier: 40,000 requests/month
- Your usage: ~10-20 requests/day = ~600/month
- Well within free limits!
