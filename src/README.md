# src

The root folder for the project source code.

> EDIT March 2023: Project structure was simplified to enable a "single payload --> multiple models"-style API. Checkout previous commits for a "single payload --> single model"-style API.

## Project Structure
```text
── src
    ├── @types
    │   ├── example.types.ts
    │   ├── index.ts
    │   └── ...
    │
    ├── models
    │   ├── example.model.ts
    │   ├── index.ts
    │   └── ...
    │
    ├── app.ts
    ├── controller.ts
    ├── db.ts
    ├── router.ts
    └── server.ts
```

## Folders
- **@types** - All types and interfaces for the project. Most types are used in multiple places, so it makes sense to store them in a centralized place. There should be one `*.types.ts` file per model.

- **models** - These form the core of a Sequelize project. They define your database schema and relationships.

## app.ts

This file is the entrypoint for the application. It is responsible for:
- Initializing the Sequelize instance
- Starting the Express server

## controller.ts

The `controller.ts` file exports an object with methods that *do stuff* with the models. Sequelize model methods like `findAll()`, `build()`, `destroy()` belong in a controller. *Don't call Sequelize model methods from anywhere but a controller*.

## db.ts

This file sets up the Sequelize configuration and defines the `initialize` function.

## router.ts

 The `router.ts` file defines the URL routes for your Express application. The router should import `controller.ts` for interacting with models.

## server.ts

This file is responsible for setting up the Express server, which includes loading the routes and middleware. 

It's important to note that this file *does not start the server*, but rather exports an Express instance. This makes it easier for us to write unit tests against our endpoints with libraries like `supertest`.  

## Index Files

Each directory has an `index.ts` that imports and exports everything in that folder. This pattern helps keep imports tidy.

instead of this:

```typescript
import { Inventory } from "../models/inventory.model"
import { Weapon } from "../models/weapon.model"
import { Character } from "../models/character.model"
```

we can do this:

```typescript
import { InventoryAttributes, WeaponAttributes, CharacterAttributes } from "../@types"
import { Inventory, Weapon, Character } from "../models";
```
