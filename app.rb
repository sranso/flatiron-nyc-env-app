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

    #routes
    get '/' do
      @datasets = []
      Dir.glob('./public/data/*.json') do |model|
        @datasets << MultiJson.load(File.open(model).read)["meta"]["view"]["name"]
      end
      erb :form
    end

  end
end
