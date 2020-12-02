/* eslint-disable */
import React , { useState, useEffect } from "react";
import {
  useLocation
} from "react-router-dom";
import axios from 'axios'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Prayer() {

  const [ darkMode, setDarkMode ] = useState(true);

  const [ hasError, setErrors ] = useState(false);
  const [ data, setData ] = useState([]);
  const [ today, setToday ] = useState(1);

  const [ prayerTimes, setPrayerTimesData ] = useState({
    fajr : '',
    sunrise : '',
    dhur : '',
    asr : '',
    sunset : '',
    maghrib: '',
    isha : '',
    imsak: '',
    midnight: ''
  })

  var date = new Date();

  async function fetchData() {
    const res = await axios.get('http://api.aladhan.com/v1/calendarByCity?city=Zhongli&country=Taiwan&method=2&month=12&year=2020')
      .then(res => {
        setData(res.data.data)

        console.log(res.data.data)

        let data = res.data.data[date.getDate()-1];

        setPrayerTimesData({
          fajr : data.timings.Fajr,
          sunrise : data.timings.Sunrise,
          dhur : data.timings.Dhuhr,
          asr : data.timings.Asr,
          sunset : data.timings.Sunset,
          maghrib: data.timings.Maghrib,
          isha : data.timings.Isha,
          imsak: data.timings.Imsak,
          midnight: data.timings.Midnight
        })

        console.log(prayerTimes)

      })
      .catch(err => setErrors(err))
  }

  useEffect(() => {
    setToday(date.getDate());
    fetchData();
  }, []);

  let query = useQuery();

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 dark:text-white items-center">
        {/*Date {today}*/}
        {/*{query.get("location")}*/}
        {/*{data==={} ? '' : (JSON.stringify(prayerTimes))}*/}
        <div className={"flex flex-col font-bold text-3xl justify-center align-center flex-grow-0 w-64 my-auto"}>
          <div className={"flex flex-row flex-grow-0 items-center"}>
            <div className={"flex flex-1"}>
              Fajr
            </div>
            <div className={"flex flex-1 justify-center"} >
              {prayerTimes.fajr.substr(0,5)}
            </div>
          </div>
          <div className={"flex flex-row flex-grow-0"}>
            <div className={"flex flex-1"}>
              Dhur
            </div>
            <div className={"flex flex-1 justify-center"}>
              {prayerTimes.dhur.substr(0,5)}
            </div>
          </div>
          <div className={"flex flex-row flex-grow-0"}>
            <div className={"flex flex-1"}>
              Asr
            </div>
            <div className={"flex flex-1 justify-center"}>
              {prayerTimes.asr.substr(0,5)}
            </div>
          </div>
          <div className={"flex flex-row flex-grow-0"}>
            <div className={"flex flex-1"}>
              Maghrib
            </div>
            <div className={"flex flex-1 justify-center"}>
              {prayerTimes.maghrib.substr(0,5)}
            </div>
          </div>
          <div className={"flex flex-row flex-grow-0"}>
            <div className={"flex flex-1"}>
              Isya
            </div>
            <div className={"flex flex-1 justify-center"}>
              {prayerTimes.isha.substr(0,5)}
            </div>
          </div>
        </div>
        <div className={"absolute right-0 mr-2 mt-2"}>
          <button className={"focus:outline-none"} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <svg className="w-8 h-8 md:w-10 md:h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg className="w-8 h-8 md:w-10 md:h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Prayer;
