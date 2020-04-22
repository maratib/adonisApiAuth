# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds
6. Validator
7. Lucid Filters
8. Sqlite3

## Setup

Use the adonis command to install the blueprint

```bash
npm install 
adonis key:generate
adonis migration:refresh
adonis seed
adonis serve --dev
```

or manually clone the repo and then run `npm install`.

```bash
Usage:
  command [arguments] [options]

Global Options:
  --env              Set NODE_ENV before running the commands
  --no-ansi          Disable colored output

Available Commands:
  addon              Create a new AdonisJs addon
  install            Install Adonisjs provider from npm/yarn and run post install instructions
  new                Create a new AdonisJs application
  repl               Start a new repl session
  serve              Start Http server
 key
  key:generate       Generate secret key for the app
 make
  make:command       Make a new ace command
  make:controller    Make a new HTTP or Websocket channel controller
  make:ehandler      Make a new global exception handler
  make:exception     Make a new exception
  make:hook          Make a new lucid model hook
  make:listener      Make a new event or redis listener
  make:middleware    Make a new HTTP or Ws Middleware
  make:migration     Create a new migration file
  make:model         Make a new lucid model
  make:provider      Make a new provider
  make:seed          Create a database seeder
  make:trait         Make a new lucid trait
  make:view          Make a view file
 route
  route:list         List all registered routes
 run
  run:instructions   Run instructions for a given module
```
