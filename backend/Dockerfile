FROM openjdk:8-jdk-alpine
WORKDIR /opt/app
ARG JAR_FILE=target/cartShare-0.0.1-SNAPSHOT.war
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","app.jar"]