@regression
Feature: Example feature flows
  Focused flows exercise representative functionality using real selectors from the target site.

  @smoke
  Scenario: Add and remove an element
    Given I am on the Add/Remove Elements page
    When I add an element
    Then 1 delete button is displayed
    When I delete an element
    Then 0 delete buttons are displayed

  @smoke
  Scenario: Toggle checkboxes
    Given I am on the Checkboxes page
    When I check checkbox 1
    And I uncheck checkbox 2
    Then checkbox 1 is checked
    And checkbox 2 is unchecked

  Scenario: Select a dropdown option from fixture data
    Given I am on the Dropdown page
    When I select the configured dropdown option
    Then the configured dropdown option is selected

  @smoke
  Scenario: Log in with fixture user
    Given I am on the Form Authentication page
    When I log in as the valid fixture user
    Then the secure area is displayed

  Scenario: Enter a number from fixture data
    Given I am on the Inputs page
    When I enter the configured input number
    Then the configured input number is displayed

  Scenario: Accept a JavaScript alert
    Given I am on the JavaScript Alerts page
    When I accept a JavaScript alert
    Then the alert result message is "You successfully clicked an alert"

  Scenario: Validate a status code response
    Given I am on the Status Codes page
    When I open the configured success status code
    Then the configured success status page is displayed

  @smoke
  Scenario: Drag column A to column B swaps their labels
    Given I am on the Drag and Drop page
    When I drag column A to column B
    Then column A displays "B"
    And column B displays "A"
