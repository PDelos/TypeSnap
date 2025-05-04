/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_139221966")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file2804706563",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "gimage",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_139221966")

  // remove field
  collection.fields.removeById("file2804706563")

  return app.save(collection)
})
