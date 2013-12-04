(->

  # Include the Node Cluster module
  cluster = require "cluster"
  
  os = require "os"

  # Retrieve the total number of CPU's available
  numCPUs = os.cpus().length

  # If master is ran (from CLI)
  if cluster.isMaster
    i = 0
    # Fork worker processes
    while i < numCPUs
      cluster.fork()
      i++
    cluster.on "exit", (worker, code, signal) ->
      console.log "worker " + worker.process.id + " died"
  else
    instance = require "./instance"

)()