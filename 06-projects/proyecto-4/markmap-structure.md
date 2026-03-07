# smart-cooler-ui

## Raíz
### README.md
### package.json
### package-lock.json
### vite.config.js
### tailwind.config.js
### eslint.config.js
### jsconfig.json
### index.html
### vercel.json
### .gitignore

## public

## src
### App.jsx
### main.jsx

### assets
#### styles
##### App.css

#### images
##### fondo-1.jpg
##### fondo-2.jpg
##### fondo-3.gif
##### fondo-4.gif
##### recipes-bg.jpg

#### icons (weather)
##### export.js
##### day.svg
##### night.svg
##### cloudy.svg
##### rainy-*.svg
##### snowy-*.svg
##### thunder.svg

#### fonts (Poppins)
##### OFL.txt
##### Poppins-Bold.ttf
##### Poppins-Light.ttf
##### Poppins-Medium.ttf
##### Poppins-Regular.ttf
##### Poppins-SemiBold.ttf
##### Poppins-Thin.ttf

### Components

#### hardware
##### DeviceShell.jsx

#### screens
##### HomeScreens.jsx

##### screen_1
###### HomePanel.jsx

###### header
####### Header.jsx
####### Nav.jsx
####### TopBar.jsx

###### ui/settings
####### SettingsHeader.jsx

###### ui/cards
####### Card.jsx
####### CardTime.jsx
####### CardWeather.jsx
####### CardShoppingList.jsx
####### CardRecipe.jsx

###### main/inventory/components
####### InventoryMainForm.jsx
####### InventorySettings.jsx

###### main/inventory/hooks
####### useInventory.jsx
####### useInventoryRecipeSuggestions.jsx

###### main/inventory/constants
####### recipeSuggestions.js

###### features/time/components
####### TimeSettings.jsx
####### TimeEditorModal.jsx

###### features/time/hooks
####### useDateTime.jsx
####### useSettings.jsx

###### features/weather/hooks
####### useWeather.jsx

###### features/weather/utils
####### weatherParser.js
####### getWeatherGradient.js

###### features/weather/constants
####### weatherGradients.js

###### features/weather/components
####### weatherIcon.jsx
####### weatherIconMini.jsx

####### Settings
######## WeatherSettings.jsx
######## WeatherSettingsShell.jsx
######## weatherTranslations.es.js
######## forecastMath.js
######## formatDay.esCL.js
######## CurrentWeatherCard.jsx
######## HourlyForecast.jsx
######## TemperatureRangeBar.jsx
######## ForecastPreviewCard.jsx
######## ForecastDayRow.jsx
######## FullForecastModal.jsx
######## WeatherQuickGrid.jsx
######## MetricCard.jsx
######## PressureFooter.jsx
######## ProgressFooter.jsx
######## metricThresholds.js
######## metricFormatters.js

###### features/shopping/components
####### ShoppingListSettings.jsx

###### features/shopping/hooks
####### useSmartShoppingList.jsx

##### screen_2
###### SystemPanel.jsx

###### ui/cards
####### SystemPanelCard.jsx
####### CardHomeCare.jsx
####### CardEnergy.jsx
####### CardDevices.jsx
####### CardAlerts.jsx
