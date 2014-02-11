require 'bundler'
Bundler.require

Dir.glob('./lib/*.rb') do |model|
  require model
end

module Name
  class App < Sinatra::Application

    #configure
    configure do
      set :root, File.dirname(__FILE__)
      set :public_folder, 'public'
    end

    #database
    set :database, "sqlite3:///database.db"

    #filters

    #routes
    get '/' do
      erb :index
    end

    get '/map' do
      erb :map
    end

    get '/filter' do
      erb :form
    end

    post '/filter' do
      erb :form_results
    end

    #helpers
    helpers do
      def partial(file_name)
        erb file_name, :layout => false
      end
    end

  end
end
