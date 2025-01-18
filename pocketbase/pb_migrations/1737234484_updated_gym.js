/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mk16zmg7dgu231s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5chzya9l",
    "name": "defaultGradeSystem",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "mfq4mj7cs8n8ku3",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mk16zmg7dgu231s")

  // remove
  collection.schema.removeField("5chzya9l")

  return dao.saveCollection(collection)
})
