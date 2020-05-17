const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const {title, url, techs } = request.body

  const indexId = repositories.findIndex(repository => repository.id === id)

  if (indexId < 0) {
    return response.status(400).send()
  }

  repositories[indexId].title = title
  repositories[indexId].url = url
  repositories[indexId].techs = techs

  return response.json(repositories[indexId])
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const indexId = repositories.findIndex(repository => repository.id === id)  

  repositories.splice(indexId, 1)

  if (indexId < 0) {
    return response.status(400).send()
  }

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id)

  if (!repository) {
    return response.status(400).send()
  }

  repository.likes += 1

  return response.json(repository)
});

module.exports = app;
