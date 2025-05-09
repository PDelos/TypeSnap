/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "oauth2": {
      "enabled": true
    },
    "passwordAuth": {
      "enabled": false
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "oauth2": {
      "enabled": false
    },
    "passwordAuth": {
      "enabled": true
    }
  }, collection)

  return app.save(collection)
})
