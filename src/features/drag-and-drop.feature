@regression
Feature: Drag and Drop
  The Drag and Drop example allows columns to swap labels by dragging one column onto another.

  @smoke
  Scenario: Drag column A to column B swaps their labels
    Given I am on the Drag and Drop page
    When I drag column A to column B
    Then column A displays "B"
    And column B displays "A"
