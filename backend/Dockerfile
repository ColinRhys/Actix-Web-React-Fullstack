FROM rust:slim-buster
WORKDIR /app
COPY . /app/
COPY .env /app/.env
RUN  apt-get update \
  && apt-get install -y wget gnupg2 libpq-dev pkg-config libssl-dev curl telnet

RUN cargo build --release

RUN chmod +x /app/run.sh
EXPOSE 8081 8080
RUN cargo install \
  systemfd  \
  cargo-watch
RUN cargo install diesel_cli --no-default-features --features postgres