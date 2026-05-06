@smoke @regression
Feature: Add/Remove Elements
  The Add/Remove Elements page creates a Delete button every time Add Element is clicked.

  Scenario: Add two elements displays two delete buttons
    Given I am viewing the Add/Remove Elements page
    When I click the Add Element button 2 times
    Then 2 Delete buttons are displayed
