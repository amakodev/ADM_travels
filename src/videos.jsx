import React from "react";

// Vimeo video IDs - replace with your actual video IDs
const videoIds = {
  tasting: "1134270977", // Replace with your tasting video ID
  culture: "1134307632", // Replace with your culture video ID
  city: "1134276112",
  nature: "1134306549", // Replace with your nature video ID
  adventure: "1134305225",
};

// Helper function to create Vimeo embed
const createVimeoEmbed = (videoId, title) => (
  <div 
    className="vimeo-embed-wrapper"
    style={{ 
      padding: "56.25% 0 0 0", 
      position: "relative", 
      width: "100%", 
      height: 0,
      overflow: "hidden"
    }}
  >
    <iframe
      title={title}
      src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1&controls=0`}
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      style={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%",
        border: "none",
        borderRadius: "12px",
        objectFit: "cover"
      }}
      allowFullScreen
    ></iframe>
  </div>
);

const videos = {
  tasting: createVimeoEmbed(videoIds.tasting, "Tasting"),
  culture: createVimeoEmbed(videoIds.culture, "Culture"),
  city: createVimeoEmbed(videoIds.city, "City"),
  nature: createVimeoEmbed(videoIds.nature, "Nature"),
  adventure: createVimeoEmbed(videoIds.adventure, "Adventure"),
};

export default videos;
