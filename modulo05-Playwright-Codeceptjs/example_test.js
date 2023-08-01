Feature('example');

Scenario('Should load example.com website',  ({ I }) => {
    I.amOnPage("https://example.com/")
    I.see("Example")
});
