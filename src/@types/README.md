# @types

The types behind each model follow a pattern:

```typescript
// example.types.ts

import { Optional } from 'sequelize';
import { Example } from '../models';
import { Controller } from './controller.types';

/* Attributes */
interface ExampleAttributes {
    id: number,
    ...    
}

/* Creation Attributes */
interface ExampleCreationAttributes extends Optional<ExampleAttributes, 'id'> {}

/* Controller Interface */
interface ExampleController extends Controller<Example, ExampleAttributes, ExampleCreationAttributes> {}
```

## Attributes

This defines the basic data model. Think of this as the data type that will be returned when you call the GET endpoint for the `Example` resource, i.e. `GET /example/:id`. 

This interface should also match the Sequelize model in `example.model.ts`, minus the created/updated/deleted dates that are added by Sequelize. 

```typescript
interface ExampleAttributes {
    id: number,         // generally, all models will have an id
    name: string,
    friends: Friend[]   // you can also include other model types  
    ...    
}
```
Note that `Friend` would be a **model** imported from `friend.model.ts`, not the `FriendAttributes` type from `friend.types.ts`  


## Creation Attributes

CreationAttributes are the same as Attributes, but with the id set to optional. This allows strong typing for input data, such as payloads to POST endpoints.

```typescript
interface ExampleCreationAttributes extends Optional<ExampleAttributes, 'id'> {}
```

If you have multiple properties that need to be optional (such as a foreign key), you can union them like so:

```typescript
interface ExampleCreationAttributes extends Optional<ExampleAttributes, 'id' | 'anotherId'> {}
```

## Controller Interface

We expect a 1:1:1 relationship between Type:Model:Controller, therefore we can go ahead and create a controller interface for this model.

```typescript
interface ExampleController extends Controller<Example, ExampleAttributes, ExampleCreationAttributes> {}
```

The model controller extends the generic controller interface, which defines the basic CRUD operations.

```typescript
// controller.types.ts

interface Controller<T, A, C> {
    create: (resource: C) => Promise<T>,
    update: (resource: A) => Promise<T>,
    findById: (id: number) => Promise<T>,
    findAll: () => Promise<T[]>
}
```

If you need additional methods for you model controller, simply add their function type expressions to the interface:

```typescript
interface ExampleController extends Controller<Example, ExampleAttributes ExampleCreationAttributes> {
    findExampleByName: (name: string) => Promise<Example>
}
```
