/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// API OBJECT\nconst api = {\n    key: \"55a539ce4fb64989fe8e9c476b486c21\",\n    baseurl: \"https://api.openweathermap.org/data/2.5/\"\n}\n\n// EVENT LISTENER TO GET AND SET WEATHER DEPENDING ON COORDINATES\nwindow.addEventListener(\"load\", () => {\n    let long;\n    let lat;\n\n    if (navigator.geolocation) {\n        navigator.geolocation.getCurrentPosition(position => {\n            long = position.coords.longitude;\n            lat = position.coords.latitude;\n\n            fetch(`${api.baseurl}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)\n                .then(weather => {\n                    return weather.json();\n                }).then(displayResults);\n        }, showError);\n    }\n});\n\n// ERROR MESSAGE FOR DENIED GEOLOCATION\nconst notificationElement = document.querySelector(\".notification\");\nconst weatherEl = document.querySelector(\".current .weather\");\n\nfunction showError() {\n    if (weatherEl.innerText === \"-\") {\n        notificationElement.style.display = \"block\";\n        notificationElement.innerHTML = `<p>User denied geolocation</p>`;\n        console.log(\"Checking if info displayed...\");\n    } else {\n        notificationElement.style.display = \"none\";\n    }\n}\n\n// INTERVAL CHECK TO REMOVE ERROR MESSAGE IF USER HAS SEARCHED FOR A CITY\nsetInterval(showError, 1000);\nif (notificationElement.style.display === \"none\") {\n    clearInterval();\n}\n\n// SEARCH INPUT SELECTION AND KEYPRESS EVENT LISTENER\nconst searchInput = document.querySelector(\".search-input\");\nsearchInput.addEventListener(\"keypress\", setQuery);\n\n// EVENT LISTENER FOR SEARCH INPUT\nfunction setQuery(e) {\n    if (e.key === \"Enter\") {\n        getResults(searchInput.value);\n        searchInput.value = \"\";\n        searchInput.blur();\n    }\n}\n\n// API FETCH FUNCTION\nfunction getResults(query) {\n    fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)\n        .then(weather => {\n            return weather.json();\n        }).then(displayResults)\n}\n\n// DISPLAY RESULTS FUNCTION TO CHANGE DISPLAYED HTML TEXT\nfunction displayResults(weather) {\n    let icon = document.querySelector(\".weather-icon\");\n    icon.innerHTML = `<img src=\"icons/${weather.weather[0].icon}.svg\"/>`;\n\n    let city = document.querySelector(\".location .city\");\n    city.innerText = `${weather.name}, ${weather.sys.country}`;\n\n    let now = new Date();\n    let date = document.querySelector(\".location .date\");\n    date.innerText = dateBuilder(now);\n\n    let temp = document.querySelector(\".current .temp\");\n    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;\n\n    let weatherEl = document.querySelector(\".current .weather\");\n    weatherEl.innerText = weather.weather[0].main;\n}\n\n// DATE BUILDER FUNCTION\nfunction dateBuilder(d) {\n    let months = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"];\n    let days = [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"];\n\n    let day = days[d.getDay()];\n    let date = d.getDate();\n    let month = months[d.getMonth()];\n    let year = d.getFullYear();\n\n    return `${day} ${date} ${month} ${year}`\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });