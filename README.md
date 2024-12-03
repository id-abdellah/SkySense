# SkySense

![alt](public/Logo.png)

**SkySense** is a web application for finding out the weather conditions all over the world.

## 🌐 Live Demo

Check out the live version here: [Live Demo Link](https://openskysense.netlify.app/)

## ✨ Features

- 📱 **Responsive Design**: Adaptable to all screen sizes for seamless user experience.
- 🌗 **Dark and Light Mode Support**: Easily switch between dark and light themes.
- 🌐 **Bilingual Support**: Fully supports Arabic and English languages.
- ☁️ **Global Weather Search**: Get weather updates for any city worldwide.
- 📆 **5-Day Weather Forecasts**: View detailed forecasts for the next five days for a specific city.
- 📌 **City Favorites**: Save cities for quick access to their weather updates without searching each time.
- 🗺️ **Interactive Map**: Displays your favorite cities on an interactive map with their weather information.
- 👆 **On-Map Weather Updates**: Click any location on the map to view its current weather.
- 📍 **Current Location Weather**: Quickly access weather updates for your current location.
- 🔄 **Unit Customization**: Toggle between units for temperature, wind speed, pressure, and more.

## 🛠️ Tech Stak

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" height="25">
<img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML" height="25">
<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS" height="25">
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Sass" height="25">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" height="25">
<img src="https://img.shields.io/badge/Context_API-61DAFB?style=for-the-badge&logo=react&logoColor=20232A" alt="Context API" height="25">
<img src="https://img.shields.io/badge/i18n-26A69A?style=for-the-badge&logo=polymer-project&logoColor=white" alt="i18n" height="25">
<img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet" height="25">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" height="25">
<img src="https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=font-awesome&logoColor=white" alt="Font Awesome" height="25">
<img src="https://img.shields.io/badge/OpenWeatherMap_API-0078D4?style=for-the-badge&logo=openweathermap&logoColor=white" alt="OpenWeatherMap API" height="25">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" height="25">
<img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="TanStack Query" height="25">
</div>

## 📸 Screenshots

![Home page view](public/demo/desktop-1.png)
![Favorite cities view](public/demo/desktop-2.png)
![Map view](public/demo/desktop-3.png)
![Phone views](public/demo/phone.png)

## ⚙️ Run Locally

### How to Run the Project Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/id-abdellah/SkySense.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd SkySense
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Obtain an API Key from OpenWeatherMap**

   - Go to [OpenWeatherMap](https://openweathermap.org/), create an account, and generate your API key.

5. **Create a `.env` File**

   - In the project root directory, create a file named `.env`.

6. **Add Your API Key to the `.env` File**

   - Open the `.env` file and add the following line:
     ```env
     VITE_API_KEY=your_api_key
     ```
   - Replace `your_api_key` with the actual API key you obtained from OpenWeatherMap.

7. **Start the Development Server**

   ```bash
   npm run dev
   ```

8. **Access the Project in Your Browser**

## 📄 License

This project is licensed under the [MIT LICENSE](https://choosealicense.com/licenses/mit/)
