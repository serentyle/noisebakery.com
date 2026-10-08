import { createCn } from "cn/config";

export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: ["body", "title", "label", "meta"] }],
    },
  },
});
