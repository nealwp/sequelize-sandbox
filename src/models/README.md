# Models
The models form the core of a Sequelize-based app - controllers, types, endpoints all blossom out of the data models. They're also a pain in the butt. They always seem to function, just never the way you want them to.

The goal here is to lay down a straightforward strategy for covering the basic use cases so they *just work* the first time.

## A Basic Model
```typescript
import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { CharacterAttributes, CharacterCreationAttributes } from '../@types/character.types';

@Table({tableName: 'characters'})
class Character 
extends Model<CharacterAttributes, CharacterCreationAttributes> 
implements CharacterAttributes {
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number

    @Column
    name!: string

    @Column
    age!: number

}
```

First of all, *never* do those newlines for `class...extends...implements`.  Horizontal scroll bars make for godawful code examples. You're welcome.

Second of all, *always* use that `implements` with the model attributes. This says "my model has *at least* the same properties as my interface." I haven't found a good way to do "my model has *these and only these* properties from my interface", so `implements` is the next best thing. 

If you leave off `implements`, you'll get no TypeScript errors when your model is missing properties or using the wrong types. Rather unhelpful.

Now, what's happening here? We have a Character model. If you have a thing for cognitive cartography, you can mentally map **model** to **database table**. In this case our table would look like this:

|id|name|age|
|-|-|-|
|-|-|-|

## @Table, @Column, @etc

Note that these decorators don't come from Sequelize, but rather from  `sequelize-typescript` - a separate npm package. You don't *have* to define your model with decorators, but just do it anyway. It makes a much cleaner model file versus using `Sequelize.define()`. 

Even though it's optional, always give your table a name. If you don't, someone else will, and some ~~people~~ libraries can have really kooky ideas about how to name a table.    
```typescript
@Table({tableName: 'characters'})
```


## Adding A Relation 

## Stuff that used to be in @types

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