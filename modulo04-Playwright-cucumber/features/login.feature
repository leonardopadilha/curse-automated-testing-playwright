Feature: Login action

    As a user
    I want to login into application

    Scenario: Login with valid credentials
        Given I visit a login page
        When I fill the login form valid credentials
        Then I should see the home page