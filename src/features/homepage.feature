@smoke @regression
Feature: Homepage examples
  The homepage is the launch point for every example on The Internet.

  Scenario: Homepage lists all expected example links
    Given I am on the homepage
    Then every expected homepage example link is visible

  Scenario Outline: Homepage example links navigate to their pages
    Given I am on the homepage
    When I open the homepage example named "<name>"
    Then the "<name>" example page is loaded

    Examples:
      | name                          |
      | A/B Testing                   |
      | Add/Remove Elements           |
      | Basic Auth                    |
      | Broken Images                 |
      | Challenging DOM               |
      | Checkboxes                    |
      | Context Menu                  |
      | Digest Authentication         |
      | Disappearing Elements         |
      | Drag and Drop                 |
      | Dropdown                      |
      | Dynamic Content               |
      | Dynamic Controls              |
      | Dynamic Loading               |
      | Entry Ad                      |
      | Exit Intent                   |
      | File Download                 |
      | File Upload                   |
      | Floating Menu                 |
      | Forgot Password               |
      | Form Authentication           |
      | Frames                        |
      | Geolocation                   |
      | Horizontal Slider             |
      | Hovers                        |
      | Infinite Scroll               |
      | Inputs                        |
      | JQuery UI Menus               |
      | JavaScript Alerts             |
      | JavaScript onload event error |
      | Key Presses                   |
      | Large & Deep DOM              |
      | Multiple Windows              |
      | Nested Frames                 |
      | Notification Messages         |
      | Redirect Link                 |
      | Secure File Download          |
      | Shadow DOM                    |
      | Shifting Content              |
      | Slow Resources                |
      | Sortable Data Tables          |
      | Status Codes                  |
      | Typos                         |
      | WYSIWYG Editor                |
