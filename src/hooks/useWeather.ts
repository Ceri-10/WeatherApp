import axios from "axios";
import { SearchType } from "../types";
import {z} from "zod"
import { useMemo, useState } from "react";



const Weather = z.object({
    name: z.string(),
    main:z.object({
        temp:z.number(),
        temp_max:z.number(),
        temp_min:z.number()
    })
})

export type Weather = z.infer<typeof Weather>


export default function useWeather() {


    const initialState = {
        name: "",
        main: {
            temp:0,
            temp_max:0,
            temp_min:0
        }
    }

    const [weather,setWeather] = useState<Weather>(initialState)
    const [loading,setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)



    const fetchWeather = async (search: SearchType) => {
        const apiKey = import.meta.env.VITE_API_KEY;
        setLoading(true)
        setWeather(initialState)
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`;
            const { data } = await axios(geoUrl);

            if(!data[0]){
                setNotFound(true)
                return
            }

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            const {data: weatherResult} = await axios(weatherUrl)
            const result = Weather.safeParse(weatherResult)
            if(result.success){
                setWeather(result.data)
            }else{
                
            }
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    };


    const hasWeatherData = useMemo(() =>weather.name ,[weather])

    return {
        weather,
        loading,
        fetchWeather,
        hasWeatherData,
        notFound
    }
}
