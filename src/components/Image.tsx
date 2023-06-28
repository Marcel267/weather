type ImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const Image: React.FC<ImageProps> = ({ src, width, height, alt }) => {
  return <img src={src} width={width} height={height} alt={alt} />;
};
