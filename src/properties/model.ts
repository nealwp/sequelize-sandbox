import { Column, Table, Model, DataType } from "sequelize-typescript";

interface CreationAttributes {
    state: string;
}

interface Attributes extends CreationAttributes {
    id: number;
}

@Table({ tableName: 'property' })
export class Property extends Model<Attributes, CreationAttributes> implements Attributes {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    override id!: number;

    @Column({ type: DataType.STRING })
    state!: string;
}
