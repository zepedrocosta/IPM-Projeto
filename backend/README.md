# Comandos para correr o Backend

Compilar e gerar o *.jar

```cmd
mvn clean package
```

Build da imagem

```cmd
docker build -t ipmproj .
```

Correr o container

```cmd
docker run -p 8080:8080 ipmproj
```

**Verificar no UNRAID se os containers foram atualizados!!** 