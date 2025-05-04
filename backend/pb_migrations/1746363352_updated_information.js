/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3649584119")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file724990059",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "title",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3649584119")

  // remove field
  collection.fields.removeById("file724990059")

  return app.save(collection)
})
