# Learning Basic Commands

- This challenge was divided in three different scenarios: Backend, Frontend and Database. So, to complete the challenge, I need to build an image(except for Mongo, because already exists) and create/run a container based on the images.

### Commands to run Back(Node), Front(React) and Database(Mongo) env
> docker run --name node-app --rm -v [PATH_TO_MY_BACKENDAPP]:/app -v /app/node_modules -v logs:/app/logs -p 80:80 -d --env-file ./.env --network goals-net goals-node

> docker run -p 3000:3000 --rm --name react-app -it -v [PATH_TO_MY_FRONTENDAPP]/src:/app/src -v /app/node_modules goals-react

> docker run --name mongodb -v goalsdb:/data/db --rm -d -e MONGO_INITDB_ROOT_USERNAME=faos -e MONGO_INITDB_ROOT_PASSWORD --network goals-net -p 27017:27017 mongo                                                                           
#### Explaining
This container named node-app has three different kinds of volumes.<br>
Volume can be understood as a folder on your host machine mapped into container folders.

First volume is called <b>BIND MOUNT: </b><br/> -v [PATH_TO_MY_APP]:/app and -v [PATH_TO_MY_FRONTENDAPP]/src:/app/src <br/> 
This one is used to persist/synchronize the host source code with container source code. Bind Mount Volumes is so useful to persist data even container has been deleted. It's managed by dev, you define the path to store the data, so you can use to synchronize/link the host source code with the container source code, like here.<br/>

The second volume used here is known as <b>ANONYMOUS VOLUMES: -v /app/node_modules</b><br/>
It's used to storage temporary data. No name, no reuse, so if you delete the container, you'll lost the volume.<br/>
Here doesn't have node_modules on host, because it's installed when the image is built, but when bind mount is called, node_modules get overwritten, to prevent it, I use Anonymous Volumes. In docker the most specific path "wins", therefore this volume can be called to locking in certain data which already exists in the container.

The last volume is called <b>NAMED VOLUME: </b><BR/>-v logs:/app/logs and -v goalsdb:/data/db <br/>
Different from A.V it can be reused, so you wont lost even the container has been removed. The dev will give it a name and docker will manage. logs and database doesn't need to be edited directly, so named volumes is better than bind mount.

Passed through volumes, I mapped containers port to my local port, run some containers in detach mode -d to free my terminal and run the container in the background, create a network to allow communication between containers (back and database). Network is a way to facilitate the communication Container to Container without using their IPs(that change when the container rebuild or restart). For database container I great two environment variables to limited the access.