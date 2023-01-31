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