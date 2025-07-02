/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_879811465');

    // remove field
    collection.fields.removeById('text1466534506');

    // add field
    collection.fields.addAt(
      2,
      new Field({
        hidden: false,
        id: 'select1466534506',
        maxSelect: 1,
        name: 'role',
        presentable: false,
        required: true,
        system: false,
        type: 'select',
        values: ['user', 'admin'],
      }),
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_879811465');

    // add field
    collection.fields.addAt(
      1,
      new Field({
        autogeneratePattern: '',
        hidden: false,
        id: 'text1466534506',
        max: 0,
        min: 0,
        name: 'role',
        pattern: '',
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: 'text',
      }),
    );

    // remove field
    collection.fields.removeById('select1466534506');

    return app.save(collection);
  },
);
