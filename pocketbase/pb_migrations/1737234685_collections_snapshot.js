/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2024-12-29 03:01:41.246Z",
      "updated": "2025-01-18 21:04:39.850Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
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
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null,
            "maxSelect": 1,
            "maxSize": 5242880,
            "protected": false
          }
        },
        {
          "system": false,
          "id": "gxeq2wuw",
          "name": "mail",
          "type": "email",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "exceptDomains": null,
            "onlyDomains": null
          }
        },
        {
          "system": false,
          "id": "xfcalm8t",
          "name": "toploggerId",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "onlyVerified": false,
        "requireEmail": false
      }
    },
    {
      "id": "g8ocfrmbhgk16uv",
      "created": "2025-01-18 20:44:27.735Z",
      "updated": "2025-01-18 20:44:27.735Z",
      "name": "wall",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "dpey8uaz",
          "name": "name",
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
          "id": "evvyw1po",
          "name": "description",
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
          "id": "sdxf8bdp",
          "name": "toploggerId",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
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
    },
    {
      "id": "mk16zmg7dgu231s",
      "created": "2025-01-18 20:46:37.601Z",
      "updated": "2025-01-18 21:08:04.768Z",
      "name": "gym",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "jmlb4fis",
          "name": "shortName",
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
          "id": "vazt1i3d",
          "name": "name",
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
          "id": "lhtbksfo",
          "name": "location",
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
          "id": "iro0omhb",
          "name": "toploggerId",
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
          "id": "uo7nq0sn",
          "name": "walls",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "g8ocfrmbhgk16uv",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": null
          }
        },
        {
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
        }
      ],
      "indexes": [],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "f4ejta9lqg6cmex",
      "created": "2025-01-18 20:53:10.300Z",
      "updated": "2025-01-18 20:58:53.266Z",
      "name": "indoor_route",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "yndcn3k7",
          "name": "active",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "k9yj6e33",
          "name": "hexColor",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        },
        {
          "system": false,
          "id": "pvyy4u87",
          "name": "name",
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
          "id": "w5zd2dsk",
          "name": "toploggerId",
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
          "id": "y0dkyum0",
          "name": "qualityRating",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        },
        {
          "system": false,
          "id": "7lzfwbld",
          "name": "settingDate",
          "type": "date",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "axdctumo",
          "name": "unsettingDate",
          "type": "date",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
          "system": false,
          "id": "1zfpkj9i",
          "name": "userRatings",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "1bh95lp5ofmt5r4",
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
    },
    {
      "id": "2qjhecic7cdtghv",
      "created": "2025-01-18 20:53:34.009Z",
      "updated": "2025-01-18 20:53:54.348Z",
      "name": "tag",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "6xuvntyy",
          "name": "tagName",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
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
    },
    {
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
    },
    {
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
    },
    {
      "id": "1bh95lp5ofmt5r4",
      "created": "2025-01-18 20:58:27.625Z",
      "updated": "2025-01-18 20:58:27.625Z",
      "name": "grade_rating",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "k9i6jtlq",
          "name": "user",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "uvhutuaz",
          "name": "grade",
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
        },
        {
          "system": false,
          "id": "ubuoekix",
          "name": "route",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "f4ejta9lqg6cmex",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
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
    },
    {
      "id": "s012nqp6ola720h",
      "created": "2025-01-18 21:02:18.010Z",
      "updated": "2025-01-18 21:02:18.010Z",
      "name": "efford",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "ho5yez6d",
          "name": "status",
          "type": "select",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "tried",
              "zone",
              "top",
              "flash"
            ]
          }
        },
        {
          "system": false,
          "id": "3azpaino",
          "name": "tries",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        },
        {
          "system": false,
          "id": "7x6pqja4",
          "name": "user",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "mx5cedy2",
          "name": "route",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "f4ejta9lqg6cmex",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "4p0xne8t",
          "name": "date",
          "type": "date",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "vzhpywcx",
          "name": "toploggerId",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
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
    },
    {
      "id": "lolzr1ml3optdao",
      "created": "2025-01-18 21:06:19.922Z",
      "updated": "2025-01-18 21:07:28.390Z",
      "name": "session",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "ercfikcf",
          "name": "field",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "ltje0ugy",
          "name": "start",
          "type": "date",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "qmuljfcf",
          "name": "end",
          "type": "date",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "owj4emd8",
          "name": "active",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        },
        {
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
        }
      ],
      "indexes": [],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "40nynh3gqry9a4o",
      "created": "2025-01-18 21:07:13.000Z",
      "updated": "2025-01-18 21:07:13.000Z",
      "name": "activity",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "gbz5u6vz",
          "name": "start",
          "type": "date",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "nrpdpgfs",
          "name": "end",
          "type": "date",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "zlcat6l7",
          "name": "user",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "mdcy5nuz",
          "name": "effords",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "s012nqp6ola720h",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "pemciefe",
          "name": "session",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "lolzr1ml3optdao",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
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
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
