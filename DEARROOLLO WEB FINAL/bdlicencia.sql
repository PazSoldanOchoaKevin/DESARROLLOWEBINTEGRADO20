-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-12-2020 a las 04:15:35
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdlicencia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `dnicli` int(8) NOT NULL,
  `nomcli` varchar(40) NOT NULL,
  `apecli` varchar(40) NOT NULL,
  `dircli` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`dnicli`, `nomcli`, `apecli`, `dircli`) VALUES
(12457836, 'Omar', 'Peralta', 'Lima'),
(44556699, 'Briggitt', 'Villanueva', 'Miami'),
(98745122, 'Alfredo', 'Padilla', 'Chincha');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `licencia`
--

CREATE TABLE `licencia` (
  `codlic` int(8) NOT NULL,
  `tiplic` varchar(20) NOT NULL,
  `permlic` varchar(20) NOT NULL,
  `dnicli` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `licencia`
--

INSERT INTO `licencia` (`codlic`, `tiplic`, `permlic`, `dnicli`) VALUES
(363, 'A3', 'Internacional', 44556699),
(500, 'A1', 'Internacional', 44556699),
(1000, 'A2', 'Internacional', 12457836),
(3000, 'A2', 'Internacional', 44556699);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipolicencia`
--

CREATE TABLE `tipolicencia` (
  `tiplic` varchar(20) NOT NULL,
  `monlic` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipolicencia`
--

INSERT INTO `tipolicencia` (`tiplic`, `monlic`) VALUES
('A1', 100),
('A2', 200),
('A3', 300);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`dnicli`);

--
-- Indices de la tabla `licencia`
--
ALTER TABLE `licencia`
  ADD PRIMARY KEY (`codlic`),
  ADD KEY `dnicli` (`dnicli`),
  ADD KEY `tiplic` (`tiplic`);

--
-- Indices de la tabla `tipolicencia`
--
ALTER TABLE `tipolicencia`
  ADD PRIMARY KEY (`tiplic`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `licencia`
--
ALTER TABLE `licencia`
  ADD CONSTRAINT `licencia_ibfk_1` FOREIGN KEY (`dnicli`) REFERENCES `cliente` (`dnicli`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `licencia_ibfk_2` FOREIGN KEY (`tiplic`) REFERENCES `tipolicencia` (`tiplic`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
