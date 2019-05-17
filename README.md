# MongoDB-Replica-Set-
Deploy a MongoDB Replica Set using Docker

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
