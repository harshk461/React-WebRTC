import { Grid, Box, Heading } from "@chakra-ui/react"
import { SocketContext } from "../Context"
import { useContext } from "react"

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext)

    return (
        <Grid justifyContent="center" templateColumns='repeat(2, 1fr)' mt="12">
            {/* my video */}
            {
                stream && (
                    <Box m="4">
                        <Grid colSpan={1} gap="5">
                            <Heading as="h5">
                                {name || 'Name'}
                            </Heading>
                            <video
                                playsInline muted ref={myVideo} autoPlay width="600"
                                style={{ borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", border: "4px solid dodgerblue" }}
                            />
                        </Grid>
                    </Box>
                )
            }
            {/* user's video */}
            {
                callAccepted && !callEnded && (
                    <Box m="4">
                        <Grid colSpan={1} gap="5">
                            <Heading as="h5">
                                {call.name || 'Name'}
                            </Heading>
                            <video
                                playsInline ref={userVideo} autoPlay width="600"
                                style={{ borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", border: "4px solid green" }}
                            />
                        </Grid>
                    </Box>
                )
            }
        </Grid>
    )
}
export default VideoPlayer
