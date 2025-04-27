/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_139221966")

  // remove field
  collection.fields.removeById("text3414765911")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_139221966")

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3414765911",
    "max": 0,
    "min": 0,
    "name": "info",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
