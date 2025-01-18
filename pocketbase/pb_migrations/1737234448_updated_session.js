/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lolzr1ml3optdao")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uqgy9bhf",
    "name": "activities",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "40nynh3gqry9a4o",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lolzr1ml3optdao")

  // remove
  collection.schema.removeField("uqgy9bhf")

  return dao.saveCollection(collection)
})
