/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('_pb_users_auth_');

    // update field
    collection.fields.addAt(
      9,
      new Field({
        hidden: false,
        id: 'autodate2990389176',
        name: 'createdAt',
        onCreate: true,
        onUpdate: false,
        presentable: false,
        system: false,
        type: 'autodate',
      }),
    );

    // update field
    collection.fields.addAt(
      10,
      new Field({
        hidden: false,
        id: 'autodate3332085495',
        name: 'updatedAt',
        onCreate: true,
        onUpdate: true,
        presentable: false,
        system: false,
        type: 'autodate',
      }),
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('_pb_users_auth_');

    // update field
    collection.fields.addAt(
      9,
      new Field({
        hidden: false,
        id: 'autodate2990389176',
        name: 'created',
        onCreate: true,
        onUpdate: false,
        presentable: false,
        system: false,
        type: 'autodate',
      }),
    );

    // update field
    collection.fields.addAt(
      10,
      new Field({
        hidden: false,
        id: 'autodate3332085495',
        name: 'updated',
        onCreate: true,
        onUpdate: true,
        presentable: false,
        system: false,
        type: 'autodate',
      }),
    );

    return app.save(collection);
  },
);
