# Image Generation Contest Website

A modern, responsive website for hosting an image generation contest. The website allows users to submit their generated images along with their contact information. Images are automatically hosted on Imgur and submissions are tracked in Google Sheets with image previews.

## Setup Instructions

1. Set up Imgur API:
   - Go to [Imgur API Registration](https://api.imgur.com/oauth2/addclient)
   - Register for an API key (select "OAuth 2 authorization without a callback URL")
   - Copy your Client ID
   - In `app.js`, replace `YOUR_IMGUR_CLIENT_ID` with your Imgur Client ID

2. Create a Google Apps Script:
   - Create a new Google Sheet
   - From your sheet's URL, copy the Spreadsheet ID (the long string between /d/ and /edit)
   - Go to [Google Apps Script](https://script.google.com/)
   - Create a new project
   - Copy and paste the code from `google-apps-script.js` into your project
   - Replace `YOUR_SPREADSHEET_ID` with the ID you copied from your sheet

3. Deploy the Google Apps Script:
   - Click "Deploy" > "New deployment"
   - Choose "Web app"
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Copy the deployment URL
   - In `app.js`, replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with your deployment URL

4. Set up the Google Sheet:
   - Create the following column headers:
     - Timestamp
     - Name
     - Email
     - Image
     - Mailing List

5. Host on GitHub Pages:
   - Create a new GitHub repository
   - Push these files to the repository
   - Go to repository Settings > Pages
   - Enable GitHub Pages from your main branch

## Features

- Modern, responsive design
- Automatic image hosting on Imgur
- Image preview before submission
- Form validation
- Google Sheets integration with image previews
- Success notifications
- Mailing list opt-in
- Loading states during submission

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Imgur API
- Google Apps Script
- Google Sheets API

## Security Notes

- The Imgur Client ID is visible in the frontend code. This is acceptable for this use case as Client IDs are public.
- For additional security, consider implementing rate limiting and input validation on the server side.
- The Google Apps Script is configured to run as you (the owner) and accepts requests from anyone. This is suitable for a contest submission form but should be monitored for abuse.

## Features

- Modern, responsive design
- Image preview before submission
- Form validation
- Google Sheets integration for data collection
- Success notifications
- Mailing list opt-in

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Google Apps Script
- Google Sheets API
