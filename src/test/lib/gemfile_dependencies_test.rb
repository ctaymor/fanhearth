require "test_helper"

class GemfileDependenciesTest < ActiveSupport::TestCase
  setup do
    @gemfile_content = File.read(Rails.root.join("Gemfile"))
  end

  test "pg gem is declared in the Gemfile" do
    assert_match(/gem ["']pg["']/, @gemfile_content)
  end

  test "turbo-rails gem is declared in the Gemfile" do
    assert_match(/gem ["']turbo-rails["']/, @gemfile_content)
  end

  test "stimulus-rails gem is declared in the Gemfile" do
    assert_match(/gem ["']stimulus-rails["']/, @gemfile_content)
  end
end
