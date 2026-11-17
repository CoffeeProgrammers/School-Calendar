FROM maven:3.9-eclipse-temurin-21 AS build


COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre

COPY --from=build /target/backend-0.0.1-SNAPSHOT.jar /app/backend.jar

ENTRYPOINT ["java", "-jar", "/app/backend.jar"]