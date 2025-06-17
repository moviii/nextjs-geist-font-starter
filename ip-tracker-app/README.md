# Real IP Tracker App

This is a Next.js app to track IP addresses and display geolocation information with an interactive map.

## Setup and Run

1. Ensure you have Node.js and npm installed.
2. Navigate to the project directory:
   ```bash
   cd ip-tracker-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server on port 8000:
   ```bash
   PORT=8000 npm run dev
   ```
5. Open your browser and go to:
   ```
   http://localhost:8000
   ```

## Notes

- The editor may show warnings about unknown `@tailwind` at-rules in `globals.css`. These are normal if Tailwind CSS IntelliSense is not installed or configured.
- The app uses Leaflet for map rendering and fetches IP data from [ipapi.co](https://ipapi.co/).

Feel free to reach out if you need help or want to customize the app.
