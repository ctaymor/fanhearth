require "test_helper"

class AppBootsTest < ActionDispatch::IntegrationTest
  test "app boots without errors" do
    assert_nothing_raised { Rails.application.eager_load! }
  end
end
