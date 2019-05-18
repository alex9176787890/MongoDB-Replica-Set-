admin = db.getSiblingDB("admin")

admin.grantRolesToUser( "admin", [ "root" , { role: "root", db: "admin" } ] )