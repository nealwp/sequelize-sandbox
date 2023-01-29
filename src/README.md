# src
The root folder for the project source code.
## Project Structure
```text
./src
├── @types
│   ├── example.types.ts
│   └── index.ts
│
├── controllers
│   ├── example.controller.ts
│   └── index.ts
│
├── models
│   ├── example.model.ts
│   └── index.ts
│
├── routes
│   ├── example.routes.ts
│   └── index.ts
│
├── app.ts
├── db.ts
└── server.ts
```

## Folders
- **@types** - All types and interfaces for the project. Most types are used in multiple places, so it makes sense to store them in a centralized place. There should be one `*.types.ts` file per model.

- **controllers** - Controllers are the behaviors behind each model. These export objects with methods that *do stuff* with the models. If you are calling Sequelize model methods like `findAll()`, `build()`, `destroy()`, then that code belongs in a controller. In other words: *don't put Sequelize model code in anything but a controller*. There should be one `*.controller.ts` file per model.

- **models** - These form the core of a Sequelize project. They define your database schema and relationships. Every model should have one `*.types.ts` file, one `*.controller.ts` file, and one `*.routes.ts` file.

- **routes** - These define the URL routes for your Express application. Every model should have one corresponding `*.routes.ts` file.

## Index Files

Each directory has an `index.ts` that imports and exports everything in that folder. This pattern helps keep imports tidy.

instead of this:

```typescript
import { Inventory } from "../models/inventory.model"
import { Weapon } from "../models/weapon.model"
import { Character } from "../models/character.model"
import { InventoryAttributes } from "../@types/inventory.types"
import { WeaponAttributes } from "../@types/weapon.types"
import { CharacterAttributes } from "../@types/character.types"
```

we can do this:

```typescript
import { InventoryAttributes, WeaponAttributes, CharacterAttributes } from "../@types"
import { Inventory, Weapon, Character } from "../models";
```

## Import *

With index files, the `import * as <name>` syntax can also be used:

Before, importing from specific file:

```typescript
import { inventory } from "../controllers/inventory.controller"
import { weapons } from "../controllers/weapon.controller"
import { characters } from "../controllers/incharacterventory.controller"

const allCharacters = await characters.findAll()
const allWeapons = await weapons.findAll()
const allInventory = await inventory.findAll()
```

After, with index.ts:

```typescript
import * as controllers from "../controllers"

const allCharacters = await controllers.characters.findAll()
const allWeapons = await controllers.weapons.findAll()
const allInventory = await controllers.inventory.findAll()
```