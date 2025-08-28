import React from 'react'
import { Card, CardContent, CardActions, Typography, Button, Stack, Box, Chip, Divider, IconButton } from '@mui/material'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'

const DetailCard = ({ item }) => {
    if (!item) return null

    return (
        <Card elevation={3} sx={{ borderRadius: 2 }}>
            <Box sx={{ px: 2, pt: 2, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                    <img
                        src="../../public/images/store.png"
                        alt={item.name}
                        style={{ width: 50, height: 50, marginLeft: 16 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{item.name}</Typography>
                </Stack>

                <Stack direction="row" spacing={0.5} sx={{ border: '2px solid rgba(30,136,229,.25)', borderRadius: 2.5, p: .25, pr: .5 }}>
                    <IconButton size="small" aria-label="گزارش"><WarningAmberRoundedIcon /></IconButton>
                    <IconButton size="small" aria-label="تماس" onClick={() => window.open(`tel:${item.phone}`)}><PhoneRoundedIcon /></IconButton>
                    <IconButton size="small" aria-label="اشتراک" onClick={()=>{
                        const url=`https://www.google.com/maps?q=${item.coords.lat},${item.coords.lng}`
                        navigator.share?.({title:item.name,url}) || window.open(url)
                    }}><ShareRoundedIcon /></IconButton>
                </Stack>
            </Box>

            <CardContent sx={{ pt: 1 }}>
                <Box sx={{ mt: 1 , display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" sx={{ color: 'secondary.main', fontWeight: 800 }}>
                        لیست محصولات
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ borderRadius: 999, px: 2.5, py: 1.2, fontWeight: 700, boxShadow: 1 }}>
                        همه محصولات فروشگاه
                    </Button>
                </Box>

                <Box sx={{ height: 4, width: 120, bgcolor: 'rgba(30,144,255,.45)', borderRadius: 2, mt: .5, mb: 1.5 }} />
                <Typography variant="body2" color="text.secondary" sx={{ height: "250px" }}>محصولی یافت نشد</Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" sx={{ fontWeight: 700, mb: .5 }}>آدرس</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {item.address}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Chip size="small" label="امتیاز 4.5" />
                    <Chip size="small" label="ساعت کاری: 9–22" />
                </Stack>
            </CardContent>

            <CardActions sx={{ px: 2, pb: 2 }}>
                <Button variant="outlined" sx={{ width: '100%' }} onClick={() => window.open(`https://www.google.com/maps?q=${item.coords.lat},${item.coords.lng}`)}>
                    مسیریابی
                </Button>
            </CardActions>
        </Card>
    )
}

export default DetailCard
