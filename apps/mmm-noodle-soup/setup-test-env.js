import "@testing-library/jest-dom";

import { jestPreviewConfigure } from "jest-preview";

jestPreviewConfigure({
  publicFolder: "public",
  autoPreview: true,
  debug: true,
  port: 3336,
});
