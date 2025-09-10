export const getHref = (name: string) =>
  `/${name.toLowerCase().replace(/\s+/g, "-")}`;
