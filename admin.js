admin = db.getSiblingDB("admin")
// creation of the admin user
admin.createUser(
  {
    user: "admin",
    pwd: "adminPassword2019",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
// let's authenticate to create the other user
db.getSiblingDB("admin").auth("admin", "adminPassword2019" )
// creation of the replica set admin user
db.getSiblingDB("admin").createUser(
  {
    "user" : "replicaAdmin",
    "pwd" : "replicaAdminPassword2019",
    roles: [ { "role" : "clusterAdmin", "db" : "admin" } ]
  }
)