// برای گرفتن لوکیشن کاربر

import { useEffect, useState } from 'react'

const useGeolocation = (fallback = { lat: 35.6892, lng: 51.3890 }) => {
    const [coords, setCoords] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        if (!('geolocation' in navigator)) {
            setCoords(fallback); setIsLoading(false); return
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => { if (mounted) { setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setIsLoading(false) } },
            ()     => { if (mounted) { setCoords(fallback); setIsLoading(false) } },
            { enableHighAccuracy:true, timeout:10000, maximumAge:0 }
        )
        return () => { mounted = false }
    }, [fallback.lat, fallback.lng])

    return { coords, isLoading }
}

export default useGeolocation
