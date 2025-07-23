# Use official Maven image with Java 17 (compatible with Spring Boot 3)
FROM maven:3.9.6-eclipse-temurin-17

# Set working directory inside the container
WORKDIR /app

# Copy everything from your local folder to /app in the container
COPY . .

# Build the Spring Boot application
RUN mvn clean package -DskipTests

# Run the built jar file
CMD ["java", "-jar", "target/jobboard-0.0.1-SNAPSHOT.jar"]
