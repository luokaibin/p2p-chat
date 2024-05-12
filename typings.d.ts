declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes;
}

declare namespace JSX {
  interface IntrinsicElements {
    'osp-image': {
      src: string;
      loadingImg?: string;
    };
  }
}

declare module "csstype" {
  interface Properties {
    [key: string]: string;
  }
}

declare type MaybeNull<T> = T | null;