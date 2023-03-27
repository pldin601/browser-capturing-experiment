FROM node:18

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends wget curl xvfb xauth chromium

WORKDIR /code

ADD package.json ./
ADD package-lock.json ./
RUN npm install
ADD server.js ./
ADD server2.js ./
ADD run.sh ./

CMD ["./run.sh"]
