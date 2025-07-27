import { ZodArray, ZodEffects, type ZodError, ZodObject, ZodOptional, type ZodType, type ZodTypeAny } from 'zod';

// this is the recommended way for checking a zod schema in sync with referencing type
// reference: https://github.com/colinhacks/zod/issues/372#issuecomment-826380330
const schemaForType =
  <T>() =>
  // biome-ignore lint/suspicious/noExplicitAny: see above reference for why we are allowing any here
  <S extends ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

const getErrorPaths = <TSchemaData>(zodError: ZodError) => {
  const keys: TSchemaData[] = [];

  for (const issue of zodError.issues) {
    keys.push(issue.path.join('.') as TSchemaData);
  }

  return [...new Set(keys)];
};

export type ZodUnwrapSchemaOptions = {
  // when getting a nested schema, the context will determine if you want to unwrap effects, if you are getting
  // a nested schema to modified it, you probably want to unwrap effects but if you are getting a nested schema to
  // validate a field, you probably want to keep the effects
  unwrapEffects?: boolean;
};

// biome-ignore lint/suspicious/noExplicitAny: see above comment
const unwrapSchema = (schema: ZodTypeAny, options: ZodUnwrapSchemaOptions = {}): any => {
  const finalOptions = structuredClone(Object.assign({ unwrapEffects: true }, options));

  if (!schema) {
    return schema;
  }

  if (finalOptions.unwrapEffects === false && schema instanceof ZodEffects) {
    return schema;
  }

  // if we don't do this, unwrapping the schema are it related to complex structures in form will error
  if (
    schema instanceof ZodOptional &&
    schema._def.innerType instanceof ZodObject === false &&
    schema._def.innerType instanceof ZodArray === false
  ) {
    return schema;
  }

  // if (schema instanceof ZodEffects) {
  //   return unwrapSchema((schema as ZodEffects<ZodTypeAny>)._def.schema);
  // }

  // unwrap is the most common version of getting the underlying schema
  if ('unwrap' in schema && typeof schema.unwrap === 'function') {
    // console.log('unwrap');
    return unwrapSchema(schema.unwrap());
  }

  // inner type is another place where the schema can be stored for thins like Zod.Default()
  if (schema._def?.schema) {
    // console.log('innerType');
    return unwrapSchema(schema._def.schema);
  }

  // inner type is another place where the schema can be stored for thins like Zod.Default()
  if (schema._def?.innerType) {
    // console.log('innerType');
    return unwrapSchema(schema._def.innerType);
  }

  return schema;
};

export type ZodGetNestedSchemaShape = ZodUnwrapSchemaOptions;

// biome-ignore lint/suspicious/noExplicitAny: because this method is using is use a string as a path to get a zod type from any zod shape, not sure how to do that other than using any
const getNestedSchema = (path: string, shape: any, options: ZodGetNestedSchemaShape = {}): ZodType => {
  const finalOptions = structuredClone(Object.assign({ unwrapEffects: true }, options));

  const pathParts = path.split('.');

  // console.log(pathParts);

  // biome-ignore lint/suspicious/noExplicitAny: see above comment
  let currentSchema: any = shape;

  // console.log(shape);

  for (let i = 0; i < pathParts.length; i++) {
    const currentPathPart = pathParts[i];
    const nextPath = pathParts[i + 1];
    // console.log(currentSchema);
    const currentPathSchema = unwrapSchema(currentSchema[currentPathPart], finalOptions);
    const currentPathUnwrappedSchema = unwrapSchema(currentSchema[currentPathPart]);

    // console.log(currentPathPart);
    // console.log(currentPathSchema);

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
    currentSchema =
      unwrapSchema(currentPathUnwrappedSchema.element, finalOptions)?.shape ||
      currentPathSchema.element ||
      currentPathSchema;

    // we bump up the next path part since we have already dealt with the array portion
    i++;
  }

  return currentSchema as ZodType;
};

// while I don't like custom logic for something like this, lodashes version does not seem to work with zod objects
// biome-ignore lint/suspicious/noExplicitAny: see above comment
const zodDeepClone = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj._def) {
    return obj;
  }

  // biome-ignore lint/suspicious/noExplicitAny: see above comment
  const cloned: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    cloned[key] = zodDeepClone(obj[key]);
  }
  return cloned;
};

// biome-ignore lint/suspicious/noExplicitAny: see above comment
const setNestedSchema = (path: string, shape: any, newSchema: any): any => {
  const pathParts = path.split('.');
  const newShape = zodDeepClone(shape);
  // biome-ignore lint/suspicious/noExplicitAny: see above comment
  const pathToUpdate: any[] = [];
  // biome-ignore lint/suspicious/noExplicitAny: see above comment
  let currentSchema: any = newShape;

  for (let i = 0; i < pathParts.length; i++) {
    const currentPathPart = pathParts[i];
    const nextPath = pathParts[i + 1];

    pathToUpdate.push({ schema: currentSchema, key: currentPathPart });

    if (i === pathParts.length - 1) {
      currentSchema[currentPathPart] = newSchema;
      break;
    }

    const currentPathSchema = unwrapSchema(currentSchema[currentPathPart]);

    if (nextPath === undefined || Number.isNaN(Number.parseInt(nextPath))) {
      currentSchema = currentPathSchema.shape;
      continue;
    }

    const elementSchema = unwrapSchema(currentPathSchema.element);
    currentSchema = elementSchema?.shape || elementSchema || currentPathSchema;
    i++;
  }

  return newShape;
};

export const zodUtils = {
  schemaForType,
  getErrorPaths,
  getNestedSchema,
  setNestedSchema,
  unwrapSchema,
};
