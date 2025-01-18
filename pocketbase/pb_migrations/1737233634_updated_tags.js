/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qjhecic7cdtghv")

  collection.name = "tag"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qjhecic7cdtghv")

  collection.name = "tags"

  return dao.saveCollection(collection)
})
