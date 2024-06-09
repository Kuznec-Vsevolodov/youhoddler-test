# Имя контейнера
CONTAINER_NAME = bitcoin-price-service

# Переменные для Docker Compose
DOCKER_COMPOSE_FILE = docker-compose.yml

# Порт, используемый приложением
PORT = 3000

# Запуск Docker Compose
.PHONY: up
up:
	docker-compose -f $(DOCKER_COMPOSE_FILE) up -d

# Остановка Docker Compose
.PHONY: down
down:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down

# Перезапуск Docker Compose
.PHONY: restart
restart: down up

# Сборка Docker образа
.PHONY: build
build:
	docker-compose -f $(DOCKER_COMPOSE_FILE) build

# Логи Docker контейнера
.PHONY: logs
logs:
	docker-compose -f $(DOCKER_COMPOSE_FILE) logs -f

# Подключение к контейнеру для выполнения команд
.PHONY: exec
exec:
	docker-compose -f $(DOCKER_COMPOSE_FILE) exec $(CONTAINER_NAME) /bin/sh

# Удаление всех контейнеров и сетей
.PHONY: clean
clean:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down --rmi all --volumes --remove-orphans
