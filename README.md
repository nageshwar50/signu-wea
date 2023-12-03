version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
    depends_on:
      - mysql
    networks:
      - my-network

  mysql:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: your-root-password
      MYSQL_DATABASE: your-database-name
      MYSQL_USER: your-username
      MYSQL_PASSWORD: your-password
    ports:
      - "3306:3306"
    networks:
      - my-network

  pma:
    image: phpmyadmin/phpmyadmin:latest
    container_name: pma
    environment:
      PMA_HOST: 127.0.0.1
    network_mode: host
    volumes:
      - ./def.conf:/etc/apache2/sites-available/000-default.conf
      - ./ports.conf:/etc/apache2/ports.conf

networks:
  my-network:
    driver: bridge

