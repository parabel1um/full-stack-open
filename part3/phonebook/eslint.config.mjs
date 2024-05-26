import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        process: true,
        console: true,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    ignores: ["dist/"],
  },
];
