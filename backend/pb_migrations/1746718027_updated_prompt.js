/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1380979776")

  // remove field
  collection.fields.removeById("file250665868")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1380979776")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "file250665868",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "pdf",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
