# Models
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

# Adding A Relation 