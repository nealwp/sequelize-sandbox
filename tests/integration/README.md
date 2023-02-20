# Integration Tests

- integration tests are complicated, simplify however you can
- if you can de-scope an integration test back down to a unit test, do so
- don't retest in an integration test what you already covered in a unit test
- limit integration tests to "happy path" tests
- keep what you're *actually* testing in focus: integration tests are for "do these things work together?", not "have I covered every edge case?"
- start fresh with every test. it's easier to explicitly create the test state each time, than to try to be "efficient" with it. The efficiency gained is naiive, it comes with the quiet cost of being much harder to hold in your head when debugging a test.
- remember that each integration test will couple you to your implementation, so use them wisely