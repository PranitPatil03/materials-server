import swaggerAutogen from "swagger-autogen";

const PORT = process.env.PORT || 4000;
console.log("PORT", PORT);

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: `http://localhost:${PORT}`,
};

const outputFile = "../../swagger-output.json";
const routes = ["src/routes/materials.ts"];

swaggerAutogen()(outputFile, routes, doc);
