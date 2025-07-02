/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('_pb_users_auth_');

    // update collection data
    unmarshal(
      {
        authToken: {
          duration: 640000,
        },
      },
      collection,
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('_pb_users_auth_');

    // update collection data
    unmarshal(
      {
        authToken: {
          duration: 600,
        },
      },
      collection,
    );

    return app.save(collection);
  },
);
