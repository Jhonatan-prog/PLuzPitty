declare module "*.svg" {
  import React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
  const src: string;
  export default src;
}

<<<<<<< HEAD
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}
=======
declare module "*.png" {
  const value: string;
  export default value;
}
>>>>>>> 0ba120d9c0e172405782b3f439967f18ee4ff9ff
