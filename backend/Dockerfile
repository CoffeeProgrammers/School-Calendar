FROM openjdk:21-jdk-slim AS build

RUN apt-get update && apt-get install -y maven

COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim

COPY --from=build /target/backend-0.0.1-SNAPSHOT.jar /app/backend.jar

ENTRYPOINT ["java", "-jar", "/app/backend.jar"]