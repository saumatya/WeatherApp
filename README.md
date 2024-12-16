# Weather App

## Overview
The Weather App is a React-based application that allows users to view current weather and weather forecast over time. The user can select from municipalities in Finland . It uses the [OpenWeather API](https://openweathermap.org/api) to fetch weather data based on search query. The app also provides interactive charts to display temperature, humidity. In addition, the app supports multiple languages with **i18next** for internationalization.

## How to use?
- Register for an API key from [OpenWeatherMap](https://openweathermap.org/api) and store it securely.
-Register for an API key from [Google Gemini](https://ai.google.dev/gemini-api/docs) and store it securely.
- Create a `.env` file in your project root directory to store your API key (e.g., `REACT_APP_WEATHER_API_KEY=your-api-key-here`, `REACT_APP_GEMINI_KEY=your-gemini-key`).

## Key Features
- Displays municipalities in Finland in Swedish and Finnish.
- Displays current and forecast weather information (temperature, humidity, etc.)
- Multi-language support through **i18next**
- Displays municipality description from AI text generation
- Interactive charts using **Chart.js** to visualize weather trends
- Ability to switch between metric, imperial and standard unit system
- Ability to favorite a municipality
- Responsive design that adapts to different screen sizes

## Technologies Used
- **React** for efficient UI rendering and state management
- **Chart.js** for weather data visualization (charts and graphs)
- **i18next** for adding multi-language support
- **OpenWeatherMap API** for fetching live weather data
- **Gemini Text Generator API** for fetching description of municipality

# Municipalities List
The complete list of municipalities in Finland was fetched from [Stat.fi](https://stat.fi/en/luokitukset/kunta/kunta_1_20240101)
The latest classification for municipalities "kunta_1_20240101" was used and is valid until 31/12/2024. After than may need to update the classification name to the latest. The database provides both Finnish and Swedish municipalities name.




## Testing Methodologies

### Postman Testing
Before development, Postman was used extensively to validate API endpoints, including the proper handling of API parameters such as location and weather data formats. Key aspects tested include:
- Correct responses to different queries (e.g., location by name or coordinates)
- Response structure validation
- Simulation of various error scenarios (e.g., API key errors, invalid locations)

The **JSON Tree Viewer** was primarily used for:
- **Drilling down** into deeply nested JSON objects and arrays returned from API calls.
- **Visually navigating** large datasets, making it easier to identify key information like weather conditions, temperatures, and wind speed.
- **Debugging and Validation** by comparing raw API responses with expected values and ensuring correct data parsing in the app.


### Chrome Dev Tools Usage
Chrome Developer Tools were instrumental for testing and debugging:
- **Console**: `console.log()` statements were used for debugging the application and checking data responses.
- **Network Tab**: API requests and responses were monitored in real-time to ensure correct data fetching and error handling. Easy to check if the endpoint url , request payload  is correct.
- **Application Tab**: The data stored in local storage like language setting and favorite places can be viewed here.

These testing methods ensured the app's functionality and robustness, confirming that weather data was accurate and the UI was user-friendly.

## Prototype and Requirement Analysis

### API Documentation Review
- The **OpenWeather API** documentation was reviewed in detail to understand its endpoints, limitations, and available data.
- Identified relevant endpoints for weather data (current weather, forecast) and data formats needed for display.

### Brainstorming Ideas
- Identified user requirements such as viewing current weather, visualizing trends, and offering multi-language support.
- Decided to use **Chart.js** for displaying weather data trends (temperature, humidity).
- Decided to use **Gemini** for text generation as it was free.

### Prototype Development
- A rough prototype was developed in **Figma**, focusing on core UI elements and the overall user experience.
- Hand sketches were created and components created based on it for UI development.

## Usage
1. Enter a municipality in the search field.
2. The app fetches and displays current weather data for the place.
3. View interactive charts showing current and forecast information like temperature and humidity , pressure windspeed, clouds further visualised with **Chart.js**.
4. Switch between languages using the **i18next** support.
5. Optionally switch temperature units between Celsius and Fahrenheit, m/s and mph for windspeed.

## Challenges Encountered

### Limitations of Gemini API
During development, one challenge I faced was handling the limited free API quota from Gemini, especially when fetching data frequently. I used the model gemini-1.5-flash model which was quite slow to fetch around 4s. 


#### Resolution
Added generationConfig and tweaked the values of temperature,maxOutputTokens,topP,topK for faster response. It made the response faster although still slow for the application. Created separate fetching for description lazy loading so that other elements of our app is not lagging.

### Language Support Implementation
Integrating multi-language support using **i18next** presented an initial challenge due to the varying translations of weather terminology. Ensuring that terms like "Clear", "Cloudy", and "Rainy" appeared correctly in all supported languages took additional effort.

#### Resolution
I thoroughly tested language strings and their integration into the UI to ensure correct and consistent translations. This made the app accessible to a wider audience by offering localized weather descriptions in different languages.

---

## Future Enhancements
- Add the ability to display additional weather details like wind speed, air quality, etc.
- Integrate user authentication to save user preferences (location, unit preferences, etc.)
- Implement real-time weather notifications for updates or sudden changes in weather conditions.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
