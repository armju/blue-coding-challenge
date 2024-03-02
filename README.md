<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Explation

1. Recibir un URL largo
Cuando un usuario envía un URL largo que quiere acortar, nuestro sistema lo recibe a través de un endpoint específico.

2. Generar un URL corto
Para este URL largo, generamos un identificador único corto. Esto se hace usando una función (por ejemplo, nanoid) que crea una cadena de caracteres aleatoria. Esta cadena será el "alias" o versión corta del URL original.

3. Guardar el par URL largo y URL corto
Guardamos ambos, el URL largo original y el URL corto generado, en nuestra base de datos. Así, cada vez que alguien acceda al URL corto, sabremos a qué URL largo redirigirlo.

4. Redirección usando el URL corto
Cuando alguien ingresa el URL corto, buscamos en la base de datos el URL largo correspondiente a ese identificador corto y redirigimos al usuario a ese URL largo.

5. Contar las visitas
Cada vez que redirigimos desde un URL corto a su URL largo, contamos esa acción. Esto nos permite saber cuántas veces se ha accedido a cada URL corto.

6. Obtener el título de la página del URL largo
Para cada URL largo, ejecutamos un trabajo en segundo plano que visita el URL, obtiene el título de la página web y guarda ese título en la base de datos junto al URL largo y corto.

7. Listar los URLs más populares
Podemos listar los URLs más accesados basándonos en el contador de visitas, mostrando tanto los URLs cortos como los largos y sus títulos.

En resumen, la lógica detrás del acortador de URLs involucra generar un identificador único para cada URL largo, guardar este par en la base de datos, permitir la redirección de los URLs cortos a sus correspondientes URLs largos, contar las veces que se utiliza cada URL corto, y opcionalmente, recolectar información adicional como el título de la página.

## License

Nest is [MIT licensed](LICENSE).
