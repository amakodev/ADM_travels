import React from "react";
import LazyVideo from "./components/LazyVideo";

// Vimeo video IDs - replace with your actual video IDs
const videoIds = {
  tasting: "1134270977", // Replace with your tasting video ID
  culture: "1134307632", // Replace with your culture video ID
  city: "1134276112",
  nature: "1134306549", // Replace with your nature video ID
  adventure: "1134305225",
};

// Optional poster images for each category (you can add these later)
const posterImages = {
  tasting: null, // Add poster image URL if available
  culture: null,
  city: null,
  nature: null,
  adventure: null,
};

// Helper function to create lazy-loaded Vimeo embed
const createLazyVimeoEmbed = (videoId, title, poster = null) => (
  <LazyVideo
    videoId={videoId}
    title={title}
    poster={poster}
    autoplay={true}
    loop={true}
    muted={true}
  />
);

const videos = {
  tasting: createLazyVimeoEmbed(videoIds.tasting, "Tasting Tours", posterImages.tasting),
  culture: createLazyVimeoEmbed(videoIds.culture, "Cultural Tours", posterImages.culture),
  city: createLazyVimeoEmbed(videoIds.city, "City Tours", posterImages.city),
  nature: createLazyVimeoEmbed(videoIds.nature, "Nature Tours", posterImages.nature),
  adventure: createLazyVimeoEmbed(videoIds.adventure, "Adventure Tours", posterImages.adventure),
};

export default videos;
