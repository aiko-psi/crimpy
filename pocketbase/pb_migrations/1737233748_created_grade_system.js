/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mfq4mj7cs8n8ku3",
    "created": "2025-01-18 20:55:48.803Z",
    "updated": "2025-01-18 20:55:48.803Z",
    "name": "grade_system",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wukbuveo",
        "name": "grades",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "7mglcnaxvgjzmvy",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("mfq4mj7cs8n8ku3");

  return dao.deleteCollection(collection);
})
