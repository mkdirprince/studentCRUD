# Checks if make is installed 
HAS_MAKE := $(shell command make -v 2> /dev/null)

# Define variables
BUILD_DIR = ./build
IMAGE_NAME = simple-student-api

# Define targets
install:
	@echo "Install dependencies..."
	@npm install 

build:
	@echo "Building Typescript files..."
	@tsc 

test: build
	# Given that your testing database is live
	@echo "Running tests..."
	@source .env && NODE_ENV=test npm run test
	@echo "All Setup done, your code is SHIPHOME!! Run 'make run' to start the server."

dev: 
	@echo "Ready to SHIPSAFE!!"
	@npm run dev

run: build
	@echo "Setup completed."
	@echo "Starting the production server..."
	@npm start 

docker-build:
	@echo "Building Docker image..."
	@docker-compose build

docker-run:
	@echo "Starting Docker container..."
	@docker-compose up -d

docker-stop:
	@echo "Stopping Docker container..."
	@docker-compose down

docker-clean:
	@echo "Cleaning up Docker resources..."
	@docker-compose down -v --remove-orphans

docker-all: docker-build docker-run

# all target combines necessary steps
all: install build test

#clean files
clean:
	@echo "Cleaning up..."
	@rm -rf $(BUILD_DIR)

# Display installation instructions for make if it's not installed
ifeq ($(HAS_MAKE),)
$(info Make is not installed. Please install make to use this Makefile.)
$(info On Unix-like systems, you can typically install make using your package manager.)
$(info On Windows, you may need to install make through MinGW, Cygwin, or other means.)
endif

.PHONY: install build test dev run clean all docker-build docker-run docker-stop docker-clean docker-all