import { Optional } from 'sequelize';
import { Inventory } from '../models';
import { Controller } from './controller.types';

interface InventoryAttributes {
    id: number,
    characterId: number
}

interface InventoryCreationAttributes extends Optional<InventoryAttributes, 'id'> {}

interface InventoryController extends Controller<Inventory, InventoryAttributes, InventoryCreationAttributes> {}

export {InventoryAttributes, InventoryCreationAttributes, InventoryController }