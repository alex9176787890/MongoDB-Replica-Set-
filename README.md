# MongoDB-Replica-Set-
Deploy a MongoDB Replica Set using Docker

##  Create three docker-machine

1. Install virtualbox on Mac

2. Create a machine called manager1 using virtualbox as the virtualization provider

````
docker-machine create -d virtualbox manager1
````

Docker is up and running!  

````
docker-machine env manager1
````
export DOCKER_TLS_VERIFY="1"  
export DOCKER_HOST="tcp://192.168.99.100:2376"  
export DOCKER_CERT_PATH="/Users/developer/.docker/machine/machines/manager1"  
export DOCKER_MACHINE_NAME="manager1"  

3. Create the two docker-machines as worker

````
docker-machine create -d virtualbox worker1
docker-machine create -d virtualbox worker2
````
````
docker-machine env worker1
````
export DOCKER_TLS_VERIFY="1"  
export DOCKER_HOST="tcp://192.168.99.101:2376"  
export DOCKER_CERT_PATH="/Users/developer/.docker/machine/machines/worker1"  
export DOCKER_MACHINE_NAME="worker1"  
````
docker-machine env worker2
````
export DOCKER_TLS_VERIFY="1"   
export DOCKER_HOST="tcp://192.168.99.102:2376"  
export DOCKER_CERT_PATH="/Users/developer/.docker/machine/machines/worker2"  
export DOCKER_MACHINE_NAME="worker2"  

````
docker-machine ls
````

NAME       ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER     ERRORS  
manager1   -        virtualbox   Running   tcp://192.168.99.100:2376           v18.09.6   
worker1    -        virtualbox   Running   tcp://192.168.99.101:2376           v18.09.6   
worker2    -        virtualbox   Running   tcp://192.168.99.102:2376           v18.09.6  

Attached our volume created to start our first mongo container and set the configurations.  

## Start the mongodb configuration, 

4. Position in the first machine to run the next command:

````
eval `docker-machine env manager1`
````

5. Configuration of master node of MongoDB

````
docker volume create --name mongo_storage
````

````
docker run --name mongoNode1 \
-v mongo_storage:/data \
-d mongo \
--smallfiles
````
6. Create the key file.
The content of the keyfile must be the same for all members of the replica set.

````
openssl rand -base64 741 > mongo-keyfile
chmod 600 mongo-keyfile
````

7. Create the folders where is going to hold the data, keyfile and configurations inside the mongo_storage volume
````
docker exec mongoNode1 bash -c 'mkdir /data/keyfile /data/admin'
````

8. Create the admin.js file, admin users for mongoDB.

9. Create the replica.js file, to init the replica set.

10. Pass the three files to the container.
````
docker cp admin.js mongoNode1:/data/admin/
docker cp replica.js mongoNode1:/data/admin/
docker cp mongo-keyfile mongoNode1:/data/keyfile/
````

11. change folder owner to the user container
````
docker exec mongoNode1 bash -c 'chown -R mongodb:mongodb /data'
````

12. Create an env file to set our users and passwords.

13. Remove the container and start a new one with the replica set and authentication parameters.
````
docker rm -f mongoNode1
// now lets start our container with authentication 
docker run --name mongoNode1 --hostname mongoNode1 \
-v mongo_storage:/data \
--env-file env \
--add-host manager1:192.168.99.100 \
--add-host worker1:192.168.99.101 \
--add-host worker2:192.168.99.102 \
-p 27017:27017 \
-d mongo --smallfiles \
--keyFile /data/keyfile/mongo-keyfile \
--replSet 'rs1' \
--storageEngine wiredTiger \
--port 27017
````

The --env-file reads an env file and sets environment variables inside the container.
The --add-host flag adds entries into the docker container’s /etc/hosts file so we can use hostnames instead of IP addresses. Here we are mapping our 3 docker-machines that we have created before.
