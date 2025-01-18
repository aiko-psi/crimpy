/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "7mglcnaxvgjzmvy",
    "created": "2025-01-18 20:55:17.782Z",
    "updated": "2025-01-18 20:55:17.782Z",
    "name": "grade",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "l0yfhb4s",
        "name": "gradeName",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "w0sgtdws",
        "name": "gradeValue",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
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
  const collection = dao.findCollectionByNameOrId("7mglcnaxvgjzmvy");

  return dao.deleteCollection(collection);
})
