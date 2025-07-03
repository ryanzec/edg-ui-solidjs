/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('_pb_users_auth_');

    // add field
    collection.fields.addAt(
      9,
      new Field({
        cascadeDelete: false,
        collectionId: 'pbc_2873630990',
        hidden: false,
        id: 'relation2106360836',
        maxSelect: 1,
        minSelect: 0,
        name: 'organizationId',
        presentable: false,
        required: false,
        system: false,
        type: 'relation',
      }),
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('_pb_users_auth_');

    // remove field
    collection.fields.removeById('relation2106360836');

    return app.save(collection);
  },
);
