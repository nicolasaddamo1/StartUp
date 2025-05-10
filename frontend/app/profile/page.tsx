import { useState, useEffect } from 'react'
import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import { Avatar, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/joy'
import { useTheme } from '@mui/joy/styles'

export default function ProfilePage() {
    const { user } = useUser()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (user !== null) {
            setIsLoading(false)
        } else {
            setIsError(true)
        }
    }, [user])
    const router = useRouter()
    const theme = useTheme()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }

    if (!user) {
        return <div>
            <Button onClick={() => router.push('/login')}>Iniciar sesión</Button>
        </div>
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardHeader title={user.name} />
                    <CardContent>
                        <Avatar src={user.avatar} />
                        <Typography level="h2" sx={{ mt: 2 }}>
                            {user.email}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
