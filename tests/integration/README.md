# Integration Tests

## The Trouble With Integration Tests

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

So, we're stuck with conjuring up *all* required state before we can run our test:

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

    // then check the database for the record
    const [ dbContents ] = await db.client.query(
        `select * from inventory where id = ${result.id}`, 
        {type: QueryTypes.SELECT}
    )
        
    expect(dbContents).toEqual(result.toJSON())
})
```

Finally! We have our integration test to check that our controller can write to our database. Now we only need to do this for all the rest of the inventory controller methods...and all the character controller methods...and all the weapon controller methods...

## The Efficiency Trap

As you continue to slog through the "setup-my-database-state-for-every-test" dance, you may start to notice patterns:

*Hmm, the arrangement for this test is very similar to that other one...*

*Maybe I could move all this repeated code into the beforeEach...or the beforeAll?*

*Ugh, all this DUPLICATION! Gah, this violates SOLID principles!*

My advice: **let it be**.

Listen, integration test setup is not the time to be overly-attached to DRY. Rigorous deduplication here is only going to make your life harder. Why? Debugging. Integration tests are complex to set up and consequently difficult to debug when they don't work. Be nice to future you, and don't try to be efficient here.

Instead, try this approach:

1. Use the top-level `describe` block `beforeAll()` and `afterAll()` to wipe **all** tables clean. This way, you can immediately rule out any state leak between the inner `describe` blocks when things don't work.

1. Use the inner `describe` blocks `beforeEach()` and `afterEach()` to wipe **all** the tables clean. This way, you can also rule out any state leak between tests within that `describe`.

1. Aside from the database initialization, **make each test responsible for arranging its required state**. Whatever needs to happen to make the integration test possible should happen inside that specific `test()` or `it()` block, and *only* inside that block.

In practice, it looks like this:

```typescript
describe('my controller', () => {
    beforeAll(() => {
        // 1. initialize the db
        // 2. then wipe everything clean
    })

    afterAll(() => {
        // 1. wipe everything clean 
    })

    describe('create method', () => {
        beforeEach(() => {
            // 1. wipe everything clean
            // DO NOT do any other arranging here
        })

        afterEach(() => {
            // 1. wipe everything clean
            // DO NOT do any other arranging here
        })

        test('should create a new row', () => {
            // Arrange everything for THIS test
        })

    })

})
```

By sticking to this strategy, you can be reasonbly certain that whatever is causing your integration test to break is within the test code itself. The fewer places that problems can be, the fewer places you have to look to find them.

## Skip the Router Integration Tests

You may notice this project has no integration tests to check routes, e.g. this:

> Given when I `POST` to `/characters`, then a new character is created in the database

If this doesn't bother you, feel free to skip this next bit. 

For the rest of you, I hear what you're thinking: "Shouldn't we be writing integration tests for these route handlers too?" 

Short answer: No, don't bother.

Integration testing is for testing across application boundaries; think: *does my code behave as expected when it interacts with that database?* and *does my code behave as expected when it calls this other API?* These are natural boundaries, since the behavior we're inspecting **is dependent on stuff we can't control.** 

You could argue that there is some sort of boundary between the router and the controller, and you would be incorrect. You own the router code, you own the controller code - the only boundary that exists there is one we made up when we chose how to organize our code. You *could* put all the controller code right inside the route handler, if you were so inclined. Between the route handler and the controller, there is nothing we don't control. 

You could also argue that we should integration test the route handlers for the sake of completeness - we're covering the controller-to-database connection, we should also cover the route-handler-to-database connection, right? Yeah...no. "Just because" is an excuse, not a justification.

Think about it: what do you gain by testing the route all the way through to the database? Not much. If you have integration tests on the controller, you already know that you can get stuff into and out of the database. What does the route handler do? Well, it calls the controller; the **already tested** controller. The only additional behavior you can inspect is if the handler calls said controller, and reacts appropriately to the response it receives. Guess what? You don't need an integration test to check that. A good old unit test can do that for you.

## More On Route Handlers vs. Controllers

I think of route handlers as dumb. They're hammers - you give them a nail and they hit it. You can have fancy hammers that refuse to hit blue nails or only hit nails that are in the "Fastener Administrators" group, but in the end they still hit nails. When it comes to testing, you can tell a hammer anything and it will believe you, because it's a stupid hammer. I can mock away anything interesting, because all I really care about is how the handler *responds* to the interesting bits. This has the added benefit of letting my keep all my route handler tests as unit tests.

Controllers, on the other hand, are precision instruments. They have intimate knowledge about the exact path through the maze that is a database client connection. They've got certifications. Sure, I can mock in the interesting bits again, but that's like choosing a dentist by asking if they know which end of a toothbrush to use. We can use unit tests again to test how the controllers respond in different scenarios, but to test if they *actually work* we'll need to use integration tests.

## More Thoughts To Organize

- integration tests are complicated, simplify however you can
- if you can de-scope an integration test back down to a unit test, do so
- don't retest in an integration test what you already covered in a unit test
- limit integration tests to "happy path" tests
- keep what you're *actually* testing in focus: integration tests are for "do these things work together?", not "have I covered every edge case?"
- remember that each integration test will couple you to your implementation, so use them wisely