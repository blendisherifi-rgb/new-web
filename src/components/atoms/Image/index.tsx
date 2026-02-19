import NextImage, { type ImageProps as NextImageProps } from "next/image";

type AspectRatio = "auto" | "1/1" | "4/3" | "3/2" | "16/9" | "21/9";

interface ImageProps extends Omit<NextImageProps, "className"> {
  /** Fixed aspect ratio. Wraps the image in a container with the given ratio. */
  aspectRatio?: AspectRatio;
  /** Rounded corners. */
  rounded?: "none" | "md" | "lg" | "xl" | "full";
  className?: string;
  containerClassName?: string;
}

const roundedMap = {
  none: "",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const aspectRatioMap: Record<AspectRatio, string> = {
  auto: "",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
  "21/9": "aspect-[21/9]",
};

/**
 * Image atom.
 *
 * Wraps Next.js Image with:
 * - Responsive defaults (lazy loading, WebP/AVIF via Next.js)
 * - Optional fixed aspect ratio to prevent layout shift
 * - Rounded corner variants
 */
export function Image({
  aspectRatio = "auto",
  rounded = "none",
  className = "",
  containerClassName = "",
  alt,
  ...rest
}: ImageProps) {
  const roundedClass = roundedMap[rounded];
  const ratioClass = aspectRatioMap[aspectRatio];

  if (aspectRatio !== "auto") {
    return (
      <div
        className={`relative overflow-hidden ${ratioClass} ${roundedClass} ${containerClassName}`}
      >
        <NextImage
          alt={alt}
          className={`object-cover ${className}`}
          fill
          sizes={rest.sizes ?? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"}
          {...rest}
          width={undefined}
          height={undefined}
        />
      </div>
    );
  }

  return (
    <NextImage
      alt={alt}
      className={`${roundedClass} ${className}`}
      {...rest}
    />
  );
}
