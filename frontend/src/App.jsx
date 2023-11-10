import { Box, Heading, Container } from '@chakra-ui/react';
import VideoPlayer from './Components/VideoPlayer';
import Notification from './Components/Notification';
import Options from './Components/Options';

export default function App() {
  return (
    <Box>
      <Container maxW="1200px" mt="8">
        <Heading as="h2" size="2xl">Video Chat App</Heading>
        <VideoPlayer />
        <Options />
        <Notification />
      </Container>
    </Box>
  )
}
