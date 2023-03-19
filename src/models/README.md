# Models
The models form the core of a Sequelize-based app. They're also a pain in the butt. They always seem to function, just never the way you want them to.

The goal here is to lay down a straightforward strategy for covering the basic use cases so they *just work* the first time. We'll start with an example and explain each part.

## A Basic Model
```typescript
// character.model.ts

import { Table, Column, Model, CreatedAt, UpdatedAt, DataType } from 'sequelize-typescript';
import { Character as CharacterCreationAttributes} from '../@types/character.types';

interface CharacterAttributes extends CharacterCreationAttributes {
    id: number,
    createdAt: Date,
    updatedAt: Date
}

interface ColumnOptions extends ModelAttributeColumnOptions {
    field: string
}

type CharacterKeys = keyof CharacterAttributes

const columnDefinition: Record<CharacterKeys, ColumnOptions> = {
    id: {
        primaryKey: true,
        field: 'id',
        autoIncrement: true,
        type: DataType.INTEGER
    },
    name: {
        field: 'name',
        type: DataType.STRING
    },
    age: {
        field: 'age',
        type: DataType.INTEGER
    },
    createdAt: {
        field: 'created_at',
        type: DataType.DATE
    },
    updatedAt: {
        field: 'updated_at',
        type: DataType.DATE
    }
}

const tableDefinition = {
    tableName: 'character'
}

@Table(tableDefinition)
class Character 
extends Model<CharacterAttributes, CharacterCreationAttributes> 
implements CharacterAttributes {
    
    @Column(columnDefinition.id)
    id!: number

    @Column(columnDefinition.name)
    name!: string

    @Column(columnDefinition.age)
    age!: number
    
    @Column(columnDefinition.createdAt)
    createdAt!: Date
    
    @Column(columnDefinition.updatedAt)
    updatedAt!: Date

}
```

## Imports

## Attributes

If the `CreationAttributes` are the core type, the `Attributes` interface is the core type plus the extra model stuff, like primary keys, foreign keys, and data from child tables that is meant to be consumed along with the parent record. Think of this as the data type that will be returned when you call the GET endpoint for the `Character` resource, i.e. `GET /character/:id`. 

This interface will be used to help us define the Sequelize model, as well as properly type controller inputs and output. 

```typescript
interface CharacterAttributes extends CharacterCreationAttributes {
    id: number,         // generally, all models will have an id
    createdAt: Date,
    updatedAt: Date   
    ...    
}
```

## Model Declaration

```typescript
// character.model.ts

@Table({tableName: 'character'})
class Character 
extends Model<CharacterAttributes, CharacterCreationAttributes> 
implements CharacterAttributes {
    
    @Column
    id!: number

    @Column
    name!: string

    @Column
    age!: number

}
```

First of all, *don't* do those newlines for `class...extends...implements`.  Horizontal scroll bars make for godawful code examples. You're welcome.

Second of all, *always* use that `implements` with the model attributes. This says "my model has *at least* the same properties as my interface." I haven't found a good way to do "my model has *these and only these* properties from my interface", so `implements` is the next best thing. 

If you leave off `implements`, you'll get no TypeScript errors when your model is missing properties or using the wrong types. Rather unhelpful.

Now, what's happening here? We have a Character model. If you have a thing for cognitive cartography, you can mentally map **model** to **database table**. In this case our table would look like this (*data added for fun*):

<div align="center">
    <table>
        <tr>
            <th>id</th>
            <th>name</th>
            <th>age</th>
            <th>created_at</th>
            <th>updated_at</th>
        </tr>
        <tr style="text-align: center;">
            <td>1</td>
            <td>Bob</td>
            <td>31</td>
            <td>3/18/2023</td>
            <td>3/18/2023</td>
        </tr>
        <tr style="text-align: center;">
            <td>2</td>
            <td>Alice</td>
            <td>41</td>
            <td>3/18/2023</td>
            <td>3/18/2023</td>
        </tr>
    </table>
</div>


## @Table, @Column, @etc

Note that these decorators don't come from Sequelize, but rather from  `sequelize-typescript` - a separate npm package. You don't *have* to define your model with decorators, but just do it anyway. It makes a much cleaner model file versus using `Sequelize.define()`. 

Even though it's optional, always give your table a name. If you don't, someone else will, and some ~~people~~ libraries can have really kooky ideas about how to name a table.    
```typescript
@Table({tableName: 'character'})
```

## Making Migrations Easy

We can enhance this model pattern by creating a column definition object:

```typescript
/* "field" is optional by default, this makes it required */
interface ColumnOptions extends ModelAttributeColumnOptions {
    field: string
}

/* this is set up for the "columnDefinition" object */
type CharacterKeys = keyof CharacterAttributes

/* the type here forces us to implement a column for every attribute */
const columnDefinition: Record<CharacterKeys, ColumnOptions> = {
    id: {
        primaryKey: true,
        field: 'id',
        autoIncrement: true,
        type: DataType.INTEGER
    },
    name: {
        field: 'name',
        type: DataType.STRING
    },
    age: {
        field: 'age',
        type: DataType.INTEGER
    }
}
```

We use this object in our `@Column` decorators:

```typescript
@Table({tableName: 'character'})
class Character extends Model<CharacterAttributes, CharacterCreationAttributes> 
implements CharacterAttributes {
    
    @Column(columnDefinition.id)
    id!: number

    @Column(columnDefinition.name)
    name!: string

    @Column(columnDefinition.age)
    age!: number

}
```

Doing this will also make our Umzug migrations much easier and cleaner. We can export our column definition and import for use in our migrations.

## Adding A Relation 

## Stuff that used to be in @types

## Creation Attributes

CreationAttributes are the same as Attributes, but with the id set to optional. This allows strong typing for input data, such as payloads to POST endpoints.

```typescript
interface ExampleCreationAttributes extends Optional<ExampleAttributes, 'id'> {}
```

If you have multiple properties that need to be optional (such as a foreign key), you can union them like so:
