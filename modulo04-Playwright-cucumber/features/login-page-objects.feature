Feature: Login action with page objects

    As a user
    I want to login into application

    Scenario: Login with valid credentials
        Given I visit a login page with page objects
        When I fill the login form valid credentials with page objects
        Then I should see the home page with page objects