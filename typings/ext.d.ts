declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png';
declare module '*.gif';
declare module '*.svg';
declare module '*.webp';
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
