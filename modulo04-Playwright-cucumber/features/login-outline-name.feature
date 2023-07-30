Feature: Login action with outline name

    As a user
    I want to login into application

    Scenario: Login with valid credentials
        Given I visit a login page and outline name
        When I fill the login form valid credentials and outline name
        Then I should see the home page and outline name

        Scenario Outline: Try to login with invalid credentials
            Given I visit a login page and outline name
            When I fill the login form with "<username>" and "<password>"
            Then I wait for 3 seconds

            Examples:
            | username  | password  |
            | fail-1    | fail-1    |
            | fail-2    | fail-2    |
            | fail-3    | fail-3    |