FROM node:20-bookworm

# RUN npx -y playwright@1.40.1 install --with-deps

RUN mkdir test-app

WORKDIR /test-app

COPY . /test-app

RUN npm ci && npx playwright install --with-deps chromium

ENV BASE_URL=https://qauto.forstudy.space
ENV USER_LOGIN=guest
ENV USER_PASS=welcome2qauto
ENV API_URL=https://qauto.forstudy.space/api
ENV API_USER_EMAIL=aqa-testuser123@test.com
ENV API_USER_PASS=aqaUserTest123

CMD ["npm", "run", "test:hw22"]
