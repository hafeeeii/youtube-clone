import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";
import { CheckCircle } from "@mui/icons-material";

function ChannelCard({ channel, marginTop }) {
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: { xs: "280px", md: "320px", height: "326px", margin: "auto" },
        marginTop,
      }}
    >
      <Link to={`/channel/${channel?.id?.channelId}`}>
        <CardContent
          sx={{
            color: "#fff",
            textAlign: "center",
          }}
        >
          <CardMedia
            image={channel?.snippet?.thumbnail?.high?.url || demoProfilePicture}
            alt={channel?.snippet?.title}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              border: "1px solid #e3e3e3",
            }}
          />
          <Typography variant="h6">
            {channel?.snippet?.title}
            <CheckCircle
              sx={{
                fontSize: 15,
                color: "grey",
                ml: "5px",
              }}
            />
          </Typography>
          {channel?.statistics?.subscriberCount && (
            <Typography>
              {parseInt(channel?.statistics?.subscriberCount).toLocaleString()}{" "}
              Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
}

export default ChannelCard;
