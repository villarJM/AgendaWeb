-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-06-2023 a las 22:42:49
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agenda_medica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventday`
--

CREATE TABLE `eventday` (
  `IDd` int(11) NOT NULL,
  `date` varchar(10) NOT NULL,
  `hour` varchar(12) NOT NULL,
  `state` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `eventday`
--

INSERT INTO `eventday` (`IDd`, `date`, `hour`, `state`) VALUES
(1, '2023-05-29', '08:00:00 am', 'reserved'),
(2, '2023-05-30', '09:00:00 am', 'reserved'),
(3, '2023-05-31', '08:00:00 am', 'reserved');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventhour`
--

CREATE TABLE `eventhour` (
  `IDh` int(10) NOT NULL,
  `time` varchar(20) NOT NULL,
  `state` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `eventhour`
--

INSERT INTO `eventhour` (`IDh`, `time`, `state`) VALUES
(1, '08:00:00 am', ''),
(2, '09:00:00 am', ''),
(3, '10:00:00 am', ''),
(4, '11:00:00 am', ''),
(5, '12:00:00 am', ''),
(6, '01:00:00 pm', ''),
(7, '02:00:00 pm', ''),
(8, '03:00:00 pm', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patient`
--

CREATE TABLE `patient` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `birth` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phonenumber` varchar(10) NOT NULL,
  `direction` varchar(30) NOT NULL,
  `IDeventday` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `patient`
--

INSERT INTO `patient` (`ID`, `name`, `surname`, `gender`, `birth`, `email`, `phonenumber`, `direction`, `IDeventday`) VALUES
(2, 'Misael', 'Villar Julian', 'Masculino', '2001-01-24', 'villarmisael7@gmail.com', '2871819824', 'Col. Las Flores', 1),
(3, 'Vianey', 'Alonso Ramirez', 'Femenino', '2001-03-11', 'villarmisael10@hotmail.com', '2871903456', 'Col. Paraiso', 2),
(4, 'Israel', 'Perez', 'Masculino', '2001-05-10', 'isc19350314@gmail.com', '2741110209', 'Col. Las Flores', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idusers` int(10) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `state` char(1) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idusers`, `name`, `surname`, `email`, `user`, `password`, `token`, `state`, `created`, `updated`) VALUES
(1, 'Misael', 'Villar Julian', 'villarmisael7@gmail.com', 'usuario', 'usuario', 'token', '1', '2023-04-27 05:52:09', '2023-05-05 12:58:01'),
(2, 'Vianey', 'Alonso Ramirez', 'villarmisael10@hotmail.com', 'usuario2', 'usuario2', 'ygfxexq1uvhwhxoo364129i8u1mnbm21-ihvtbizytym1g2brh', '1', '2023-05-19 21:27:57', '2023-05-19 15:27:57'),
(4, 'Israel', 'Perez', 'isc19350314@gmail.com', 'Israel', '12345678', 'h95sakfkrmth5okmqaczf8p8suk6qjc2g-nlcespjcf7kdtbmu', '1', '2023-05-30 20:29:16', '2023-05-30 14:29:16');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventday`
--
ALTER TABLE `eventday`
  ADD PRIMARY KEY (`IDd`);

--
-- Indices de la tabla `eventhour`
--
ALTER TABLE `eventhour`
  ADD PRIMARY KEY (`IDh`);

--
-- Indices de la tabla `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDeventday` (`IDeventday`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idusers`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventday`
--
ALTER TABLE `eventday`
  MODIFY `IDd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `eventhour`
--
ALTER TABLE `eventhour`
  MODIFY `IDh` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `patient`
--
ALTER TABLE `patient`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idusers` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`IDeventday`) REFERENCES `eventday` (`IDd`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
