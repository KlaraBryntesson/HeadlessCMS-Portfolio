import * as React from "react";
import {
  GatsbyImage,
  IGatsbyImageData,
  ImageDataLike,
  getImage,
} from "gatsby-plugin-image";

interface ProjectImageProps {
  image?: IGatsbyImageData;
  className?: string;
}

const ProjectImage: React.FC<ProjectImageProps> = ({ image }) => {
  const imageData = image as ImageDataLike;
  const newImage = getImage(imageData);

  if (!newImage) {
    return null;
  }

  return (
    <GatsbyImage
      image={newImage}
      alt="hello"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ProjectImage;
