@smoke @regression
Feature: Add/Remove Elements
  The Add/Remove Elements page creates and removes Delete buttons for manually added elements.

  Scenario: Add two elements displays two delete buttons
    Given I am viewing the Add/Remove Elements page
    When I click the Add Element button 2 times
    Then 2 Delete buttons are displayed

  Scenario: Add two elements and delete both leaves no delete buttons
    Given I am viewing the Add/Remove Elements page
    When I click the Add Element button 2 times
    And I click the Delete button 2 times
    Then no Delete buttons are displayed
