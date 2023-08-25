import { Box, Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom/dist";
import { fetchFromApi } from "../utils/fetchFromApi";
import { useEffect, useState } from "react";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "./";

function VideoDetail() {
  const [videoDetail, setVideoDetail] = useState(null);
  const [video, setVideo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data.items[0]);
    });

    fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => {
        setVideo(data.items);
      }
    );
  }, [id]);

  if (!videoDetail?.snippet) return "loading";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={2}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="white" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                color: "white",
              }}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  display="flex"
                  alignItems="center"
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="white"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: 14, color: "grey", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack justifyContent="space-between" direction="row" gap={2}>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} Views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={video} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetail;
