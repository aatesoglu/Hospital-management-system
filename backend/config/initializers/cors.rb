Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # For development, allow all. In production, restrict to frontend URL.

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
