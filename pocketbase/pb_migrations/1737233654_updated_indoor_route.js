/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f4ejta9lqg6cmex")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4hyjonkt",
    "name": "tags",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "2qjhecic7cdtghv",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f4ejta9lqg6cmex")

  // remove
  collection.schema.removeField("4hyjonkt")

  return dao.saveCollection(collection)
})
