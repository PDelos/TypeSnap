/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1380979776")

  // update collection data
  unmarshal({
    "name": "prompt"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1380979776")

  // update collection data
  unmarshal({
    "name": "Prompt"
  }, collection)

  return app.save(collection)
})
