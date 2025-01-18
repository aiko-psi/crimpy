/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f4ejta9lqg6cmex")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9hndh7nd",
    "name": "gradeSystem",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uxaigpcd",
    "name": "initialGrade",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "7mglcnaxvgjzmvy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f4ejta9lqg6cmex")

  // remove
  collection.schema.removeField("9hndh7nd")

  // remove
  collection.schema.removeField("uxaigpcd")

  return dao.saveCollection(collection)
})
