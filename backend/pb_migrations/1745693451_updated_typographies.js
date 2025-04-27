/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_139221966")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3649584119",
    "hidden": false,
    "id": "relation3414765911",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "info",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_139221966")

  // remove field
  collection.fields.removeById("relation3414765911")

  return app.save(collection)
})
