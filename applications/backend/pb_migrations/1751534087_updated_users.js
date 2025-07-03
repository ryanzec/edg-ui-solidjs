/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('_pb_users_auth_');

    // add field
    collection.fields.addAt(
      9,
      new Field({
        autogeneratePattern: '',
        hidden: false,
        id: 'text2106360836',
        max: 0,
        min: 0,
        name: 'organizationId',
        pattern: '',
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: 'text',
      }),
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('_pb_users_auth_');

    // remove field
    collection.fields.removeById('text2106360836');

    return app.save(collection);
  },
);
