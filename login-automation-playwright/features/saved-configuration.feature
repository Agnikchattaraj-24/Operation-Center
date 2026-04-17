Feature: Operations Center saved configuration and overview dashboard flows

  As a user of Aquera SecureHome
  I want to manage saved configurations and access the overview dashboard
  So that I can manage endpoint settings and view system operational status

  Scenario: User creates a new saved configuration and opens Agents from overview
    Given the user navigates to "https://dev.aqueralabs.com/securehome/endpoints"
    When the user logs in with valid credentials
    And the user clicks on "Operations Center"
    And the user clicks on "Savings"
    And the user waits for 3 seconds
    And the user clicks on the bottom "Add New" button
    And the user waits for 3 seconds
    And the user enters a configuration name "2244"
    And the user waits for 2 seconds
    And the user clicks on the bottom "Save" button
    Then the saved configuration "2244" should be displayed
    When the user closes the saved configuration panel
    And the user clicks on the "Last 30 Days" button
    And the user clicks on the "Last 7 Days" option
    And the user waits for 11 seconds
    And the user clicks on the "Last 7 Days" button
    And the user clicks on the "Custom" option
    And the user waits for 3 seconds
    And the user clicks on the day "4" in the calendar
    And the user waits for 3 seconds
    And the user clicks on the day "14" in the calendar
    And the user waits for 1 seconds
    And the user clicks on the "Apply" button
    And the user toggles to the "Agents" view
    Then the Agents module should open in a new tab
