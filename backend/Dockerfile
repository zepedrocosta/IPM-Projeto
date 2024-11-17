FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/ipmProj-0.0.1-SNAPSHOT.jar ipmProj-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "ipmProj-0.0.1-SNAPSHOT.jar"]
