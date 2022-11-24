import React, { useState } from 'react';
import axios from 'axios'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d2c013137bd39e06197394eeef5ab894`

  const locationSearch = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((res) => {
        setData(res.data)
      }).catch((err) => {
        console.log(err)
      })
      setLocation('')
    }
  }

  return (
    <div className='app'>

      <div className='locationSearch'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={locationSearch}
          placeholder='Enter City'
          type='text' />
      </div>
      {data.name != undefined &&
        <div className='header'>
          <div className='location'>
            <p>{data.name}</p>
          </div>

          <div className='temperature'>
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>

          <div className='clouds'>
            {data.main ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
      }

      {data.name != undefined &&
        <div className='footer'>
          <div className='pressure'>
            {data.main ? <p>Pressure: {data.main.pressure.toFixed()} mb</p> : null}
          </div>

          <div className='humidity'>
            {data.main ? <p>Humidity: {data.main.humidity.toFixed()} %</p> : null}
          </div>

          <div className='temp_min'>
            {data.main ? <p>Min. Temp: {data.main.temp_min.toFixed()} °C</p> : null}
          </div>

          <div className='temp_max'>
            {data.main ? <p>Max. Temp: {data.main.temp_max.toFixed()} °C</p> : null}
          </div>

          <div className='wind'>
            {data.main ? <p>Wind: {data.wind.speed.toFixed()} km/h</p> : null}
          </div>
        </div>
      }

    </div>
  );
}

export default App;
