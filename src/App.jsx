import React, { useMemo, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import MapView from './components/MapView'
import DetailCard from './components/DetailCard'
import useGeolocation from './hooks/useGeolocation'
import { generateMockItems } from './data/mockItems'
import { withinRadius } from './utils/geo'
import { Box, SwipeableDrawer, useMediaQuery, CircularProgress } from '@mui/material'

const App = () => {
    const { coords, isLoading } = useGeolocation({ lat: 35.6892, lng: 51.3890 })
    const [selected, setSelected] = useState(null)
    const isDesktop = useMediaQuery('(min-width:900px)')

    const items = useMemo(() => coords ? generateMockItems(coords, 20, 5000) : [], [coords])
    const itemsWithin5km = useMemo(() => coords ? items.filter(it => withinRadius(coords, it.coords, 5000)) : [], [coords, items])

    const handleMarkerClick = (item) => setSelected(item)

    if (isLoading || !coords) {
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <CircularProgress />
                </Box>
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ height:'100%', width:'100%', position:'relative' }}>
                <MapView
                    center={coords}
                    items={itemsWithin5km}
                    onMarkerClick={handleMarkerClick}
                    onMapClick={() => { if (isDesktop) setSelected(null) }}
                />

                {isDesktop && selected && (
                    <Box sx={{ position:'absolute', bottom:16, left:16, width:400, zIndex: 1000 }}>
                        <DetailCard item={selected} />
                    </Box>
                )}

                {!isDesktop && (
                    <SwipeableDrawer
                        anchor="bottom"
                        open={Boolean(selected)}
                        onOpen={()=>{}}
                        onClose={()=> setSelected(null)}
                        PaperProps={{ sx:{ borderTopLeftRadius:2, borderTopRightRadius:2, maxHeight:'70vh' } }}
                    >
                        <Box sx={{ p: 2 }}>
                            <DetailCard item={selected} />
                        </Box>
                    </SwipeableDrawer>
                )}
            </Box>
        </ThemeProvider>
    )
}

export default App
