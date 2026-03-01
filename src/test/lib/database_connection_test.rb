require "test_helper"

class DatabaseConnectionTest < ActiveSupport::TestCase
  test "can connect to the PostgreSQL database" do
    assert ActiveRecord::Base.connection.active?
  end

  test "database adapter is postgresql" do
    adapter = ActiveRecord::Base.connection.adapter_name.downcase
    assert_includes adapter, "postgresql",
      "Expected the database adapter to be PostgreSQL, got: #{adapter}"
  end
end
