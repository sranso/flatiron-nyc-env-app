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
      @datasets = []
      Dir.glob('./public/data/*.json') do |model|
        @datasets << MultiJson.load(File.open(model).read)["meta"]["view"]["name"]
      end
      erb :form
    end

    #helpers
    helpers do
      def partial(file_name)
        erb file_name, :layout => false
      end
    end

  end
end
