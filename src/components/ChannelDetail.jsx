import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Videos, ChannelCard } from "./";
import { fetchFromApi } from "../utils/fetchFromApi";
import { Box } from "@mui/material";

function ChannelDetail({ marginTop }) {
  const [channelDetails, setChannelDetails] = useState(null);
  const { id } = useParams();
  const [video, setVideo] = useState([]);

  useEffect(() => {
    fetchFromApi(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetails(data?.items[0]);
    });
    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => {
        setVideo(data?.items);
      }
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
            height: "300px",
            zIndex: 10,
          }}
        />
      </Box>
      <ChannelCard channel={channelDetails} marginTop="-95px" />

      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={video} />
      </Box>
    </Box>
  );
}

export default ChannelDetail;
