import type * as zod from 'zod';

// this is the recommended way for checking a zod schema in sync with referencing type
// reference: https://github.com/colinhacks/zod/issues/372#issuecomment-826380330
const schemaForType =
  <T>() =>
  // biome-ignore lint/suspicious/noExplicitAny: see above reference for why we are allowing any here
  <S extends zod.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

const getErrorPaths = <TSchemaData>(zodError: zod.ZodError) => {
  const keys: TSchemaData[] = [];

  for (const issue of zodError.issues) {
    keys.push(issue.path.join('.') as TSchemaData);
  }

  return [...new Set(keys)];
};

// biome-ignore lint/suspicious/noExplicitAny: see above comment
const unwrapSchema = (schema: zod.ZodTypeAny): any => {
  if (!schema) {
    return schema;
  }

  // unwrap is the most common version of getting the underlying schema
  if ('unwrap' in schema && typeof schema.unwrap === 'function') {
    return unwrapSchema(schema.unwrap());
  }

  // inner type is another place where the schema can be stored for thins like Zod.Default()
  if (schema._def?.innerType) {
    return unwrapSchema(schema._def.innerType);
  }

  return schema;
};

// biome-ignore lint/suspicious/noExplicitAny: because this method is using is use a string as a path to get a zod type from any zod shape, not sure how to do that other than using any
const getNestedSchema = (path: string, shape: any): zod.ZodType => {
  const pathParts = path.split('.');

  // biome-ignore lint/suspicious/noExplicitAny: see above comment
  let currentSchema: any = shape;

  for (let i = 0; i < pathParts.length; i++) {
    const currentPathPart = pathParts[i];
    const nextPath = pathParts[i + 1];
    const currentPathSchema = unwrapSchema(currentSchema[currentPathPart]);

    // last one
    if (i === pathParts.length - 1) {
      currentSchema = currentPathSchema;

      break;
    }

    // if it is not a number, than that means this is an object type and we just need `.shape`
    if (nextPath === undefined || Number.isNaN(Number.parseInt(nextPath))) {
      currentSchema = currentPathSchema.shape;

      continue;
    }

    // depending on the type of validator, the schema can be store in a number of different locations and as best
    // I can tell (though not sure) this seems to be the correct order in which to look for the schema
    currentSchema = unwrapSchema(currentPathSchema.element)?.shape || currentPathSchema.element || currentPathSchema;

    // we bump up the next path part since we have already dealt with the array portion
    i++;
  }

  return currentSchema as zod.ZodType;
};

export const zodUtils = {
  schemaForType,
  getErrorPaths,
  getNestedSchema,
};
