<?php
// Балансировщик нагрузки - test v1
// отправить запрос на свободный сервер для обработки данных


const SERVER_FIRST = "192.168.1.100:81";
const SERVER_SECOND = "192.168.1.101:81";

echo file_get_contents('http://' . SERVER_FIRST . '/api/get_energy_consumption?' . 'startDate=' . $_GET["startDate"] . '&endDate=' . $_GET["endDate"] . '&region=' . $_GET["region"]);
/*
if(file_get_contents('http://' . SERVER_FIRST . '/api/server_status/is_busy') != true)
	echo file_get_contents('http://' . SERVER_FIRST . '/api/get_energy_consumption?' . 'startDate=' . $_GET["startDate"] . '&endDate=' . $_GET["endDate"] . '&region=' . $_GET["region"]);
if(file_get_contents('http://' . SERVER_SECOND . '/api/server_status/is_busy') != true)
	echo file_get_contents('http://' . SERVER_SECOND . '/api/get_energy_consumption?' . 'startDate=' . $_GET["startDate"] . '&endDate=' . $_GET["endDate"] . '&region=' . $_GET["region"]);
*/
?>