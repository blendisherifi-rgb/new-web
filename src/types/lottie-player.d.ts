import type { DetailedHTMLProps, HTMLAttributes } from "react";

type LottiePlayerElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  src?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: string | number;
  background?: string;
  mode?: string;
  preserveAspectRatio?: string;
  controls?: boolean;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": LottiePlayerElementProps;
    }
  }
}

export {};
