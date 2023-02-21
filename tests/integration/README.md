# Integration Tests

- integration tests are complicated, simplify however you can
- if you can de-scope an integration test back down to a unit test, do so
- don't retest in an integration test what you already covered in a unit test
- limit integration tests to "happy path" tests
- keep what you're *actually* testing in focus: integration tests are for "do these things work together?", not "have I covered every edge case?"

- remember that each integration test will couple you to your implementation, so use them wisely

## Cleaning House

Setting up integration tests is a pain in the butt, because most integration tests are dependent on state. For example, let's say you want to write an integration test that says *I can update the owner of an inventory record from one character to another.* That's pretty easy, right?

```typescript
test('should update the owner of an inventory to a different character id', () => {
    const newCharacterId = 1234
    const result = inventory.update(9999, newCharacterId)
    expect(result).toEqual({ id: 9999, characterId: 1234 })
})
```

Nope, this won't work, because `.update()` is the controller method that wraps the database model. Calling it means it does stuff to your database. If your testing database is empty, *there is no inventory with id 9999*. You can't update a record that doesn't exist. This test will fail before it ever gets to the assertion.

Oh, well, that's an easy fix, isn't it? You'll just create the inventory record before you do stuff to it. Problem solved:

```typescript
test('should update the owner of an inventory to a different character id', () => {
    
    // create the inventory record
    const sql = `insert into inventory (id) values (9999)`
    await db.client.query(sql, { type: QueryTypes.INSERT })
    
    // then do the test
    const newCharacterId = 1234
    const result = inventory.update(9999, newCharacterId)
    expect(result).toEqual({ id: 9999, characterId: 1234 })
})
```

Nope, that doesn't work either. If `inventory.characterId` is constrained to `character.id` with a foreign key, *you can't assign an inventory to a character that doesn't exist*. Once again, the test breaks before it gets to the assertion. You have to *also* create the character row for the character ID you want to use.

But - this test isn't about the character record! I only care if the inventory part works!

Well, per the laws of relational database physics, *you can't do that*. If you want to test that your record is getting updated in the database, you don't get to sidestep the rules the database enforces to protect you from creating a soup sandwich with your data.

So, we're stuck with conjuring up *all* required state *before* we can run our test:

```typescript
test('should update the owner of an inventory to a different character id', () => {
    
    // create the inventory record
    const inventorySql = `insert into inventory (id) values (9999)`
    await db.client.query(inventorySql, { type: QueryTypes.INSERT })
    
    // create the character record
    const characterSql = `insert into characters (id) values (1234)`
    await db.client.query(characterSql, { type: QueryTypes.INSERT })

    // and then do the test
    const newCharacterId = 1234
    const result = inventory.update(9999, newCharacterId)
    expect(result).toEqual({ id: 9999, characterId: 1234 })
})
```

At this point, our test *should* pass. However, this test still isn't good enough. At best, it tells us that `inventory.update()` returns an object with the correct ID's. The only safe assumption we can make here is that whoever wrote the code behind that method is a maniacal imp devoted to cooking up deep-fried chaos. Maybe that object is returned *no matter what*...maybe that's the *error response*... 

Since we've now slipped to the appropriate level of paranoia, we'll need to verify the change is present **in the actual database**. 


# another header

First off, always wipe the database in the `beforeAll` for the top level `describe` block:

```typescript
describe('character controller', () => {
    beforeAll(async () => {
        db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')
    })
    // ...
})
```

Second off, always wipe the database in the `afterAll` for the top level `describe` block:

```typescript
describe('character controller', () => {
    // ...
    afterAll(async () => {
        db.client.query('TRUNCATE TABLE characters RESTART IDENTITY CASCADE')
    })
    // ...
})
```

This  that before the suite runs, the database is clean

- start fresh with every test. it's easier to explicitly create the test state each time, than to try to be "efficient" with it. The efficiency gained is naiive, it comes with the quiet cost of being much harder to hold in your head when debugging a test.