export const testOnViewports = (testName, callback) => {
  const defaultSizes = [
    // [375, 812], // iPhone X
    [768, 1024], // iPad
    [1280, 800], // Laptop
    // [1920, 1080], // Desktop
  ];

  const viewports = defaultSizes;

  viewports.forEach(([width, height]) => {
    describe(`Viewport ${width}x${height}`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
      });

      callback();
    });
  });
};
