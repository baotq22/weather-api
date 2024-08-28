import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [enableDetails, setEnableDetails] = useState(false);
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false
  });
  const toDateFunction = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const WeekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
      }`;
    return date;
  };

  const search = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setInput('');
      setWeather({ ...weather, loading: true });
      const url = `https://api.openweathermap.org/data/2.5/weather`;
      await axios.get(url, {
        params: {
          q: input,
          unit: "metric",
          appid: "f00c38e0279b7bc85480c3fe775d518c"
        }
      })
        .then((res) => {
          console.log('res', res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput('');
          console.log('error', error);
        });
      setEnableDetails(true);
    }
  }
  return (
    <>
      <div className="wrapper">
        <header><i className='bx bx-left-arrow-alt'></i>Weather App</header>
        <section className="input-part">
          <div className="content">
            <input
              type="text"
              placeholder="Enter city name"
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={search}
            />
          </div>
          <div className="content">
            <button>Query</button>
          </div>
        </section>
        <div className="separator"></div>
        <section className="weather-part">
          {enableDetails ? (
            weather && weather.data && weather.data.main && (
              <>
                <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt="Weather Icon" />
                <div className="temp">
                  <span className="numb">{Math.round(weather.data.main.temp / 10)}<sup>°C</sup></span>
                </div>
                <div className="weather">{weather.data.weather[0].main}</div>
                <div className="location">
                  <span>{weather.data.name}, {weather.data.sys.country}</span>
                </div>
                <div className="bottom-details">
                  <div className="column inside">
                    <i className='bx bxs-droplet-half'></i>
                    <div className="details">
                      <span>{Math.round(weather.data.main.feels_like / 10)}<sup>°C</sup></span>
                      <p>Feels Like</p>
                    </div>
                  </div>
                  <div className="column inside">
                    <i className='bx bxs-droplet-half'></i>
                    <div className="details">
                      <span>{weather.data.main.humidity}%</span>
                      <p>Humidty</p>
                    </div>
                  </div>
                  <div className="column inside">
                    <i className='bx bxs-droplet-half'></i>
                    <div className="details">
                      <span>{weather.data.wind.speed}m/s</span>
                      <p>Wind Spped</p>
                    </div>
                  </div>
                </div>
              </>
            )) : (<div className="weather">Input city name is required</div>)}
        </section>
      </div >
    </>
  )
}

export default App
