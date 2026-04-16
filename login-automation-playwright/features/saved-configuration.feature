Feature: Create a new saved configuration in Operations Center

  As a user of Aquera SecureHome
  I want to create and save a new configuration
  So that I can manage endpoint settings efficiently

  Scenario: User creates a new saved configuration
    Given the user navigates to "https://dev.aqueralabs.com/securehome/endpoints"
    When the user logs in with valid credentials
    And the user clicks on "Operations Center"
    And the user clicks on "Savings"
    And the user waits for 3 seconds
    And the user clicks on the bottom "Add New" button
    And the user waits for 3 seconds
    And the user enters a configuration name "NEW 2"
    And the user waits for 2 seconds
    And the user clicks on the bottom "Save" button
    Then the saved configuration "NEW 2" should be displayed
