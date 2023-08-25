import { Box, Stack } from "@mui/material";
import ChannelCard from "./ChannelCard";
import VideoCard from "./VideoCard";

function Videos({ videos, direction }) {
  if (!videos) return "loading";
  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      gap={2}
      justifyContent="start"
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channel={item} />}
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;
