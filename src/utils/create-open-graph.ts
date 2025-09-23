type OpenGraph = {
  basic: {
    title: string;
    type: string;
    image: string;
    url: string;
  };
};

export const createOpenGraph = (
  title: string,
  path: string,
  type: string = "website"
): OpenGraph => ({
  basic: {
    title,
    type,
    image: `/images/og${path}.png`,
    url: path,
  },
});
